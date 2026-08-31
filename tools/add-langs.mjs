// add-langs.mjs — inject the 9 missing Stromma audio-guide languages into index.html
import { readFileSync, writeFileSync } from "node:fs";

const NEW_LANGS = [
  { code: "yue", name: "粵語", en: "Cantonese" },
  { code: "ko", name: "한국어", en: "Korean" },
  { code: "tr", name: "Türkçe", en: "Turkish" },
  { code: "th", name: "ไทย", en: "Thai" },
  { code: "ar", name: "العربية", en: "Arabic" },
  { code: "he", name: "עברית", en: "Hebrew" },
  { code: "pl", name: "Polski", en: "Polish" },
  { code: "id", name: "Bahasa Indonesia", en: "Indonesian" },
  { code: "hi", name: "हिन्दी", en: "Hindi" },
];

const NEW_STRINGS = {
  yue: {
    chooseLang: "選擇你的語言", welcome: "歡迎登船", appName: "語音導覽",
    byod: "自攜裝置（BYOD）", guideTitle: "你的個人語音導覽",
    step1Title: "連接 Wi‑Fi", step1Desc: "將你的電話連接到船上的 Wi‑Fi 網絡。",
    step2Title: "開啟語音導覽", step2Desc: "開啟語音導覽，享受旅程。",
    wifiNameLabel: "網絡", etiquetteTitle: "溫馨提示",
    etiquette1: "如有耳機，請使用耳機。", etiquette2: "使用揚聲器？請將裝置靠近耳邊。",
    etiquette3: "請保持音量適中。", followUs: "關注我們",
    feedback: "你的旅程如何？", feedbackDesc: "告訴我們 — 只需一分鐘。",
    surveyBtn: "留下評價", enjoy: "祝你旅途愉快！", openGuideBtn: "開啟語音導覽",
  },
  ko: {
    chooseLang: "언어를 선택하세요", welcome: "탑승을 환영합니다", appName: "오디오 가이드",
    byod: "개인 기기 사용(BYOD)", guideTitle: "나만의 오디오 가이드",
    step1Title: "Wi‑Fi에 연결하세요", step1Desc: "휴대폰을 선내 Wi‑Fi 네트워크에 연결하세요.",
    step2Title: "오디오 가이드를 여세요", step2Desc: "오디오 가이드를 열고 투어를 즐기세요.",
    wifiNameLabel: "네트워크", etiquetteTitle: "알아두면 좋은 점",
    etiquette1: "이어폰이 있으시면 사용해 주세요.", etiquette2: "스피커를 사용하시나요? 기기를 귀 가까이 대주세요.",
    etiquette3: "볼륨을 낮게 유지해 주세요.", followUs: "팔로우하기",
    feedback: "투어는 어떠셨나요?", feedbackDesc: "의견을 들려주세요 — 1분이면 충분합니다.",
    surveyBtn: "리뷰 남기기", enjoy: "투어를 즐기세요!", openGuideBtn: "오디오 가이드 열기",
  },
  tr: {
    chooseLang: "Dilinizi seçin", welcome: "Gemiye hoş geldiniz", appName: "Sesli Rehber",
    byod: "Kendi Cihazını Getir (BYOD)", guideTitle: "Kişisel sesli rehberiniz",
    step1Title: "Wi‑Fi'ye bağlanın", step1Desc: "Telefonunuzu gemideki Wi‑Fi ağına bağlayın.",
    step2Title: "Sesli rehberi açın", step2Desc: "Sesli rehberi açın ve turun keyfini çıkarın.",
    wifiNameLabel: "Ağ", etiquetteTitle: "Bilmenizde fayda var",
    etiquette1: "Kulaklığınız varsa lütfen kullanın.", etiquette2: "Hoparlör mü kullanıyorsunuz? Cihazınızı kulağınıza yakın tutun.",
    etiquette3: "Lütfen sesi düşük tutun.", followUs: "Bizi takip edin",
    feedback: "Turunuz nasıldı?", feedbackDesc: "Bize bildirin — yalnızca bir dakika sürer.",
    surveyBtn: "Yorum bırakın", enjoy: "İyi eğlenceler!", openGuideBtn: "Sesli rehberi aç",
  },
  th: {
    chooseLang: "เลือกภาษาของคุณ", welcome: "ยินดีต้อนรับขึ้นเรือ", appName: "เครื่องบรรยายเสียง",
    byod: "ใช้อุปกรณ์ของตนเอง (BYOD)", guideTitle: "เครื่องบรรยายเสียงส่วนตัวของคุณ",
    step1Title: "เชื่อมต่อ Wi‑Fi", step1Desc: "เชื่อมต่อโทรศัพท์ของคุณกับเครือข่าย Wi‑Fi บนเรือ",
    step2Title: "เปิดเครื่องบรรยายเสียง", step2Desc: "เปิดเครื่องบรรยายเสียงและเพลิดเพลินกับทัวร์",
    wifiNameLabel: "เครือข่าย", etiquetteTitle: "ข้อมูลน่ารู้",
    etiquette1: "หากมีหูฟัง กรุณาใช้หูฟัง", etiquette2: "ใช้ลำโพงอยู่หรือไม่? ถืออุปกรณ์ไว้ใกล้หูของคุณ",
    etiquette3: "กรุณาลดระดับเสียง", followUs: "ติดตามเรา",
    feedback: "ทัวร์เป็นอย่างไรบ้าง?", feedbackDesc: "บอกให้เราทราบ — ใช้เวลาเพียงหนึ่งนาที",
    surveyBtn: "เขียนรีวิว", enjoy: "ขอให้สนุกกับการทัวร์!", openGuideBtn: "เปิดเครื่องบรรยายเสียง",
  },
  ar: {
    chooseLang: "اختر لغتك", welcome: "مرحبًا بكم على متن القارب", appName: "الدليل الصوتي",
    byod: "أحضر جهازك الخاص (BYOD)", guideTitle: "دليلك الصوتي الشخصي",
    step1Title: "الاتصال بشبكة Wi‑Fi", step1Desc: "صِل هاتفك بشبكة Wi‑Fi الموجودة على متن القارب.",
    step2Title: "افتح الدليل الصوتي", step2Desc: "افتح الدليل الصوتي واستمتع بالجولة.",
    wifiNameLabel: "الشبكة", etiquetteTitle: "معلومات مفيدة",
    etiquette1: "إذا كان لديك سماعات، يرجى استخدامها.", etiquette2: "هل تستخدم مكبر الصوت؟ أبقِ جهازك قريبًا من أذنك.",
    etiquette3: "يرجى إبقاء مستوى الصوت منخفضًا.", followUs: "تابعنا",
    feedback: "كيف كانت جولتك؟", feedbackDesc: "أخبرنا برأيك — لن يستغرق الأمر سوى دقيقة.",
    surveyBtn: "اترك تقييمًا", enjoy: "استمتع بجولتك!", openGuideBtn: "افتح الدليل الصوتي",
  },
  he: {
    chooseLang: "בחרו את השפה", welcome: "ברוכים הבאים לסיפון", appName: "מדריך קולי",
    byod: "הביאו את המכשיר שלכם (BYOD)", guideTitle: "המדריך הקולי האישי שלכם",
    step1Title: "התחברו ל‑Wi‑Fi", step1Desc: "חברו את הטלפון לרשת ה‑Wi‑Fi שבספינה.",
    step2Title: "פתחו את המדריך הקולי", step2Desc: "פתחו את המדריך הקולי ותהנו מהסיור.",
    wifiNameLabel: "רשת", etiquetteTitle: "כדאי לדעת",
    etiquette1: "אם יש לכם אוזניות, השתמשו בהן.", etiquette2: "משתמשים ברמקול? החזיקו את המכשיר קרוב לאוזן.",
    etiquette3: "שמרו על עוצמת קול נמוכה.", followUs: "עקבו אחרינו",
    feedback: "איך היה הסיור?", feedbackDesc: "ספרו לנו — זה לוקח רק דקה.",
    surveyBtn: "השאירו חוות דעת", enjoy: "תהנו מהסיור!", openGuideBtn: "פתחו את המדריך הקולי",
  },
  pl: {
    chooseLang: "Wybierz język", welcome: "Witamy na pokładzie", appName: "Przewodnik audio",
    byod: "Skorzystaj z własnego urządzenia (BYOD)", guideTitle: "Twój osobisty przewodnik audio",
    step1Title: "Połącz się z Wi‑Fi", step1Desc: "Połącz telefon z siecią Wi‑Fi na pokładzie.",
    step2Title: "Otwórz przewodnik audio", step2Desc: "Otwórz przewodnik audio i ciesz się wycieczką.",
    wifiNameLabel: "Sieć", etiquetteTitle: "Warto wiedzieć",
    etiquette1: "Jeśli masz słuchawki, skorzystaj z nich.", etiquette2: "Używasz głośnika? Trzymaj urządzenie blisko ucha.",
    etiquette3: "Ustaw niski poziom głośności.", followUs: "Obserwuj nas",
    feedback: "Jak podobał Ci się rejs?", feedbackDesc: "Daj nam znać — to zajmie tylko minutę.",
    surveyBtn: "Zostaw opinię", enjoy: "Miłego rejsu!", openGuideBtn: "Otwórz przewodnik audio",
  },
  id: {
    chooseLang: "Pilih bahasa Anda", welcome: "Selamat datang di kapal", appName: "Pemandu Audio",
    byod: "Bawa Perangkat Anda Sendiri (BYOD)", guideTitle: "Pemandu audio pribadi Anda",
    step1Title: "Hubungkan ke Wi‑Fi", step1Desc: "Hubungkan ponsel Anda ke jaringan Wi‑Fi di kapal.",
    step2Title: "Buka pemandu audio", step2Desc: "Buka pemandu audio dan nikmati tur Anda.",
    wifiNameLabel: "Jaringan", etiquetteTitle: "Perlu diketahui",
    etiquette1: "Jika Anda memiliki earphone, silakan gunakan.", etiquette2: "Menggunakan pengeras suara? Dekatkan perangkat Anda ke telinga.",
    etiquette3: "Mohon jaga volume tetap rendah.", followUs: "Ikuti kami",
    feedback: "Bagaimana tur Anda?", feedbackDesc: "Beri tahu kami — hanya butuh satu menit.",
    surveyBtn: "Tinggalkan ulasan", enjoy: "Selamat menikmati tur!", openGuideBtn: "Buka pemandu audio",
  },
  hi: {
    chooseLang: "अपनी भाषा चुनें", welcome: "नाव पर आपका स्वागत है", appName: "ऑडियो गाइड",
    byod: "अपना उपकरण लाएँ (BYOD)", guideTitle: "आपका निजी ऑडियो गाइड",
    step1Title: "Wi‑Fi से कनेक्ट करें", step1Desc: "अपने फ़ोन को नाव के Wi‑Fi नेटवर्क से कनेक्ट करें।",
    step2Title: "ऑडियो गाइड खोलें", step2Desc: "ऑडियो गाइड खोलें और टूर का आनंद लें।",
    wifiNameLabel: "नेटवर्क", etiquetteTitle: "जानने योग्य बातें",
    etiquette1: "यदि आपके पास ईयरफ़ोन हैं, तो कृपया उनका उपयोग करें।", etiquette2: "स्पीकर का उपयोग कर रहे हैं? उपकरण को कान के पास रखें।",
    etiquette3: "कृपया आवाज़ धीमी रखें।", followUs: "हमें फ़ॉलो करें",
    feedback: "आपका टूर कैसा रहा?", feedbackDesc: "हमें बताएँ — इसमें केवल एक मिनट लगता है।",
    surveyBtn: "समीक्षा छोड़ें", enjoy: "टूर का आनंद लें!", openGuideBtn: "ऑडियो गाइड खोलें",
  },
};

const PATH = "index.html";
let s = readFileSync(PATH, "utf8");

// 1) LANGS: append after "Russian"}
const langsJs = NEW_LANGS.map((o) => JSON.stringify(o)).join(", ");
if (!s.includes('"Russian"}];')) throw new Error("LANGS anchor not found");
s = s.replace('"Russian"}];', '"Russian"}, ' + langsJs + '];');

// 2) STRINGS: insert new objects right after "const STRINGS = {"
const stringsJs = Object.entries(NEW_STRINGS)
  .map(([code, obj]) => JSON.stringify(code) + ": " + JSON.stringify(obj))
  .join(", ");
if (!s.includes("const STRINGS = {")) throw new Error("STRINGS anchor not found");
s = s.replace("const STRINGS = {", "const STRINGS = {" + stringsJs + ", ");

writeFileSync(PATH, s, "utf8");

// verify counts
const langCount = (s.match(/"code": "/g) || []).length;
console.log("LANGS entries now:", langCount);
for (const c of ["yue","ko","tr","th","ar","he","pl","id","hi"]) {
  console.log("  contains", c, ":", s.includes('"'+c+'": {'));
}
