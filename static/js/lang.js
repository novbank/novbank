// NovBank — lang.js (full page translation + currency)

const LANGS = {
  en: { name:"English",    flag:"🇺🇸", dir:"ltr" },
  fr: { name:"Français",   flag:"🇫🇷", dir:"ltr" },
  de: { name:"Deutsch",    flag:"🇩🇪", dir:"ltr" },
  es: { name:"Español",    flag:"🇪🇸", dir:"ltr" },
  pt: { name:"Português",  flag:"🇵🇹", dir:"ltr" },
  it: { name:"Italiano",   flag:"🇮🇹", dir:"ltr" },
  nl: { name:"Nederlands", flag:"🇳🇱", dir:"ltr" },
  ru: { name:"Русский",    flag:"🇷🇺", dir:"ltr" },
  tr: { name:"Türkçe",     flag:"🇹🇷", dir:"ltr" },
  ar: { name:"العربية",    flag:"🇸🇦", dir:"rtl" },
  zh: { name:"中文",        flag:"🇨🇳", dir:"ltr" },
  ja: { name:"日本語",      flag:"🇯🇵", dir:"ltr" },
  ko: { name:"한국어",      flag:"🇰🇷", dir:"ltr" },
  hi: { name:"हिन्दी",     flag:"🇮🇳", dir:"ltr" },
  sw: { name:"Kiswahili",  flag:"🇰🇪", dir:"ltr" },
  yo: { name:"Yorùbá",     flag:"🇳🇬", dir:"ltr" },
  ha: { name:"Hausa",      flag:"🇳🇬", dir:"ltr" },
};

// ── LANGUAGE ─────────────────────────────────────────────────
// Static translations for known UI keys (fast, no API)
const T = {
  "Home":{"fr":"Accueil","de":"Start","es":"Inicio","pt":"Início","ar":"الرئيسية","zh":"首页","ja":"ホーム","ko":"홈","hi":"होम","ru":"Главная","tr":"Ana Sayfa","sw":"Nyumbani","yo":"Ilé","ha":"Gida","it":"Home","nl":"Home"},
  "Account":{"fr":"Compte","de":"Konto","es":"Cuenta","pt":"Conta","ar":"الحساب","zh":"账户","ja":"口座","ko":"계좌","hi":"खाता","ru":"Счёт","tr":"Hesap","sw":"Akaunti","yo":"Àkọsílẹ̀","ha":"Asusun","it":"Conto","nl":"Rekening"},
  "Transfer":{"fr":"Virement","de":"Überweisung","es":"Transferencia","pt":"Transferência","ar":"تحويل","zh":"转账","ja":"振込","ko":"이체","hi":"स्थानांतरण","ru":"Перевод","tr":"Havale","sw":"Uhamisho","yo":"Gbígbé","ha":"Canja","it":"Bonifico","nl":"Overschrijving"},
  "Withdraw":{"fr":"Retrait","de":"Abhebung","es":"Retiro","pt":"Saque","ar":"سحب","zh":"取款","ja":"出金","ko":"출금","hi":"निकासी","ru":"Снятие","tr":"Çekim","sw":"Kutoa","yo":"Ìyọ","ha":"Cire","it":"Prelievo","nl":"Opname"},
  "Settings":{"fr":"Paramètres","de":"Einstellungen","es":"Configuración","pt":"Configurações","ar":"الإعدادات","zh":"设置","ja":"設定","ko":"설정","hi":"सेटिंग्स","ru":"Настройки","tr":"Ayarlar","sw":"Mipangilio","yo":"Ètò","ha":"Saiti","it":"Impostazioni","nl":"Instellingen"},
  "Statement":{"fr":"Relevé","de":"Kontoauszug","es":"Estado de cuenta","pt":"Extrato","ar":"كشف الحساب","zh":"对账单","ja":"明細書","ko":"거래명세서","hi":"विवरण","ru":"Выписка","tr":"Hesap özeti","sw":"Taarifa","yo":"Ìwé àkọsílẹ̀","ha":"Bayani","it":"Estratto","nl":"Afschrift"},
  "History":{"fr":"Historique","de":"Verlauf","es":"Historial","pt":"Histórico","ar":"السجل","zh":"历史","ja":"履歴","ko":"내역","hi":"इतिहास","ru":"История","tr":"Geçmiş","sw":"Historia","yo":"Ìtàn","ha":"Tarihi","it":"Cronologia","nl":"Geschiedenis"},
  "Dashboard":{"fr":"Tableau de bord","de":"Übersicht","es":"Panel","pt":"Painel","ar":"لوحة التحكم","zh":"控制台","ja":"ダッシュボード","ko":"대시보드","hi":"डैशबोर्ड","ru":"Панель","tr":"Pano","sw":"Dashibodi","yo":"Pánẹ́ẹ̀lì","ha":"Allon sarrafa","it":"Pannello","nl":"Dashboard"},
  "Customers":{"fr":"Clients","de":"Kunden","es":"Clientes","pt":"Clientes","ar":"العملاء","zh":"客户","ja":"顧客","ko":"고객","hi":"ग्राहक","ru":"Клиенты","tr":"Müşteriler","sw":"Wateja","yo":"Àwọn oléwò","ha":"Abokai","it":"Clienti","nl":"Klanten"},
  "Transactions":{"fr":"Transactions","de":"Transaktionen","es":"Transacciones","pt":"Transações","ar":"المعاملات","zh":"交易","ja":"取引","ko":"거래","hi":"लेनदेन","ru":"Транзакции","tr":"İşlemler","sw":"Miamala","yo":"Àwọn ìdúnàádúrà","ha":"Ma'amaloli","it":"Transazioni","nl":"Transacties"},
  "Add Customer":{"fr":"Ajouter un client","de":"Kunden hinzufügen","es":"Agregar cliente","pt":"Adicionar cliente","ar":"إضافة عميل","zh":"添加客户","ja":"顧客追加","ko":"고객 추가","hi":"ग्राहक जोड़ें","ru":"Добавить клиента","tr":"Müşteri ekle","sw":"Ongeza Mteja","yo":"Fi oléwò kun","ha":"Ƙara abokin ciniki","it":"Aggiungi cliente","nl":"Klant toevoegen"},
  "Sign out":{"fr":"Déconnexion","de":"Abmelden","es":"Cerrar sesión","pt":"Sair","ar":"تسجيل خروج","zh":"退出","ja":"サインアウト","ko":"로그아웃","hi":"साइन आउट","ru":"Выйти","tr":"Çıkış","sw":"Ondoka","yo":"Jáde","ha":"Fita","it":"Esci","nl":"Uitloggen"},
  "Send Money":{"fr":"Envoyer de l'argent","de":"Geld senden","es":"Enviar dinero","pt":"Enviar dinheiro","ar":"إرسال الأموال","zh":"汇款","ja":"送金","ko":"송금","hi":"पैसे भेजें","ru":"Отправить деньги","tr":"Para gönder","sw":"Tuma Pesa","yo":"Fi owó ránṣẹ́","ha":"Aika kuɗi","it":"Invia denaro","nl":"Geld sturen"},
  "Available Balance":{"fr":"Solde disponible","de":"Verfügbares Guthaben","es":"Saldo disponible","pt":"Saldo disponível","ar":"الرصيد المتاح","zh":"可用余额","ja":"利用可能残高","ko":"사용 가능 잔액","hi":"उपलब्ध शेष","ru":"Доступный баланс","tr":"Kullanılabilir bakiye","sw":"Salio Linalopatikana","yo":"Iye owó tó wà","ha":"Saƙon da ake da shi","it":"Saldo disponibile","nl":"Beschikbaar saldo"},
  "Recent Transactions":{"fr":"Transactions récentes","de":"Letzte Transaktionen","es":"Transacciones recientes","pt":"Transações recentes","ar":"المعاملات الأخيرة","zh":"最近交易","ja":"最近の取引","ko":"최근 거래","hi":"हाल के लेनदेन","ru":"Последние транзакции","tr":"Son işlemler","sw":"Miamala ya Hivi Karibuni","yo":"Àwọn ìdúnàádúrà aipẹ́","ha":"Ma'amaloli na kwanan nan","it":"Transazioni recenti","nl":"Recente transacties"},
  "See all":{"fr":"Voir tout","de":"Alle anzeigen","es":"Ver todo","pt":"Ver tudo","ar":"عرض الكل","zh":"查看全部","ja":"すべて見る","ko":"전체 보기","hi":"सभी देखें","ru":"Все","tr":"Tümü","sw":"Ona zote","yo":"Wo gbogbo","ha":"Duba duka","it":"Vedi tutto","nl":"Alles zien"},
  "Sign In":{"fr":"Se connecter","de":"Anmelden","es":"Iniciar sesión","pt":"Entrar","ar":"تسجيل الدخول","zh":"登录","ja":"サインイン","ko":"로그인","hi":"साइन इन","ru":"Войти","tr":"Giriş yap","sw":"Ingia","yo":"Wọlé","ha":"Shiga","it":"Accedi","nl":"Inloggen"},
  "Sign in to your account":{"fr":"Connectez-vous","de":"Anmelden","es":"Iniciar sesión","pt":"Entrar","ar":"تسجيل الدخول","zh":"登录账户","ja":"サインイン","ko":"로그인","hi":"साइन इन करें","ru":"Войдите в аккаунт","tr":"Giriş yapın","sw":"Ingia","yo":"Wọlé","ha":"Shiga","it":"Accedi","nl":"Inloggen"},
  "Email address":{"fr":"Adresse e-mail","de":"E-Mail-Adresse","es":"Correo electrónico","pt":"Endereço de e-mail","ar":"البريد الإلكتروني","zh":"电子邮件","ja":"メールアドレス","ko":"이메일 주소","hi":"ईमेल पता","ru":"Электронная почта","tr":"E-posta adresi","sw":"Barua pepe","yo":"Ìmẹ́lì","ha":"Imel","it":"Email","nl":"E-mailadres"},
  "Password":{"fr":"Mot de passe","de":"Passwort","es":"Contraseña","pt":"Senha","ar":"كلمة المرور","zh":"密码","ja":"パスワード","ko":"비밀번호","hi":"पासवर्ड","ru":"Пароль","tr":"Şifre","sw":"Nywila","yo":"Ọ̀rọ̀ àṣírí","ha":"Kalmar sirri","it":"Password","nl":"Wachtwoord"},
  "Account Details":{"fr":"Détails du compte","de":"Kontodetails","es":"Detalles de cuenta","pt":"Detalhes da conta","ar":"تفاصيل الحساب","zh":"账户详情","ja":"口座詳細","ko":"계좌 세부정보","hi":"खाता विवरण","ru":"Данные счёта","tr":"Hesap detayları","sw":"Maelezo ya Akaunti","yo":"Àwọn ìsọrọ̀ àkọsílẹ̀","ha":"Cikakkun bayanai na asusun","it":"Dettagli conto","nl":"Accountgegevens"},
  "Transaction History":{"fr":"Historique des transactions","de":"Transaktionsverlauf","es":"Historial de transacciones","pt":"Histórico de transações","ar":"سجل المعاملات","zh":"交易历史","ja":"取引履歴","ko":"거래 내역","hi":"लेनदेन इतिहास","ru":"История транзакций","tr":"İşlem geçmişi","sw":"Historia ya Miamala","yo":"Ìtàn ìdúnàádúrà","ha":"Tarihin ma'amaloli","it":"Cronologia transazioni","nl":"Transactiegeschiedenis"},
  "Save Changes":{"fr":"Enregistrer","de":"Speichern","es":"Guardar","pt":"Salvar","ar":"حفظ","zh":"保存","ja":"保存","ko":"저장","hi":"सहेजें","ru":"Сохранить","tr":"Kaydet","sw":"Hifadhi","yo":"Tọ́jú","ha":"Ajiye","it":"Salva","nl":"Opslaan"},
  "Good morning":{"fr":"Bonjour","de":"Guten Morgen","es":"Buenos días","pt":"Bom dia","ar":"صباح الخير","zh":"早上好","ja":"おはようございます","ko":"좋은 아침","hi":"सुप्रभात","ru":"Доброе утро","tr":"Günaydın","sw":"Habari za asubuhi","yo":"Ẹ káàárọ̀","ha":"Barka da safiya","it":"Buongiorno","nl":"Goedemorgen"},
  "Good afternoon":{"fr":"Bon après-midi","de":"Guten Tag","es":"Buenas tardes","pt":"Boa tarde","ar":"مساء الخير","zh":"下午好","ja":"こんにちは","ko":"안녕하세요","hi":"नमस्ते","ru":"Добрый день","tr":"İyi günler","sw":"Habari za mchana","yo":"Ẹ káàárọ̀","ha":"Barka da rana","it":"Buon pomeriggio","nl":"Goedemiddag"},
  "Good evening":{"fr":"Bonsoir","de":"Guten Abend","es":"Buenas noches","pt":"Boa noite","ar":"مساء النور","zh":"晚上好","ja":"こんばんは","ko":"좋은 저녁","hi":"शुभ संध्या","ru":"Добрый вечер","tr":"İyi akşamlar","sw":"Habari za jioni","yo":"Ẹ káalẹ́","ha":"Barka da yamma","it":"Buonasera","nl":"Goedenavond"},
};

function t(key, lang) {
  if (lang === 'en' || !T[key]) return key;
  return T[key][lang] || key;
}

function detectBrowserLang() {
  const code = (navigator.language || 'en').split('-')[0].toLowerCase();
  return LANGS[code] ? code : 'en';
}

function getCurrentLang() {
  return localStorage.getItem('novbank_lang') || 'en';
}

// Full page translation using MyMemory free API
async function translatePageContent(lang) {
  if (lang === 'en') return;
  const langMap = {
    fr:'fr',de:'de',es:'es',pt:'pt',it:'it',nl:'nl',
    ru:'ru',tr:'tr',ar:'ar',zh:'zh-CN',ja:'ja',ko:'ko',
    hi:'hi',sw:'sw',yo:'yo',ha:'ha'
  };
  const targetLang = langMap[lang];
  if (!targetLang) return;

  // Collect all text nodes that are not already translated and not empty
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        // Skip scripts, styles, inputs
        if (['SCRIPT','STYLE','INPUT','TEXTAREA','SELECT','CODE','PRE'].includes(tag)) return NodeFilter.FILTER_REJECT;
        // Skip if already has data-orig (already translated)
        if (parent.hasAttribute('data-orig')) return NodeFilter.FILTER_REJECT;
        const text = node.textContent.trim();
        if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
        // Skip numbers-only or symbols-only
        if (/^[\d\s$€£¥₦,.\-+%]+$/.test(text)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);

  // Translate in small batches using MyMemory API (free, no key needed)
  const BATCH = 5;
  for (let i = 0; i < nodes.length; i += BATCH) {
    const batch = nodes.slice(i, i + BATCH);
    await Promise.all(batch.map(async (n) => {
      const original = n.textContent.trim();
      if (!original) return;
      // Check cache first
      const cacheKey = `t_${lang}_${original.substring(0,50)}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        n.parentElement.setAttribute('data-orig', original);
        n.textContent = n.textContent.replace(original, cached);
        return;
      }
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(original)}&langpair=en|${targetLang}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.responseStatus === 200 && data.responseData) {
          const translated = data.responseData.translatedText;
          if (translated && translated !== original) {
            sessionStorage.setItem(cacheKey, translated);
            n.parentElement.setAttribute('data-orig', original);
            n.textContent = n.textContent.replace(original, translated);
          }
        }
      } catch(e) {}
    }));
  }
}

async function applyLang(lang) {
  if (!LANGS[lang]) lang = 'en';
  localStorage.setItem('novbank_lang', lang);

  const dir = LANGS[lang].dir || 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', lang);

  // First apply static translations (instant)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key, lang);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-ph'), lang);
  });

  // Update all switcher buttons
  updateSwitcherBtn(lang);

  // Then translate remaining page content via API
  if (lang !== 'en') {
    await translatePageContent(lang);
  }
}

function updateSwitcherBtn(lang, btnId) {
  const info = LANGS[lang];
  const selector = btnId ? `#${btnId}` : '.lang-globe-btn';
  document.querySelectorAll(selector).forEach(btn => {
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" class="globe-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
      <span class="lang-flag">${info.flag}</span>
    `;
  });
}

function toggleLangMenu(menuId, btnId) {
  const menu = document.getElementById(menuId);
  if (menu) menu.classList.toggle('open');
}

function buildLangSwitcher() {
  ['lang-switcher-container', 'lang-switcher-container-mobile'].forEach(containerId => {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    const currentLang = getCurrentLang();
    const menuId = 'lang-menu-' + containerId;
    const btnId  = 'lang-globe-btn-' + containerId;
    wrap.innerHTML = `
      <div class="lang-switcher-wrap">
        <button id="${btnId}" class="lang-globe-btn" onclick="toggleLangMenu('${menuId}','${btnId}')" title="Change language"></button>
        <div class="lang-menu" id="${menuId}">
          <div class="lang-menu-header">Select Language</div>
          <div class="lang-menu-grid">
            ${Object.entries(LANGS).map(([code, info]) => `
              <button class="lang-opt ${code === currentLang ? 'active' : ''}"
                data-lang="${code}"
                onclick="applyLang('${code}');toggleLangMenu('${menuId}','${btnId}')">
                <span class="lo-flag">${info.flag}</span>
                <span class="lo-name">${info.name}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    updateSwitcherBtn(currentLang, btnId);
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

document.addEventListener('click', e => {
  document.querySelectorAll('.lang-menu.open').forEach(menu => {
    const btn = menu.previousElementSibling;
    if (!menu.contains(e.target) && btn && !btn.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
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
