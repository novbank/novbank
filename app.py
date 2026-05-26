from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import sqlite3, hashlib, os
from datetime import datetime

app = Flask(__name__)
app.secret_key = "novbank-secret-2026"

DB = "novbank.db"

# ─── DATABASE ───────────────────────────────────────────────
def get_db():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    return con


def generate_transactions(uid, member_since_str, opening_balance, profile="construction"):
    """Auto-generate realistic transactions from account open date to today."""
    from datetime import datetime as dt, timedelta
    import random, calendar

    random.seed(uid * 7)  # deterministic per user

    start = dt.strptime(member_since_str[:10], "%Y-%m-%d")
    today = dt.now()
    # Exactly 5 calendar months back
    cutoff = today.replace(day=1)
    for _ in range(5):
        cutoff = (cutoff - timedelta(days=1)).replace(day=1)

    PROFILES = {
        "construction": {
            "salary": (3000, 3800),
            "bonus_chance": 0.25,
            "bonus": (300, 800),
            "expenses": [
                ("Site Materials — Cement & Steel",    "Materials",  180, 420),
                ("Transport to Construction Site",     "Transport",   40,  90),
                ("Safety Equipment",                   "Equipment",   60, 180),
                ("Lunch & Meals — Site Canteen",       "Dining",      60, 120),
                ("Electricity Bill",                   "Utilities",   35,  65),
                ("Mobile Phone Bill",                  "Utilities",   15,  30),
                ("Supermarket — Weekly Groceries",     "Shopping",    80, 160),
                ("Power Tools & Supplies",             "Equipment",   50, 200),
                ("Fuel — Vehicle",                     "Transport",   50, 100),
                ("Rent Payment",                       "Housing",    400, 600),
                ("Healthcare — Clinic Visit",          "Healthcare",  20,  80),
                ("Water Bill",                         "Utilities",   15,  35),
            ],
            "income_extra": [
                ("Overtime Payment",                   "Income",     200, 500),
                ("Project Completion Bonus",           "Income",     400, 900),
                ("Company Reimbursement",              "Income",     100, 350),
            ],
        }
    }

    p = PROFILES.get(profile, PROFILES["construction"])
    txns = []
    balance = opening_balance

    # Work month by month from start to today
    cur = start.replace(day=1)
    while cur <= today:
        month_end = cur.replace(day=calendar.monthrange(cur.year, cur.month)[1])
        is_recent = cur >= cutoff

        # --- SALARY (always, around 25th-28th of month) ---
        pay_day = min(random.randint(25, 28), month_end.day)
        pay_date = cur.replace(day=pay_day)
        if pay_date > today:
            pay_date = today
        salary = round(random.uniform(*p["salary"]), 2)
        balance += salary
        txns.append((uid, "CR", salary, "Monthly Salary — " + pay_date.strftime("%b %Y"),
                     "Income", round(balance, 2), "Completed", pay_date.strftime("%Y-%m-%d")))

        if not is_recent:
            # --- BONUS (random) ---
            if random.random() < p["bonus_chance"]:
                bonus = round(random.uniform(*p["bonus"]), 2)
                bonus_day = random.randint(1, min(20, month_end.day))
                bonus_date = cur.replace(day=bonus_day)
                balance += bonus
                extra = random.choice(p["income_extra"])
                txns.append((uid, "CR", bonus, extra[0], extra[1],
                             round(balance, 2), "Completed", bonus_date.strftime("%Y-%m-%d")))

            # --- EXPENSES (pick 4-7 random ones) ---
            num_expenses = random.randint(4, 7)
            chosen = random.sample(p["expenses"], min(num_expenses, len(p["expenses"])))
            for exp in chosen:
                exp_day = random.randint(1, min(28, month_end.day))
                exp_date = cur.replace(day=exp_day)
                amt = round(random.uniform(exp[2], exp[3]), 2)
                if balance - amt > 100:  # keep minimum balance
                    balance -= amt
                    txns.append((uid, "DR", amt, exp[0], exp[2],
                                 round(balance, 2), "Completed", exp_date.strftime("%Y-%m-%d")))

        # --- RECENT PERIOD: bank tax + tax fee only ---
        if is_recent:
            # Bank maintenance fee (around 5th)
            fee_date = cur.replace(day=min(5, month_end.day))
            if fee_date <= today:
                bank_fee = round(random.uniform(3.5, 8.5), 2)
                balance -= bank_fee
                txns.append((uid, "DR", bank_fee, "Bank Maintenance Fee",
                             "Bank Fee", round(balance, 2), "Completed", fee_date.strftime("%Y-%m-%d")))

            # Government tax (around 15th)
            tax_date = cur.replace(day=min(15, month_end.day))
            if tax_date <= today:
                tax = round(random.uniform(12, 28), 2)
                balance -= tax
                txns.append((uid, "DR", tax, "Monthly Tax Deduction",
                             "Tax", round(balance, 2), "Completed", tax_date.strftime("%Y-%m-%d")))

        # Move to next month
        if cur.month == 12:
            cur = cur.replace(year=cur.year+1, month=1, day=1)
        else:
            cur = cur.replace(month=cur.month+1, day=1)

    # Sort by date
    txns.sort(key=lambda x: x[7])
    return txns, round(balance, 2)

def init_db():
    con = get_db()
    cur = con.cursor()

    cur.executescript("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'customer',
        account_number TEXT UNIQUE,
        account_type TEXT DEFAULT 'Checking',
        balance REAL DEFAULT 0.0,
        routing_number TEXT DEFAULT '021000021',
        phone TEXT DEFAULT '',
        address TEXT DEFAULT '',
        frozen INTEGER DEFAULT 0,
        transfers_enabled INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        type TEXT,
        amount REAL,
        description TEXT,
        category TEXT DEFAULT 'General',
        balance_after REAL,
        status TEXT DEFAULT 'Completed',
        date TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        message TEXT,
        read INTEGER DEFAULT 0,
        date TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        expires_at TEXT NOT NULL,
        used INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS withdrawal_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        amount REAL,
        method TEXT,
        note TEXT,
        status TEXT DEFAULT 'Pending',
        admin_note TEXT DEFAULT '',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
    """)
    try:
        cur.execute("ALTER TABLE users ADD COLUMN frozen INTEGER DEFAULT 0")
    except:
        pass
    try:
        cur.execute("ALTER TABLE users ADD COLUMN transfers_enabled INTEGER DEFAULT 0")
    except:
        pass
    try:
        cur.execute("ALTER TABLE users ADD COLUMN member_since TEXT DEFAULT CURRENT_TIMESTAMP")
    except:
        pass

    # Seed admin
    admin_pw = hashlib.sha256("admin123".encode()).hexdigest()
    cur.execute("INSERT OR IGNORE INTO users (name, email, password, role, account_number, balance) VALUES (?,?,?,?,?,?)",
                ("Super Admin", "admin@novbank.com", admin_pw, "admin", "ADMIN-001", 0))

    # Seed demo customer
    cust_pw = hashlib.sha256("customer123".encode()).hexdigest()
    cur.execute("INSERT OR IGNORE INTO users (name, email, password, role, account_number, account_type, balance, phone, address) VALUES (?,?,?,?,?,?,?,?,?)",
                ("James Okafor", "james@novbank.com", cust_pw, "customer", "4521 8834 9901 2234", "Checking", 12450.75, "+229 97 12 34 56", "12 Rue de Commerce, Cotonou, Bénin"))

    con.commit()

    # Seed transactions if none
    cur.execute("SELECT COUNT(*) as c FROM transactions")
    if cur.fetchone()["c"] == 0:
        cur.execute("SELECT id, balance FROM users WHERE email='james@novbank.com'")
        u = cur.fetchone()
        if u:
            uid = u["id"]
            sample_txns = [
                (uid, "CR", 4500.00, "Salary — Nexus Corp", "Income", 12450.75, "Completed", "2026-04-30"),
                (uid, "DR", 87.50, "Orange Market — Groceries", "Shopping", 7950.75, "Completed", "2026-04-28"),
                (uid, "DR", 15.00, "DSTV Subscription", "Utilities", 8038.25, "Completed", "2026-04-26"),
                (uid, "DR", 200.00, "Transfer to A. Mensah", "Transfer", 8053.25, "Completed", "2026-04-24"),
                (uid, "DR", 150.00, "ATM Withdrawal — Cotonou", "Cash", 8253.25, "Completed", "2026-04-22"),
                (uid, "CR", 800.00, "Freelance Payment", "Income", 8403.25, "Completed", "2026-04-19"),
                (uid, "DR", 42.00, "Electricity Bill", "Utilities", 7603.25, "Completed", "2026-04-15"),
                (uid, "DR", 25.00, "Restaurant Maquis", "Dining", 7645.25, "Completed", "2026-04-10"),
            ]
            cur.executemany("INSERT INTO transactions (user_id,type,amount,description,category,balance_after,status,date) VALUES (?,?,?,?,?,?,?,?)", sample_txns)
            con.commit()

    con.close()


# ─── HELPERS ────────────────────────────────────────────────
def hash_pw(pw): return hashlib.sha256(pw.encode()).hexdigest()
def login_required(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated

def admin_required(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        if session.get("role") != "admin":
            return redirect(url_for("dashboard"))
        return f(*args, **kwargs)
    return decorated


# ─── AUTH ROUTES ────────────────────────────────────────────
@app.route("/", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        email = request.form["email"].strip()
        password = request.form["password"]
        con = get_db()
        user = con.execute("SELECT * FROM users WHERE email=? AND password=?",
                           (email, hash_pw(password))).fetchone()
        con.close()
        if user:
            session["user_id"] = user["id"]
            session["role"] = user["role"]
            session["name"] = user["name"]
            return redirect(url_for("admin_dashboard") if user["role"] == "admin" else url_for("dashboard"))
        error = "Invalid email or password."
    return render_template("login.html", error=error)

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


# ─── CUSTOMER ROUTES ────────────────────────────────────────
@app.route("/dashboard")
@login_required
def dashboard():
    if session["role"] == "admin":
        return redirect(url_for("admin_dashboard"))
    import json
    con = get_db()
    user  = con.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    txns  = con.execute("SELECT * FROM transactions WHERE user_id=? ORDER BY date DESC LIMIT 5", (session["user_id"],)).fetchall()
    unread = con.execute("SELECT COUNT(*) as c FROM notifications WHERE user_id=? AND read=0", (session["user_id"],)).fetchone()["c"]

    # Last 6 months bar chart data
    from datetime import datetime as dt, timedelta
    months_data = []
    for i in range(5, -1, -1):
        month_date = (dt.now().replace(day=1) - timedelta(days=i*30))
        ym    = month_date.strftime("%Y-%m")
        label = month_date.strftime("%b")
        row = con.execute("""
            SELECT
              COALESCE(SUM(CASE WHEN type='CR' THEN amount ELSE 0 END),0) as income,
              COALESCE(SUM(CASE WHEN type='DR' THEN amount ELSE 0 END),0) as expenses
            FROM transactions WHERE user_id=? AND strftime('%Y-%m',date)=?
        """, (session["user_id"], ym)).fetchone()
        months_data.append({"month": label, "income": round(row["income"],2), "expenses": round(row["expenses"],2)})

    # Spending by category donut chart
    cats = con.execute("""
        SELECT category, COALESCE(SUM(amount),0) as total FROM transactions
        WHERE user_id=? AND type='DR'
        GROUP BY category ORDER BY total DESC LIMIT 6
    """, (session["user_id"],)).fetchall()
    cat_data = [{"cat": r["category"], "total": round(r["total"],2)} for r in cats]

    con.close()
    return render_template("dashboard.html", user=user, txns=txns, unread=unread,
                           now_hour=dt.now().hour,
                           months_data=json.dumps(months_data),
                           cat_data=json.dumps(cat_data))

@app.route("/account")
@login_required
def account():
    con = get_db()
    user = con.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    con.close()
    return render_template("account.html", user=user)

@app.route("/statement")
@login_required
def statement():
    month = request.args.get("month", "")
    con = get_db()
    user = con.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    query = "SELECT * FROM transactions WHERE user_id=?"
    params = [session["user_id"]]
    if month:
        query += " AND strftime('%Y-%m', date) = ?"
        params.append(month)
    query += " ORDER BY date DESC"
    txns = con.execute(query, params).fetchall()
    con.close()
    return render_template("statement.html", user=user, txns=txns, month=month)

@app.route("/history")
@login_required
def history():
    con = get_db()
    user = con.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    txns = con.execute("SELECT * FROM transactions WHERE user_id=? ORDER BY date DESC", (session["user_id"],)).fetchall()
    con.close()
    return render_template("history.html", user=user, txns=txns)

@app.route("/transfer", methods=["GET", "POST"])
@login_required
def transfer():
    con = get_db()
    user = con.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    message = None
    error = None
    if user["transfers_enabled"] and request.method == "POST":
        to_account = request.form["to_account"].strip()
        note = request.form.get("note", "Transfer")
        try:
            amount = float(request.form["amount"])
        except:
            amount = 0
        recipient = con.execute("SELECT * FROM users WHERE account_number=?", (to_account,)).fetchone()
        if not recipient:
            error = "Account number not found."
        elif amount <= 0:
            error = "Enter a valid amount."
        elif amount > user["balance"]:
            error = "Insufficient funds."
        else:
            new_bal = user["balance"] - amount
            con.execute("UPDATE users SET balance=? WHERE id=?", (new_bal, session["user_id"]))
            con.execute("INSERT INTO transactions (user_id,type,amount,description,category,balance_after,status) VALUES (?,?,?,?,?,?,?)",
                (session["user_id"], "DR", amount, f"Transfer to {recipient['name']} — {note}", "Transfer", new_bal, "Completed"))
            rec_bal = recipient["balance"] + amount
            con.execute("UPDATE users SET balance=? WHERE id=?", (rec_bal, recipient["id"]))
            con.execute("INSERT INTO transactions (user_id,type,amount,description,category,balance_after,status) VALUES (?,?,?,?,?,?,?)",
                (recipient["id"], "CR", amount, f"Transfer from {user['name']} — {note}", "Transfer", rec_bal, "Completed"))
            con.execute("INSERT INTO notifications (user_id, message) VALUES (?,?)",
                (recipient["id"], f"You received ${amount:,.2f} from {user['name']}"))
            con.commit()
            message = f"${amount:,.2f} sent to {recipient['name']} successfully."
            user = con.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    con.close()
    return render_template("transfer.html", user=user, message=message, error=error)

@app.route("/settings")
@login_required
def settings():
    con = get_db()
    user = con.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    con.close()
    return render_template("settings.html", user=user)

@app.route("/update_profile", methods=["POST"])
@login_required
def update_profile():
    email   = request.form["email"]
    phone   = request.form["phone"]
    address = request.form["address"]
    con = get_db()
    # Check email not taken by another user
    existing = con.execute("SELECT id FROM users WHERE email=? AND id!=?", (email, session["user_id"])).fetchone()
    if existing:
        con.close()
        from flask import flash
        flash("That email is already in use by another account.", "error")
        return redirect(url_for("settings") + "#profile")
    con.execute("UPDATE users SET email=?, phone=?, address=? WHERE id=?", (email, phone, address, session["user_id"]))
    con.commit()
    con.close()
    from flask import flash
    flash("Profile updated successfully.", "success")
    return redirect(url_for("settings"))

@app.route("/change_password", methods=["POST"])
@login_required
def change_password():
    current_pw  = request.form["current_password"]
    new_pw      = request.form["new_password"]
    confirm_pw  = request.form["confirm_password"]
    from flask import flash
    if new_pw != confirm_pw:
        flash("New passwords do not match.", "error")
        return redirect(url_for("settings"))
    con = get_db()
    user = con.execute("SELECT * FROM users WHERE id=? AND password=?", (session["user_id"], hash_pw(current_pw))).fetchone()
    if not user:
        con.close()
        flash("Current password is incorrect.", "error")
        return redirect(url_for("settings"))
    con.execute("UPDATE users SET password=? WHERE id=?", (hash_pw(new_pw), session["user_id"]))
    con.commit()
    con.close()
    flash("Password updated successfully.", "success")
    return redirect(url_for("settings"))


# ─── ADMIN ROUTES ────────────────────────────────────────────
@app.route("/admin")
@login_required
@admin_required
def admin_dashboard():
    con = get_db()
    total_users = con.execute("SELECT COUNT(*) as c FROM users WHERE role='customer'").fetchone()["c"]
    total_balance = con.execute("SELECT SUM(balance) as s FROM users WHERE role='customer'").fetchone()["s"] or 0
    total_txns = con.execute("SELECT COUNT(*) as c FROM transactions").fetchone()["c"]
    recent_txns = con.execute("""
        SELECT t.*, u.name as user_name FROM transactions t
        JOIN users u ON t.user_id = u.id ORDER BY t.date DESC LIMIT 10
    """).fetchall()
    con.close()
    return render_template("admin_dashboard.html",
                           total_users=total_users,
                           total_balance=total_balance,
                           total_txns=total_txns,
                           recent_txns=recent_txns,
                           name=session["name"])

@app.route("/admin/customers")
@login_required
@admin_required
def admin_customers():
    con = get_db()
    customers = con.execute("SELECT * FROM users WHERE role='customer' ORDER BY created_at DESC").fetchall()
    con.close()
    return render_template("admin_customers.html", customers=customers)

@app.route("/admin/customer/<int:uid>", methods=["GET", "POST"])
@login_required
@admin_required
def admin_edit_customer(uid):
    con = get_db()
    if request.method == "POST":
        balance = float(request.form["balance"])
        name = request.form["name"]
        account_type = request.form["account_type"]
        status_note = request.form.get("note", "Account Adjustment")
        old_user = con.execute("SELECT balance FROM users WHERE id=?", (uid,)).fetchone()
        diff = balance - old_user["balance"]
        txn_type = "CR" if diff >= 0 else "DR"
        con.execute("UPDATE users SET balance=?, name=?, account_type=? WHERE id=?", (balance, name, account_type, uid))
        if diff != 0:
            con.execute("INSERT INTO transactions (user_id,type,amount,description,category,balance_after,status) VALUES (?,?,?,?,?,?,?)",
                        (uid, txn_type, abs(diff), status_note, "General", balance, "Completed"))
        con.commit()
    user = con.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
    txns = con.execute("SELECT * FROM transactions WHERE user_id=? ORDER BY date DESC LIMIT 20", (uid,)).fetchall()
    con.close()
    return render_template("admin_edit_customer.html", customer=user, txns=txns)

@app.route("/admin/transactions")
@login_required
@admin_required
def admin_transactions():
    con = get_db()
    txns = con.execute("""
        SELECT t.*, u.name as user_name FROM transactions t
        JOIN users u ON t.user_id = u.id ORDER BY t.date DESC
    """).fetchall()
    con.close()
    return render_template("admin_transactions.html", txns=txns)

@app.route("/admin/add_customer", methods=["GET", "POST"])
@login_required
@admin_required
def admin_add_customer():
    error = None
    if request.method == "POST":
        try:
            name         = request.form["name"]
            email        = request.form["email"]
            password     = request.form["password"]
            balance      = float(request.form["balance"])
            account_type = request.form["account_type"]
            acct_num     = request.form["account_number"]
            phone        = request.form.get("phone", "")
            address      = request.form.get("address", "")
            member_since = request.form.get("member_since") or datetime.now().strftime("%Y-%m-%d")
            transfers_enabled = 1 if request.form.get("transfers_enabled") else 0

            con = get_db()
            con.execute("""INSERT INTO users
                (name,email,password,role,account_number,account_type,balance,
                 phone,address,transfers_enabled,member_since,created_at)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?)""",
                (name, email, hash_pw(password), "customer", acct_num, account_type,
                 balance, phone, address, transfers_enabled, member_since, member_since))
            con.commit()
            uid = con.execute("SELECT id FROM users WHERE email=?", (email,)).fetchone()["id"]

            # Save transaction history
            txn_descs   = request.form.getlist("txn_desc")
            txn_amounts = request.form.getlist("txn_amount")
            txn_types   = request.form.getlist("txn_type")
            txn_cats    = request.form.getlist("txn_cat")
            txn_dates   = request.form.getlist("txn_date")

            # Build valid transaction list
            valid_txns = []
            for i in range(len(txn_descs)):
                desc = txn_descs[i].strip() if i < len(txn_descs) else ""
                amt  = txn_amounts[i].strip() if i < len(txn_amounts) else ""
                if desc and amt:
                    valid_txns.append({
                        "desc": desc,
                        "amount": float(amt),
                        "type": txn_types[i] if i < len(txn_types) else "CR",
                        "cat": txn_cats[i] if i < len(txn_cats) else "General",
                        "date": txn_dates[i] if i < len(txn_dates) and txn_dates[i] else member_since,
                    })

            # Auto-generate if requested
            use_autogen = request.form.get("use_autogen")
            if use_autogen:
                profile = request.form.get("autogen_profile", "construction")
                auto_txns, final_balance = generate_transactions(uid, member_since, balance, profile)
                if auto_txns:
                    con.executemany("""INSERT INTO transactions
                        (user_id,type,amount,description,category,balance_after,status,date)
                        VALUES (?,?,?,?,?,?,?,?)""", auto_txns)
                    # Update balance to reflect generated transactions
                    con.execute("UPDATE users SET balance=? WHERE id=?", (final_balance, uid))
            elif valid_txns:
                # Manual transactions
                net = sum(t["amount"] if t["type"]=="CR" else -t["amount"] for t in valid_txns)
                running = balance - net
                for t in valid_txns:
                    if t["type"] == "CR":
                        running += t["amount"]
                    else:
                        running -= t["amount"]
                    con.execute("""INSERT INTO transactions
                        (user_id,type,amount,description,category,balance_after,status,date)
                        VALUES (?,?,?,?,?,?,?,?)""",
                        (uid, t["type"], t["amount"], t["desc"], t["cat"],
                         round(running, 2), "Completed", t["date"]))

            con.commit()
            con.close()
            return redirect(url_for("admin_customers"))
        except Exception as e:
            error = f"Error: {str(e)}"
    return render_template("admin_add_customer.html", error=error, today=datetime.now().strftime("%Y-%m-%d"))


# ─── API (JSON) ──────────────────────────────────────────────
@app.route("/api/balance")
@login_required
def api_balance():
    con = get_db()
    user = con.execute("SELECT balance FROM users WHERE id=?", (session["user_id"],)).fetchone()
    con.close()
    return jsonify({"balance": user["balance"]})



# ─── FORGOT / RESET PASSWORD ────────────────────────────────
@app.route("/forgot-password", methods=["GET", "POST"])
def forgot_password():
    message = None
    error = None
    if request.method == "POST":
        email = request.form["email"].strip().lower()
        con = get_db()
        user = con.execute("SELECT * FROM users WHERE email=?", (email,)).fetchone()
        if user:
            import secrets
            from datetime import datetime, timedelta
            token = secrets.token_urlsafe(32)
            expires = (datetime.now() + timedelta(hours=2)).strftime("%Y-%m-%d %H:%M:%S")
            con.execute("INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?,?,?)",
                        (user["id"], token, expires))
            con.commit()
            reset_link = url_for("reset_password", token=token, _external=True)
            con.close()
            return render_template("forgot_password.html", reset_link=reset_link, email=email)
        else:
            con.close()
            # Don't reveal if email exists — show same success message
            return render_template("forgot_password.html", reset_link=None, email=email, sent=True)
    return render_template("forgot_password.html")

@app.route("/reset-password/<token>", methods=["GET", "POST"])
def reset_password(token):
    from datetime import datetime
    con = get_db()
    record = con.execute(
        "SELECT * FROM password_reset_tokens WHERE token=? AND used=0",
        (token,)
    ).fetchone()

    if not record:
        con.close()
        return render_template("reset_password.html", error="This reset link is invalid or has already been used.", token=None)

    if datetime.now() > datetime.strptime(record["expires_at"], "%Y-%m-%d %H:%M:%S"):
        con.close()
        return render_template("reset_password.html", error="This reset link has expired. Please request a new one.", token=None)

    if request.method == "POST":
        new_pw = request.form["new_password"]
        confirm_pw = request.form["confirm_password"]
        if len(new_pw) < 6:
            con.close()
            return render_template("reset_password.html", error="Password must be at least 6 characters.", token=token)
        if new_pw != confirm_pw:
            con.close()
            return render_template("reset_password.html", error="Passwords do not match.", token=token)
        con.execute("UPDATE users SET password=? WHERE id=?", (hash_pw(new_pw), record["user_id"]))
        con.execute("UPDATE password_reset_tokens SET used=1 WHERE id=?", (record["id"],))
        con.commit()
        con.close()
        return render_template("reset_password.html", success=True, token=None)

    con.close()
    return render_template("reset_password.html", token=token)

@app.route("/admin/reset-password/<int:uid>", methods=["POST"])
@login_required
@admin_required
def admin_reset_password(uid):
    import secrets
    from datetime import datetime, timedelta
    con = get_db()
    token = secrets.token_urlsafe(32)
    expires = (datetime.now() + timedelta(hours=24)).strftime("%Y-%m-%d %H:%M:%S")
    con.execute("INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?,?,?)",
                (uid, token, expires))
    con.commit()
    con.close()
    reset_link = url_for("reset_password", token=token, _external=True)
    from flask import flash
    flash(f"Reset link generated: {reset_link}", "reset_link")
    return redirect(url_for("admin_edit_customer", uid=uid))


# ─── FROZEN CHECK ────────────────────────────────────────────
def frozen_check(f):
    from functools import wraps
    @wraps(f)
    def decorated(*args, **kwargs):
        if session.get("role") == "customer":
            con = get_db()
            user = con.execute("SELECT frozen FROM users WHERE id=?", (session["user_id"],)).fetchone()
            con.close()
            if user and user["frozen"]:
                return render_template("frozen.html")
        return f(*args, **kwargs)
    return decorated


# ─── WITHDRAWAL ROUTES ───────────────────────────────────────
@app.route("/withdraw", methods=["GET", "POST"])
@login_required
def withdraw():
    con = get_db()
    user = con.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    if user["frozen"]:
        con.close()
        return render_template("frozen.html")
    message = None
    error = None
    if request.method == "POST":
        try:
            amount = float(request.form["amount"])
        except:
            amount = 0
        method = request.form.get("method", "ATM")
        note   = request.form.get("note", "")
        if amount <= 0:
            error = "Please enter a valid amount."
        elif amount > user["balance"]:
            error = "Insufficient funds for this withdrawal."
        else:
            con.execute(
                "INSERT INTO withdrawal_requests (user_id, amount, method, note) VALUES (?,?,?,?)",
                (session["user_id"], amount, method, note)
            )
            con.execute("INSERT INTO notifications (user_id, message) VALUES (?,?)",
                (session["user_id"], f"Withdrawal request of ${amount:,.2f} submitted and is pending review."))
            con.commit()
            message = f"Your withdrawal request of ${amount:,.2f} has been submitted and is pending review."
            user = con.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    my_requests = con.execute(
        "SELECT * FROM withdrawal_requests WHERE user_id=? ORDER BY created_at DESC",
        (session["user_id"],)
    ).fetchall()
    con.close()
    return render_template("withdraw.html", user=user, message=message, error=error, my_requests=my_requests)


# ─── ADMIN TOGGLE TRANSFER ──────────────────────────────────
@app.route("/admin/toggle_transfer/<int:uid>", methods=["POST"])
@login_required
@admin_required
def admin_toggle_transfer(uid):
    con = get_db()
    user = con.execute("SELECT transfers_enabled FROM users WHERE id=?", (uid,)).fetchone()
    new_status = 0 if user["transfers_enabled"] else 1
    con.execute("UPDATE users SET transfers_enabled=? WHERE id=?", (new_status, uid))
    action = "enabled" if new_status else "disabled"
    con.execute("INSERT INTO notifications (user_id, message) VALUES (?,?)",
        (uid, f"Fund transfers have been {action} on your account by NovBank."))
    con.commit()
    con.close()
    return redirect(url_for("admin_edit_customer", uid=uid))

# ─── ADMIN FREEZE ────────────────────────────────────────────
@app.route("/admin/freeze/<int:uid>", methods=["POST"])
@login_required
@admin_required
def admin_freeze(uid):
    con = get_db()
    user = con.execute("SELECT frozen FROM users WHERE id=?", (uid,)).fetchone()
    new_status = 0 if user["frozen"] else 1
    action = "frozen" if new_status else "unfrozen"
    con.execute("UPDATE users SET frozen=? WHERE id=?", (new_status, uid))
    con.execute("INSERT INTO notifications (user_id, message) VALUES (?,?)",
        (uid, f"Your account has been {action} by NovBank. Please contact support for assistance."))
    con.commit()
    con.close()
    return redirect(url_for("admin_edit_customer", uid=uid))


# ─── ADMIN WITHDRAWALS ───────────────────────────────────────
@app.route("/admin/withdrawals")
@login_required
@admin_required
def admin_withdrawals():
    con = get_db()
    requests = con.execute("""SELECT w.*, u.name as user_name, u.account_number, u.balance
        FROM withdrawal_requests w JOIN users u ON w.user_id = u.id
        ORDER BY w.created_at DESC""").fetchall()
    con.close()
    return render_template("admin_withdrawals.html", requests=requests)


@app.route("/admin/withdrawals/<int:wid>/<action>", methods=["POST"])
@login_required
@admin_required
def admin_withdrawal_action(wid, action):
    admin_note = request.form.get("admin_note", "")
    con = get_db()
    wr = con.execute("SELECT * FROM withdrawal_requests WHERE id=?", (wid,)).fetchone()
    if wr and wr["status"] == "Pending":
        if action == "approve":
            user = con.execute("SELECT * FROM users WHERE id=?", (wr["user_id"],)).fetchone()
            if wr["amount"] <= user["balance"]:
                new_bal = user["balance"] - wr["amount"]
                con.execute("UPDATE users SET balance=? WHERE id=?", (new_bal, wr["user_id"]))
                con.execute("INSERT INTO transactions (user_id,type,amount,description,category,balance_after,status) VALUES (?,?,?,?,?,?,?)",
                    (wr["user_id"], "DR", wr["amount"], f"Withdrawal via {wr['method']}", "Withdrawal", new_bal, "Completed"))
                con.execute("UPDATE withdrawal_requests SET status='Approved', admin_note=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
                    (admin_note, wid))
                con.execute("INSERT INTO notifications (user_id, message) VALUES (?,?)",
                    (wr["user_id"], f"Your withdrawal of ${wr['amount']:,.2f} has been approved and processed."))
            else:
                con.execute("UPDATE withdrawal_requests SET status='Rejected', admin_note='Insufficient funds', updated_at=CURRENT_TIMESTAMP WHERE id=?", (wid,))
        elif action == "reject":
            con.execute("UPDATE withdrawal_requests SET status='Rejected', admin_note=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
                (admin_note, wid))
            con.execute("INSERT INTO notifications (user_id, message) VALUES (?,?)",
                (wr["user_id"], f"Your withdrawal of ${wr['amount']:,.2f} was rejected. Reason: {admin_note or 'Contact support'}"))
        con.commit()
    con.close()
    return redirect(url_for("admin_withdrawals"))

"""
if __name__ == "__main__":
    init_db()
    app.run(debug=True)"""

if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
