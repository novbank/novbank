// NovBank — lang.js

const LANGS = {
  en: { name:"English",        flag:"🇺🇸", dir:"ltr" },
  fr: { name:"Français",       flag:"🇫🇷", dir:"ltr" },
  de: { name:"Deutsch",        flag:"🇩🇪", dir:"ltr" },
  es: { name:"Español",        flag:"🇪🇸", dir:"ltr" },
  pt: { name:"Português",      flag:"🇵🇹", dir:"ltr" },
  it: { name:"Italiano",       flag:"🇮🇹", dir:"ltr" },
  nl: { name:"Nederlands",     flag:"🇳🇱", dir:"ltr" },
  ru: { name:"Русский",        flag:"🇷🇺", dir:"ltr" },
  tr: { name:"Türkçe",         flag:"🇹🇷", dir:"ltr" },
  ar: { name:"العربية",        flag:"🇸🇦", dir:"rtl" },
  fa: { name:"فارسی",          flag:"🇮🇷", dir:"rtl" },
  he: { name:"עברית",          flag:"🇮🇱", dir:"rtl" },
  ur: { name:"اردو",           flag:"🇵🇰", dir:"rtl" },
  hi: { name:"हिन्दी",         flag:"🇮🇳", dir:"ltr" },
  bn: { name:"বাংলা",          flag:"🇧🇩", dir:"ltr" },
  zh: { name:"中文",            flag:"🇨🇳", dir:"ltr" },
  ja: { name:"日本語",           flag:"🇯🇵", dir:"ltr" },
  ko: { name:"한국어",           flag:"🇰🇷", dir:"ltr" },
  vi: { name:"Tiếng Việt",     flag:"🇻🇳", dir:"ltr" },
  th: { name:"ภาษาไทย",        flag:"🇹🇭", dir:"ltr" },
  id: { name:"Indonesia",      flag:"🇮🇩", dir:"ltr" },
  ms: { name:"Melayu",         flag:"🇲🇾", dir:"ltr" },
  tl: { name:"Filipino",       flag:"🇵🇭", dir:"ltr" },
  sw: { name:"Kiswahili",      flag:"🇰🇪", dir:"ltr" },
  yo: { name:"Yorùbá",         flag:"🇳🇬", dir:"ltr" },
  ha: { name:"Hausa",          flag:"🇳🇬", dir:"ltr" },
  am: { name:"አማርኛ",           flag:"🇪🇹", dir:"ltr" },
  uk: { name:"Українська",     flag:"🇺🇦", dir:"ltr" },
  ro: { name:"Română",         flag:"🇷🇴", dir:"ltr" },
  pl: { name:"Polski",         flag:"🇵🇱", dir:"ltr" },
  cs: { name:"Čeština",        flag:"🇨🇿", dir:"ltr" },
  sv: { name:"Svenska",        flag:"🇸🇪", dir:"ltr" },
  el: { name:"Ελληνικά",       flag:"🇬🇷", dir:"ltr" },
};

// All translatable UI strings
const T = {
  // NAV
  "Home":         {fr:"Accueil",de:"Start",es:"Inicio",pt:"Início",it:"Home",nl:"Home",ru:"Главная",tr:"Ana Sayfa",ar:"الرئيسية",fa:"خانه",he:"בית",ur:"ہوم",hi:"होम",bn:"হোম",zh:"首页",ja:"ホーム",ko:"홈",vi:"Trang chủ",th:"หน้าหลัก",id:"Beranda",ms:"Utama",tl:"Home",sw:"Nyumbani",yo:"Ilé",ha:"Gida",am:"መነሻ",uk:"Головна",ro:"Acasă",pl:"Strona główna",cs:"Domů",sv:"Hem",el:"Αρχική"},
  "Account":      {fr:"Compte",de:"Konto",es:"Cuenta",pt:"Conta",it:"Conto",nl:"Rekening",ru:"Счёт",tr:"Hesap",ar:"الحساب",fa:"حساب",he:"חשבון",ur:"اکاؤنٹ",hi:"खाता",bn:"অ্যাকাউন্ট",zh:"账户",ja:"口座",ko:"계좌",vi:"Tài khoản",th:"บัญชี",id:"Rekening",ms:"Akaun",tl:"Account",sw:"Akaunti",yo:"Àkọsílẹ̀",ha:"Asusun",am:"መለያ",uk:"Рахунок",ro:"Cont",pl:"Konto",cs:"Účet",sv:"Konto",el:"Λογαριασμός"},
  "Statement":    {fr:"Relevé",de:"Kontoauszug",es:"Estado de cuenta",pt:"Extrato",it:"Estratto",nl:"Afschrift",ru:"Выписка",tr:"Hesap özeti",ar:"كشف الحساب",fa:"صورت حساب",he:"דף חשבון",ur:"بیان",hi:"विवरण",bn:"বিবৃতি",zh:"对账单",ja:"明細書",ko:"거래명세서",vi:"Sao kê",th:"รายการบัญชี",id:"Rekening Koran",ms:"Penyata",tl:"Statement",sw:"Taarifa",yo:"Ìwé àkọsílẹ̀",ha:"Bayani",am:"መግለጫ",uk:"Виписка",ro:"Extras",pl:"Wyciąg",cs:"Výpis",sv:"Kontoutdrag",el:"Κατάσταση"},
  "History":      {fr:"Historique",de:"Verlauf",es:"Historial",pt:"Histórico",it:"Cronologia",nl:"Geschiedenis",ru:"История",tr:"Geçmiş",ar:"السجل",fa:"تاریخچه",he:"היסטוריה",ur:"تاریخ",hi:"इतिहास",bn:"ইতিহাস",zh:"历史",ja:"履歴",ko:"내역",vi:"Lịch sử",th:"ประวัติ",id:"Riwayat",ms:"Sejarah",tl:"Kasaysayan",sw:"Historia",yo:"Ìtàn",ha:"Tarihi",am:"ታሪክ",uk:"Історія",ro:"Istoric",pl:"Historia",cs:"Historie",sv:"Historik",el:"Ιστορικό"},
  "Transfer":     {fr:"Virement",de:"Überweisung",es:"Transferencia",pt:"Transferência",it:"Bonifico",nl:"Overschrijving",ru:"Перевод",tr:"Havale",ar:"تحويل",fa:"انتقال",he:"העברה",ur:"منتقل",hi:"स्थानांतरण",bn:"স্থানান্তর",zh:"转账",ja:"振込",ko:"이체",vi:"Chuyển khoản",th:"โอนเงิน",id:"Transfer",ms:"Pindahan",tl:"Transfer",sw:"Uhamisho",yo:"Gbígbé",ha:"Canja",am:"ዝውውር",uk:"Переказ",ro:"Transfer",pl:"Przelew",cs:"Převod",sv:"Överföring",el:"Μεταφορά"},
  "Withdraw":     {fr:"Retrait",de:"Abhebung",es:"Retiro",pt:"Saque",it:"Prelievo",nl:"Opname",ru:"Снятие",tr:"Çekim",ar:"سحب",fa:"برداشت",he:"משיכה",ur:"نکاسی",hi:"निकासी",bn:"উত্তোলন",zh:"取款",ja:"出金",ko:"출금",vi:"Rút tiền",th:"ถอนเงิน",id:"Tarik Tunai",ms:"Pengeluaran",tl:"Mag-withdraw",sw:"Kutoa",yo:"Ìyọ",ha:"Cire",am:"ማውጣት",uk:"Зняття",ro:"Retragere",pl:"Wypłata",cs:"Výběr",sv:"Uttag",el:"Ανάληψη"},
  "Settings":     {fr:"Paramètres",de:"Einstellungen",es:"Configuración",pt:"Configurações",it:"Impostazioni",nl:"Instellingen",ru:"Настройки",tr:"Ayarlar",ar:"الإعدادات",fa:"تنظیمات",he:"הגדרות",ur:"ترتیبات",hi:"सेटिंग्स",bn:"সেটিংস",zh:"设置",ja:"設定",ko:"설정",vi:"Cài đặt",th:"การตั้งค่า",id:"Pengaturan",ms:"Tetapan",tl:"Mga Setting",sw:"Mipangilio",yo:"Ètò",ha:"Saiti",am:"ቅንብሮች",uk:"Налаштування",ro:"Setări",pl:"Ustawienia",cs:"Nastavení",sv:"Inställningar",el:"Ρυθμίσεις"},
  "Sign out":     {fr:"Déconnexion",de:"Abmelden",es:"Cerrar sesión",pt:"Sair",it:"Esci",nl:"Uitloggen",ru:"Выйти",tr:"Çıkış",ar:"تسجيل خروج",fa:"خروج",he:"התנתק",ur:"سائن آؤٹ",hi:"साइन आउट",bn:"সাইন আউট",zh:"退出",ja:"サインアウト",ko:"로그아웃",vi:"Đăng xuất",th:"ออกจากระบบ",id:"Keluar",ms:"Log Keluar",tl:"Mag-sign out",sw:"Ondoka",yo:"Jáde",ha:"Fita",am:"ውጣ",uk:"Вийти",ro:"Deconectare",pl:"Wyloguj",cs:"Odhlásit",sv:"Logga ut",el:"Αποσύνδεση"},
  // ADMIN NAV
  "Dashboard":    {fr:"Tableau de bord",de:"Übersicht",es:"Panel",pt:"Painel",it:"Pannello",nl:"Dashboard",ru:"Панель",tr:"Pano",ar:"لوحة التحكم",fa:"داشبورد",he:"לוח בקרה",ur:"ڈیش بورڈ",hi:"डैशबोर्ड",bn:"ড্যাশবোর্ড",zh:"控制台",ja:"ダッシュボード",ko:"대시보드",vi:"Bảng điều khiển",th:"แดชบอร์ด",id:"Dasbor",ms:"Papan Pemuka",tl:"Dashboard",sw:"Dashibodi",yo:"Pánẹ́ẹ̀lì",ha:"Allon sarrafa",am:"ዳሽቦርድ",uk:"Панель",ro:"Panou",pl:"Panel",cs:"Panel",sv:"Instrumentpanel",el:"Πίνακας"},
  "Customers":    {fr:"Clients",de:"Kunden",es:"Clientes",pt:"Clientes",it:"Clienti",nl:"Klanten",ru:"Клиенты",tr:"Müşteriler",ar:"العملاء",fa:"مشتریان",he:"לקוחות",ur:"گاہک",hi:"ग्राहक",bn:"গ্রাহক",zh:"客户",ja:"顧客",ko:"고객",vi:"Khách hàng",th:"ลูกค้า",id:"Nasabah",ms:"Pelanggan",tl:"Mga Customer",sw:"Wateja",yo:"Àwọn oléwò",ha:"Abokai",am:"ደንበኞች",uk:"Клієнти",ro:"Clienți",pl:"Klienci",cs:"Zákazníci",sv:"Kunder",el:"Πελάτες"},
  "Transactions": {fr:"Transactions",de:"Transaktionen",es:"Transacciones",pt:"Transações",it:"Transazioni",nl:"Transacties",ru:"Транзакции",tr:"İşlemler",ar:"المعاملات",fa:"تراکنش‌ها",he:"עסקאות",ur:"لین دین",hi:"लेनदेन",bn:"লেনদেন",zh:"交易",ja:"取引",ko:"거래",vi:"Giao dịch",th:"รายการ",id:"Transaksi",ms:"Transaksi",tl:"Mga Transaksyon",sw:"Miamala",yo:"Àwọn ìdúnàádúrà",ha:"Ma'amaloli",am:"ግብይቶች",uk:"Транзакції",ro:"Tranzacții",pl:"Transakcje",cs:"Transakce",sv:"Transaktioner",el:"Συναλλαγές"},
  "Add Customer": {fr:"Ajouter un client",de:"Kunden hinzufügen",es:"Agregar cliente",pt:"Adicionar cliente",it:"Aggiungi cliente",nl:"Klant toevoegen",ru:"Добавить клиента",tr:"Müşteri ekle",ar:"إضافة عميل",fa:"افزودن مشتری",he:"הוסף לקוח",ur:"گاہک شامل کریں",hi:"ग्राहक जोड़ें",bn:"গ্রাহক যোগ করুন",zh:"添加客户",ja:"顧客追加",ko:"고객 추가",vi:"Thêm khách hàng",th:"เพิ่มลูกค้า",id:"Tambah Nasabah",ms:"Tambah Pelanggan",tl:"Magdagdag ng Customer",sw:"Ongeza Mteja",yo:"Fi oléwò kun",ha:"Ƙara abokin ciniki",am:"ደንበኛ አክል",uk:"Додати клієнта",ro:"Adăugați client",pl:"Dodaj klienta",cs:"Přidat zákazníka",sv:"Lägg till kund",el:"Προσθήκη πελάτη"},
  // DASHBOARD
  "Good morning": {fr:"Bonjour",de:"Guten Morgen",es:"Buenos días",pt:"Bom dia",it:"Buongiorno",nl:"Goedemorgen",ru:"Доброе утро",tr:"Günaydın",ar:"صباح الخير",fa:"صبح بخیر",he:"בוקר טוב",ur:"صبح بخیر",hi:"सुप्रभात",bn:"শুভ সকাল",zh:"早上好",ja:"おはようございます",ko:"좋은 아침",vi:"Chào buổi sáng",th:"อรุณสวัสดิ์",id:"Selamat pagi",ms:"Selamat pagi",tl:"Magandang umaga",sw:"Habari za asubuhi",yo:"Ẹ káàárọ̀",ha:"Barka da safiya",am:"እንደምን አደሩ",uk:"Доброго ранку",ro:"Bună dimineața",pl:"Dzień dobry",cs:"Dobré ráno",sv:"God morgon",el:"Καλημέρα"},
  "Good afternoon":{fr:"Bon après-midi",de:"Guten Tag",es:"Buenas tardes",pt:"Boa tarde",it:"Buon pomeriggio",nl:"Goedemiddag",ru:"Добрый день",tr:"İyi günler",ar:"مساء الخير",fa:"بعد از ظهر بخیر",he:"אחר הצהריים טובים",ur:"دوپہر بخیر",hi:"नमस्ते",bn:"শুভ বিকাল",zh:"下午好",ja:"こんにちは",ko:"안녕하세요",vi:"Chào buổi chiều",th:"สวัสดีตอนบ่าย",id:"Selamat siang",ms:"Selamat tengah hari",tl:"Magandang hapon",sw:"Habari za mchana",yo:"Ẹ káàárọ̀",ha:"Barka da rana",am:"ደህና ዋሉ",uk:"Добрий день",ro:"Bună ziua",pl:"Dzień dobry",cs:"Dobré odpoledne",sv:"God eftermiddag",el:"Καλησπέρα"},
  "Good evening": {fr:"Bonsoir",de:"Guten Abend",es:"Buenas noches",pt:"Boa noite",it:"Buonasera",nl:"Goedenavond",ru:"Добрый вечер",tr:"İyi akşamlar",ar:"مساء النور",fa:"شب بخیر",he:"ערב טוב",ur:"شام بخیر",hi:"शुभ संध्या",bn:"শুভ সন্ধ্যা",zh:"晚上好",ja:"こんばんは",ko:"좋은 저녁",vi:"Chào buổi tối",th:"สวัสดีตอนเย็น",id:"Selamat malam",ms:"Selamat petang",tl:"Magandang gabi",sw:"Habari za jioni",yo:"Ẹ káalẹ́",ha:"Barka da yamma",am:"ደህና አምሹ",uk:"Добрий вечір",ro:"Bună seara",pl:"Dobry wieczór",cs:"Dobrý večer",sv:"God kväll",el:"Καλησπέρα"},
  "Recent Transactions":{fr:"Transactions récentes",de:"Letzte Transaktionen",es:"Transacciones recientes",pt:"Transações recentes",it:"Transazioni recenti",nl:"Recente transacties",ru:"Последние транзакции",tr:"Son işlemler",ar:"المعاملات الأخيرة",fa:"تراکنش‌های اخیر",he:"עסקאות אחרונות",ur:"حالیہ لین دین",hi:"हाल के लेनदेन",bn:"সাম্প্রতিক লেনদেন",zh:"最近交易",ja:"最近の取引",ko:"최근 거래",vi:"Giao dịch gần đây",th:"รายการล่าสุด",id:"Transaksi Terbaru",ms:"Transaksi Terkini",tl:"Mga Kamakailang Transaksyon",sw:"Miamala ya Hivi Karibuni",yo:"Àwọn ìdúnàádúrà aipẹ́",ha:"Ma'amaloli na kwanan nan",am:"የቅርብ ጊዜ ግብይቶች",uk:"Останні транзакції",ro:"Tranzacții recente",pl:"Ostatnie transakcje",cs:"Nedávné transakce",sv:"Senaste transaktioner",el:"Πρόσφατες Συναλλαγές"},
  "See all":      {fr:"Voir tout",de:"Alle anzeigen",es:"Ver todo",pt:"Ver tudo",it:"Vedi tutto",nl:"Alles zien",ru:"Все",tr:"Tümü",ar:"عرض الكل",fa:"همه را ببین",he:"ראה הכל",ur:"سب دیکھیں",hi:"सभी देखें",bn:"সব দেখুন",zh:"查看全部",ja:"すべて見る",ko:"전체 보기",vi:"Xem tất cả",th:"ดูทั้งหมด",id:"Lihat semua",ms:"Lihat semua",tl:"Tingnan lahat",sw:"Ona zote",yo:"Wo gbogbo",ha:"Duba duka",am:"ሁሉንም ተመልከት",uk:"Всі",ro:"Vezi tot",pl:"Zobacz wszystko",cs:"Zobrazit vše",sv:"Se alla",el:"Δες όλα"},
  // PAGE TITLES
  "Send Money":   {fr:"Envoyer de l'argent",de:"Geld senden",es:"Enviar dinero",pt:"Enviar dinheiro",it:"Invia denaro",nl:"Geld sturen",ru:"Отправить деньги",tr:"Para gönder",ar:"إرسال الأموال",fa:"ارسال پول",he:"שלח כסף",ur:"پیسے بھیجیں",hi:"पैसे भेजें",bn:"টাকা পাঠান",zh:"汇款",ja:"送金",ko:"송금",vi:"Gửi tiền",th:"ส่งเงิน",id:"Kirim Uang",ms:"Hantar Wang",tl:"Magpadala ng Pera",sw:"Tuma Pesa",yo:"Fi owó ránṣẹ́",ha:"Aika kuɗi",am:"ገንዘብ ላክ",uk:"Надіслати гроші",ro:"Trimite bani",pl:"Wyślij pieniądze",cs:"Poslat peníze",sv:"Skicka pengar",el:"Αποστολή χρημάτων"},
  "Withdraw Funds":{fr:"Retirer des fonds",de:"Geld abheben",es:"Retirar fondos",pt:"Sacar fundos",it:"Prelievo fondi",nl:"Geld opnemen",ru:"Снять средства",tr:"Para çek",ar:"سحب الأموال",fa:"برداشت وجه",he:"משוך כספים",ur:"فنڈز نکالیں",hi:"धनराशि निकालें",bn:"অর্থ উত্তোলন করুন",zh:"提取资金",ja:"出金する",ko:"자금 출금",vi:"Rút tiền",th:"ถอนเงิน",id:"Tarik Dana",ms:"Keluarkan Dana",tl:"Mag-withdraw ng Pondo",sw:"Toa Fedha",yo:"Yọ owó",ha:"Cire kuɗi",am:"ገንዘብ አውጣ",uk:"Зняти кошти",ro:"Retrage fonduri",pl:"Wypłać środki",cs:"Vybrat prostředky",sv:"Ta ut pengar",el:"Ανάληψη κεφαλαίων"},
  "Account Details":{fr:"Détails du compte",de:"Kontodetails",es:"Detalles de cuenta",pt:"Detalhes da conta",it:"Dettagli conto",nl:"Accountgegevens",ru:"Данные счёта",tr:"Hesap detayları",ar:"تفاصيل الحساب",fa:"جزئیات حساب",he:"פרטי חשבון",ur:"اکاؤنٹ کی تفصیل",hi:"खाता विवरण",bn:"অ্যাকাউন্ট বিবরণ",zh:"账户详情",ja:"口座詳細",ko:"계좌 세부정보",vi:"Chi tiết tài khoản",th:"รายละเอียดบัญชี",id:"Detail Rekening",ms:"Butiran Akaun",tl:"Mga Detalye ng Account",sw:"Maelezo ya Akaunti",yo:"Àwọn ìsọrọ̀ àkọsílẹ̀",ha:"Cikakkun bayanai na asusun",am:"የመለያ ዝርዝሮች",uk:"Деталі рахунку",ro:"Detalii cont",pl:"Szczegóły konta",cs:"Detaily účtu",sv:"Kontodetaljer",el:"Στοιχεία λογαριασμού"},
  "Transaction History":{fr:"Historique des transactions",de:"Transaktionsverlauf",es:"Historial de transacciones",pt:"Histórico de transações",it:"Cronologia transazioni",nl:"Transactiegeschiedenis",ru:"История транзакций",tr:"İşlem geçmişi",ar:"سجل المعاملات",fa:"تاریخچه تراکنش",he:"היסטוריית עסקאות",ur:"لین دین کی تاریخ",hi:"लेनदेन इतिहास",bn:"লেনদেনের ইতিহাস",zh:"交易历史",ja:"取引履歴",ko:"거래 내역",vi:"Lịch sử giao dịch",th:"ประวัติรายการ",id:"Riwayat Transaksi",ms:"Sejarah Transaksi",tl:"Kasaysayan ng Transaksyon",sw:"Historia ya Miamala",yo:"Ìtàn ìdúnàádúrà",ha:"Tarihin ma'amaloli",am:"የግብይት ታሪክ",uk:"Історія транзакцій",ro:"Istoricul tranzacțiilor",pl:"Historia transakcji",cs:"Historie transakcí",sv:"Transaktionshistorik",el:"Ιστορικό συναλλαγών"},
  // LOGIN
  "Sign in to your account":{fr:"Connectez-vous",de:"Anmelden",es:"Iniciar sesión",pt:"Entrar",it:"Accedi",nl:"Inloggen",ru:"Войдите в аккаунт",tr:"Giriş yapın",ar:"تسجيل الدخول",fa:"ورود",he:"התחבר",ur:"سائن ان کریں",hi:"साइन इन करें",bn:"সাইন ইন করুন",zh:"登录账户",ja:"サインイン",ko:"로그인",vi:"Đăng nhập",th:"เข้าสู่ระบบ",id:"Masuk",ms:"Log masuk",tl:"Mag-sign in",sw:"Ingia",yo:"Wọlé",ha:"Shiga",am:"ግባ",uk:"Увійдіть",ro:"Conectați-vă",pl:"Zaloguj się",cs:"Přihlásit se",sv:"Logga in",el:"Σύνδεση"},
  "Email address":{fr:"Adresse e-mail",de:"E-Mail-Adresse",es:"Correo electrónico",pt:"Endereço de e-mail",it:"Indirizzo email",nl:"E-mailadres",ru:"Электронная почта",tr:"E-posta adresi",ar:"البريد الإلكتروني",fa:"آدرس ایمیل",he:"כתובת אימייל",ur:"ای میل پتہ",hi:"ईमेल पता",bn:"ইমেইল ঠিকানা",zh:"电子邮件",ja:"メールアドレス",ko:"이메일 주소",vi:"Địa chỉ email",th:"อีเมล",id:"Alamat email",ms:"Alamat e-mel",tl:"Email address",sw:"Anwani ya barua pepe",yo:"Àdírẹ́sì ìmẹ́lì",ha:"Adireshin imel",am:"የኢሜይል አድራሻ",uk:"Електронна пошта",ro:"Adresă de e-mail",pl:"Adres e-mail",cs:"E-mailová adresa",sv:"E-postadress",el:"Διεύθυνση email"},
  "Password":     {fr:"Mot de passe",de:"Passwort",es:"Contraseña",pt:"Senha",it:"Password",nl:"Wachtwoord",ru:"Пароль",tr:"Şifre",ar:"كلمة المرور",fa:"رمز عبور",he:"סיסמה",ur:"پاس ورڈ",hi:"पासवर्ड",bn:"পাসওয়ার্ড",zh:"密码",ja:"パスワード",ko:"비밀번호",vi:"Mật khẩu",th:"รหัสผ่าน",id:"Kata sandi",ms:"Kata laluan",tl:"Password",sw:"Nywila",yo:"Ọ̀rọ̀ àṣírí",ha:"Kalmar sirri",am:"የይለፍ ቃል",uk:"Пароль",ro:"Parolă",pl:"Hasło",cs:"Heslo",sv:"Lösenord",el:"Κωδικός"},
  "Sign In":      {fr:"Se connecter",de:"Anmelden",es:"Iniciar sesión",pt:"Entrar",it:"Accedi",nl:"Inloggen",ru:"Войти",tr:"Giriş yap",ar:"تسجيل الدخول",fa:"ورود",he:"כניסה",ur:"سائن ان",hi:"साइन इन",bn:"সাইন ইন",zh:"登录",ja:"サインイン",ko:"로그인",vi:"Đăng nhập",th:"เข้าสู่ระบบ",id:"Masuk",ms:"Log masuk",tl:"Mag-sign in",sw:"Ingia",yo:"Wọlé",ha:"Shiga",am:"ግባ",uk:"Увійти",ro:"Conectați-vă",pl:"Zaloguj",cs:"Přihlásit",sv:"Logga in",el:"Σύνδεση"},
  // SETTINGS
  "Personal Information":{fr:"Informations personnelles",de:"Persönliche Daten",es:"Información personal",pt:"Informações pessoais",it:"Informazioni personali",nl:"Persoonlijke informatie",ru:"Личная информация",tr:"Kişisel bilgiler",ar:"المعلومات الشخصية",fa:"اطلاعات شخصی",he:"מידע אישי",ur:"ذاتی معلومات",hi:"व्यक्तिगत जानकारी",bn:"ব্যক্তিগত তথ্য",zh:"个人信息",ja:"個人情報",ko:"개인 정보",vi:"Thông tin cá nhân",th:"ข้อมูลส่วนตัว",id:"Informasi Pribadi",ms:"Maklumat Peribadi",tl:"Personal na Impormasyon",sw:"Taarifa za Kibinafsi",yo:"Àlàyé tọkọtaya",ha:"Bayanan sirri",am:"የግል መረጃ",uk:"Особиста інформація",ro:"Informații personale",pl:"Dane osobowe",cs:"Osobní informace",sv:"Personlig information",el:"Προσωπικά στοιχεία"},
  "Save Changes": {fr:"Enregistrer",de:"Speichern",es:"Guardar cambios",pt:"Salvar alterações",it:"Salva modifiche",nl:"Wijzigingen opslaan",ru:"Сохранить",tr:"Değişiklikleri kaydet",ar:"حفظ التغييرات",fa:"ذخیره تغییرات",he:"שמור שינויים",ur:"تبدیلیاں محفوظ کریں",hi:"परिवर्तन सहेजें",bn:"পরিবর্তন সংরক্ষণ করুন",zh:"保存更改",ja:"変更を保存",ko:"변경 사항 저장",vi:"Lưu thay đổi",th:"บันทึกการเปลี่ยนแปลง",id:"Simpan Perubahan",ms:"Simpan Perubahan",tl:"I-save ang mga Pagbabago",sw:"Hifadhi Mabadiliko",yo:"Tọ́jú àwọn ìyípadà",ha:"Ajiye canje-canje",am:"ለውጦችን አስቀምጥ",uk:"Зберегти зміни",ro:"Salvați modificările",pl:"Zapisz zmiany",cs:"Uložit změny",sv:"Spara ändringar",el:"Αποθήκευση αλλαγών"},
  // WITHDRAWAL
  "Withdrawal Method":{fr:"Mode de retrait",de:"Abhebungsmethode",es:"Método de retiro",pt:"Método de saque",it:"Metodo di prelievo",nl:"Opnamemethode",ru:"Способ снятия",tr:"Çekim yöntemi",ar:"طريقة السحب",fa:"روش برداشت",he:"שיטת משיכה",ur:"نکاسی کا طریقہ",hi:"निकासी का तरीका",bn:"উত্তোলন পদ্ধতি",zh:"取款方式",ja:"出金方法",ko:"출금 방법",vi:"Phương thức rút tiền",th:"วิธีการถอน",id:"Metode Penarikan",ms:"Kaedah Pengeluaran",tl:"Paraan ng Pag-withdraw",sw:"Njia ya Kutoa",yo:"Ọ̀nà ìyọ owó",ha:"Hanyar cire kuɗi",am:"የማውጫ ዘዴ",uk:"Спосіб зняття",ro:"Metodă de retragere",pl:"Metoda wypłaty",cs:"Způsob výběru",sv:"Uttagsmetod",el:"Μέθοδος ανάληψης"},
  "Processing Times":{fr:"Délais de traitement",de:"Bearbeitungszeiten",es:"Tiempos de procesamiento",pt:"Prazos de processamento",it:"Tempi di elaborazione",nl:"Verwerkingstijden",ru:"Сроки обработки",tr:"İşlem süreleri",ar:"أوقات المعالجة",fa:"زمان پردازش",he:"זמני עיבוד",ur:"پروسیسنگ کا وقت",hi:"प्रसंस्करण समय",bn:"প্রক্রিয়াকরণ সময়",zh:"处理时间",ja:"処理時間",ko:"처리 시간",vi:"Thời gian xử lý",th:"เวลาดำเนินการ",id:"Waktu Proses",ms:"Masa Pemprosesan",tl:"Oras ng Pagproseso",sw:"Muda wa Kuchakata",yo:"Àkókò ìṣiṣẹ́",ha:"Lokacin sarrafa",am:"የሂደት ጊዜ",uk:"Час обробки",ro:"Timpii de procesare",pl:"Czasy przetwarzania",cs:"Doby zpracování",sv:"Behandlingstider",el:"Χρόνοι επεξεργασίας"},
  "Submit Withdrawal Request":{fr:"Soumettre la demande",de:"Antrag einreichen",es:"Enviar solicitud",pt:"Enviar solicitação",it:"Invia richiesta",nl:"Verzoek indienen",ru:"Отправить заявку",tr:"Başvuru gönder",ar:"تقديم الطلب",fa:"ارسال درخواست",he:"שלח בקשה",ur:"درخواست جمع کریں",hi:"अनुरोध सबमिट करें",bn:"অনুরোধ জমা দিন",zh:"提交申请",ja:"申請を送信",ko:"요청 제출",vi:"Gửi yêu cầu",th:"ส่งคำขอ",id:"Kirim Permintaan",ms:"Hantar Permohonan",tl:"Isumite ang Kahilingan",sw:"Wasilisha Ombi",yo:"Fi ìbẹ̀wò ranṣẹ́",ha:"Aika buƙata",am:"ጥያቄ አስገባ",uk:"Надіслати запит",ro:"Trimiteți cererea",pl:"Prześlij wniosek",cs:"Odeslat žádost",sv:"Skicka begäran",el:"Υποβολή αίτησης"},
  "Available Balance":{fr:"Solde disponible",de:"Verfügbares Guthaben",es:"Saldo disponible",pt:"Saldo disponível",it:"Saldo disponibile",nl:"Beschikbaar saldo",ru:"Доступный баланс",tr:"Kullanılabilir bakiye",ar:"الرصيد المتاح",fa:"موجودی قابل استفاده",he:"יתרה זמינה",ur:"دستیاب بیلنس",hi:"उपलब्ध शेष",bn:"উপলব্ধ ব্যালেন্স",zh:"可用余额",ja:"利用可能残高",ko:"사용 가능 잔액",vi:"Số dư khả dụng",th:"ยอดคงเหลือที่ใช้ได้",id:"Saldo Tersedia",ms:"Baki Tersedia",tl:"Magagamit na Balanse",sw:"Salio Linalopatikana",yo:"Iye owó tó wà",ha:"Saƙon da ake da shi",am:"ያለ ሚዛን",uk:"Доступний баланс",ro:"Sold disponibil",pl:"Dostępne saldo",cs:"Dostupný zůstatek",sv:"Tillgängligt saldo",el:"Διαθέσιμο υπόλοιπο"},
};

function t(key, lang) {
  if (lang === 'en' || !T[key]) return key;
  return T[key][lang] || key;
}

function detectBrowserLang() {
  const code = (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase();
  return LANGS[code] ? code : 'en';
}

function getCurrentLang() {
  return localStorage.getItem('novbank_lang') || 'en';
}

function applyLang(lang) {
  if (!LANGS[lang]) lang = 'en';
  localStorage.setItem('novbank_lang', lang);

  // RTL
  const dir = LANGS[lang].dir || 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', lang);

  // Translate all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key, lang);
  });

  // Translate placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    el.placeholder = t(key, lang);
  });

  // Update switcher button
  updateSwitcherBtn(lang);
}

function updateSwitcherBtn(lang) {
  const btn = document.getElementById('lang-globe-btn');
  if (!btn) return;
  const info = LANGS[lang];
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" class="globe-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
    <span class="lang-flag">${info.flag}</span>
  `;
}

function toggleLangMenu() {
  const menu = document.getElementById('lang-menu');
  if (menu) menu.classList.toggle('open');
}

function buildLangSwitcher() {
  // Build in both desktop sidebar and mobile topbar
  ['lang-switcher-container', 'lang-switcher-container-mobile'].forEach(id => {
    const wrap = document.getElementById(id);
    if (!wrap) return;
  const currentLang = getCurrentLang();

  wrap.innerHTML = `
    <div class="lang-switcher-wrap">
      <button id="lang-globe-btn" class="lang-globe-btn" onclick="toggleLangMenu()" title="Change language">
      </button>
      <div class="lang-menu" id="lang-menu">
        <div class="lang-menu-header">Select Language</div>
        <div class="lang-menu-grid">
          ${Object.entries(LANGS).map(([code, info]) => `
            <button class="lang-opt ${code === currentLang ? 'active' : ''}"
              data-lang="${code}"
              onclick="applyLang('${code}');toggleLangMenu()">
              <span class="lo-flag">${info.flag}</span>
              <span class="lo-name">${info.name}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  updateSwitcherBtn(currentLang);
  });
}

function showLangPrompt(detectedLang) {
  if (detectedLang === 'en') return;
  if (localStorage.getItem('novbank_lang_prompted')) return;
  const info = LANGS[detectedLang];
  if (!info) return;

  const el = document.createElement('div');
  el.id = 'lang-prompt';
  el.innerHTML = `
    <div class="lp-inner">
      <div class="lp-left">
        <span class="lp-flag">${info.flag}</span>
        <div class="lp-text">We detected <strong>${info.name}</strong>. Switch language?</div>
      </div>
      <div class="lp-actions">
        <button class="lp-yes" onclick="applyLang('${detectedLang}');dismissPrompt()">Switch to ${info.name}</button>
        <button class="lp-no" onclick="dismissPrompt()">Keep English</button>
      </div>
    </div>
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('visible'));
}

function dismissPrompt() {
  localStorage.setItem('novbank_lang_prompted', '1');
  const el = document.getElementById('lang-prompt');
  if (el) { el.classList.remove('visible'); setTimeout(() => el.remove(), 400); }
}

// Close menu on outside click
document.addEventListener('click', e => {
  const menu = document.getElementById('lang-menu');
  const btn  = document.getElementById('lang-globe-btn');
  if (menu && menu.classList.contains('open') && !menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
    menu.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  buildLangSwitcher();
  const stored   = localStorage.getItem('novbank_lang');
  const detected = detectBrowserLang();
  if (stored && LANGS[stored]) {
    applyLang(stored);
  } else {
    applyLang('en');
    showLangPrompt(detected);
  }
});
