// --- 1. DEKLARASI GLOBAL ---
let currentLang = "id";
let currentSlideIndex = 0;
let slideTimer;

// --- 2. DATA TRANSLATIONS ---
const translations = {
  id: {
    nav: {
      home: "Beranda",
      profile: "Profil",
      scholarship: "Beasiswa",
      doc: "Dokumen",
      prakata: "Prakata Kepala Biro AAKK",
      organisasi: "ORGANISASI",
      progker: "PROGRAM KERJA",
      kinerja: "INDIKATOR KINERJA",
      ppid: "PPID PELAKSANA",
      org: "Organisasi",
      service: "Layanan",
    },
    hero: {
      title: "Layanan Kemahasiswaan Cerdas & Integratif",
      sub: "Pusat pelayanan administrasi digital, informasi beasiswa terpadu, dan pengembangan potensi mahasiswa UIN Syarif Hidayatullah Jakarta.",
      btn1: "Info Beasiswa",
      btn2: "Agenda Kampus",
      stats: "Mahasiswa Aktif",
    },
    beasiswa: { title: "Informasi Beasiswa", sub: "Kami membantu mahasiswa menemukan peluang bantuan pendidikan terbaik.", apply: "Daftar Sekarang", closed: "Pendaftaran Ditutup", open: "Buka", closedLabel: "Tutup" },
    dokumen: { title: "Pusat Dokumen & Unduhan", sub: "Unduh formulir dan panduan administrasi kemahasiswaan dengan mudah.", thName: "Nama File", thCat: "Kategori", thSize: "Ukuran" },
    services: { title: "Layanan Utama" },
    news: { title: "Informasi Terbaru", sub: "Update pengumuman dan berita kemahasiswaan", btn: "Semua Berita", detailBack: "Kembali ke Beranda" },
    footer: { desc: "Biro Administrasi Akademik, Kemahasiswaan dan Kerjasama (AAKK) melayani kebutuhan administrasi mahasiswa UIN Syarif Hidayatullah Jakarta.", links: "Tautan Penting", services: "Layanan Kami", contact: "Hubungi Kami" },
    orgPage: { title: "Struktur Organisasi Biro AAKK", sub: "Pengelola Administrasi Akademik, Kemahasiswaan, dan Kerjasama UIN Syarif Hidayatullah Jakarta." },
    skpiPage: { title: "Sertifikat Pendamping Ijazah (SKPI)", sub: "SKPI adalah dokumen resmi." },
    prestasiPage: { title: "Prestasi Mahasiswa", sub: "Database prestasi membanggakan UIN Jakarta." },
  },
  en: {
    nav: {
      home: "Home",
      profile: "Profile",
      scholarship: "Scholarship",
      doc: "Documents",
      prakata: "Introduction",
      organisasi: "ORGANIZATION",
      progker: "WORK PROGRAM",
      kinerja: "PERFORMANCE",
      ppid: "PPID",
      org: "Organization",
      service: "Services",
    },
    hero: { title: "Smart Student Services", sub: "Digital administration for UIN Syarif Hidayatullah Jakarta.", btn1: "Scholarship Info", btn2: "Agenda", stats: "Active Students" },
    beasiswa: { title: "Scholarship Information", sub: "We help students find scholarships.", apply: "Apply Now", closed: "Closed", open: "Open", closedLabel: "Closed" },
    dokumen: { title: "Document Center", sub: "Download forms easily.", thName: "Filename", thCat: "Category", thSize: "Size" },
    services: { title: "Main Services" },
    news: { title: "Latest Updates", sub: "Student news", btn: "All News", detailBack: "Back Home" },
    footer: { desc: "Biro AAKK services.", links: "Important Links", services: "Our Services", contact: "Contact Us" },
    orgPage: { title: "Bureau AAKK Org. Structure", sub: "Academic and Student Management." },
    skpiPage: { title: "Diploma Supplement (SKPI)", sub: "Official academic record." },
    prestasiPage: { title: "Student Achievement", sub: "UIN Jakarta high achievers." },
  },
};

// --- 3. DATA CAROUSEL & BERITA (JALUR LOKAL img/) ---
const slides = [
  { url: "img/IPK.jpg", title: "KIP Kuliah 2026", caption: "Segera Daftar! Pendaftaran KIP Kuliah 2026 Resmi Dibuka" },
  { url: "img/WISUDA.JPG", title: "Wisuda UIN", caption: "Persiapan Wisuda Sarjana & Pascasarjana Periode Januari" },
  { url: "img/workshop.jpg", title: "Workshop Soft Skill", caption: "Membangun Karakter Mahasiswa Unggul di Era Digital" },
  { url: "img/IKHTIAR.jpg", title: "Pesta Prestasi", caption: "Penyerahan Penghargaan Mahasiswa Berprestasi Nasional" },
  { url: "img/SPAN.jpg", title: "Digital AAKK", caption: "Layanan Legalisir Ijazah Kini Bisa Dilakukan Secara Online" },
];

const newsData = [
  {
    id: 1,
    tag: "Beasiswa",
    title: "Pendaftaran Beasiswa Bank Indonesia Tahun 2026",
    date: "12 Jan 2026",
    image: "img/ovt.jpg",
    content: "Bank Indonesia membuka pendaftaran beasiswa mahasiswa untuk tahun 2026. Beasiswa ini tersedia bagi mahasiswa aktif jenjang sarjana.",
  },
  { id: 2, tag: "Kegiatan", title: "Workshop Strategi Penulisan Jurnal Ilmiah", date: "10 Jan 2026", image: "img/ovt.jpg", content: "Workshop ini bertujuan untuk membekali mahasiswa dalam penulisan jurnal ilmiah internasional." },
  { id: 3, tag: "Pengumuman", title: "Pemilihan Mahasiswa Berprestasi (PILMAPRES)", date: "08 Jan 2026", image: "img/ovt.jpg", content: "UIN Jakarta kembali menyelenggarakan PILMAPRES untuk menjaring mahasiswa terbaik." },
];

// --- 4. DATA LAINNYA ---
const scholarshipData = [
  { type: "Internal", name: "Beasiswa Prestasi UIN", status: "Buka", desc: "Apresiasi bagi mahasiswa dengan IPK tertinggi." },
  { type: "Pemerintah", name: "KIP Kuliah", status: "Tutup", desc: "Program bantuan biaya pendidikan mahasiswa berpotensi akademik tinggi." },
];

const docData = [
  { name: "Panduan KIP 2026.pdf", cat: "Beasiswa", size: "2.4 MB" },
  { name: "Form Pendaftaran UKM.docx", cat: "Ormawa", size: "150 KB" },
];

const serviceData = [
  { title: "Beasiswa", desc: "Info Beasiswa Terkini", icon: "graduation-cap", color: "bg-blue-50", target: "beasiswa" },
  { title: "SKPI", desc: "Sertifikat Pendamping Ijazah", icon: "file-text", color: "bg-slate-50", target: "layanan" },
  { title: "Ormawa", desc: "Organisasi Mahasiswa", icon: "users", color: "bg-blue-50", target: "ormawa" },
  { title: "Prestasi", desc: "Database Prestasi", icon: "award", color: "bg-slate-50", target: "prestasi" },
];

// --- 5. LOGIKA UTAMA ---
function init() {
  lucide.createIcons();
  renderCarousel();
  renderServices();
  renderNews();
  renderScholarships();
  renderDocs();
  updateUIStrings();
  startSlideTimer();
}

function renderCarousel() {
  const container = document.getElementById("heroCarousel");
  const dotsContainer = document.getElementById("carouselDots");
  if (!container || !dotsContainer) return;
  container.innerHTML = slides
    .map(
      (s, i) => `
        <div class="slide ${i === currentSlideIndex ? "active" : ""}">
            <img src="${s.url}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80'">
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#336799]/80 to-transparent p-10 text-white text-start">
                <p class="text-xs font-black uppercase tracking-[0.2em] text-blue-300 text-start">${s.title}</p>
                <p class="text-xl font-bold text-start">${s.caption}</p>
            </div>
        </div>
    `
    )
    .join("");
  dotsContainer.innerHTML = slides
    .map(
      (_, i) => `
        <button onclick="goToSlide(${i})" class="w-2 transition-all duration-300 rounded-full ${i === currentSlideIndex ? "h-8 bg-[#FFD700]" : "h-2 bg-white/50 hover:bg-white"}"></button>
    `
    )
    .join("");
}

function startSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 5000);
}
function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  renderCarousel();
  startSlideTimer();
}
function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  renderCarousel();
  startSlideTimer();
}
function goToSlide(index) {
  currentSlideIndex = index;
  renderCarousel();
  startSlideTimer();
}

function renderServices() {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;
  grid.innerHTML = serviceData
    .map(
      (sv) => `
        <div onclick="navigateTo('${sv.target}')" class="group bg-white p-8 rounded-[35px] shadow-sm border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer text-start">
            <div class="${sv.color} text-[#336799] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#336799] group-hover:text-white transition-all text-start">
                <i data-lucide="${sv.icon}"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3 text-start">${sv.title}</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-6 text-start">${sv.desc}</p>
            <div class="flex items-center gap-2 text-xs font-bold text-[#336799] uppercase tracking-widest group-hover:gap-4 transition-all text-start">
                Detail <i data-lucide="arrow-right" class="w-4 h-4 text-start"></i>
            </div>
        </div>
    `
    )
    .join("");
  lucide.createIcons();
}

function renderNews() {
  const grid = document.getElementById("newsGrid");
  if (!grid) return;
  grid.innerHTML = newsData
    .map(
      (n) => `
        <article onclick="showNewsDetail(${n.id})" class="group cursor-pointer text-start">
            <div class="relative h-72 rounded-[40px] overflow-hidden mb-6 shadow-md border border-slate-100 text-start text-start">
                <img src="${n.image}" alt="${n.title}" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 text-start" onerror="this.src='https://images.unsplash.com/photo-1523240715632-d984bb4b990a?auto=format&fit=crop&w=800&q=80'">
                <div class="absolute top-5 left-5 text-start text-start">
                    <span class="bg-[#336799] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg text-start">${n.tag}</span>
                </div>
            </div>
            <h3 class="text-xl font-bold text-slate-800 group-hover:text-[#336799] transition-colors leading-tight line-clamp-2 text-start">${n.title}</h3>
            <div class="mt-4 flex items-center gap-2 text-slate-400 text-xs font-bold text-start">
                <i data-lucide="calendar" class="w-4 h-4 text-start"></i> ${n.date}
            </div>
        </article>
    `
    )
    .join("");
  lucide.createIcons();
}

function showNewsDetail(id) {
  const news = newsData.find((n) => n.id === id);
  if (!news) return;
  const container = document.getElementById("beritaDetailContent");
  container.innerHTML = `
        <img src="${news.image}" class="w-full h-[400px] object-cover rounded-[50px] mb-12 shadow-2xl" onerror="this.src='https://images.unsplash.com/photo-1523240715632-d984bb4b990a?auto=format&fit=crop&w=800&q=80'">
        <div class="flex items-center gap-4 mb-6 text-start">
            <span class="bg-[#336799] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">${news.tag}</span>
            <span class="text-slate-400 text-xs font-bold flex items-center gap-2 text-start"><i data-lucide="calendar" class="w-4 h-4 text-start"></i> ${news.date}</span>
        </div>
        <h1 class="text-4xl font-black text-slate-900 leading-tight mb-8 text-start">${news.title}</h1>
        <div class="prose prose-lg text-slate-600 leading-relaxed max-w-none text-start text-start">
            <p class="mb-6">${news.content}</p>
        </div>
    `;
  lucide.createIcons();
  navigateTo("beritaDetail");
}

function renderScholarships() {
  const grid = document.getElementById("scholarshipGrid");
  if (!grid) return;
  const lang = translations[currentLang];
  grid.innerHTML = scholarshipData
    .map(
      (s) => `
        <div class="bg-white p-10 rounded-[45px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full text-start text-start">
            <div class="flex justify-between items-center mb-8 text-start text-start">
                <span class="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-blue-50 text-[#336799] rounded-full text-start text-start text-start">${s.type}</span>
                <span class="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${s.status === "Buka" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} text-start text-start">
                    ${s.status === "Buka" ? lang.beasiswa.open : lang.beasiswa.closedLabel}
                </span>
            </div>
            <h3 class="text-2xl font-black mb-4 group-hover:text-[#336799] transition-colors leading-tight text-start text-start">${s.name}</h3>
            <p class="text-slate-500 text-sm leading-relaxed mb-10 flex-grow text-start text-start">${s.desc}</p>
            <button ${s.status === "Tutup" ? "disabled" : ""} class="w-full py-4 rounded-[20px] font-black text-sm transition-all text-center ${
        s.status === "Buka" ? "bg-[#336799] text-white hover:bg-[#26507a] shadow-xl shadow-blue-100" : "bg-slate-100 text-slate-400 cursor-not-allowed"
      }">
                ${s.status === "Buka" ? lang.beasiswa.apply : lang.beasiswa.closed}
            </button>
        </div>
    `
    )
    .join("");
}

function renderDocs() {
  const body = document.getElementById("docTableBody");
  if (!body) return;
  body.innerHTML = docData
    .map(
      (d) => `
        <tr class="hover:bg-blue-50/50 transition-colors group text-start text-start">
            <td class="px-10 py-8 text-start text-start">
                <div class="flex items-center gap-4 text-start">
                    <div class="p-3 bg-slate-50 rounded-2xl text-[#336799] group-hover:bg-white transition-colors text-start text-start"><i data-lucide="file-text" class="w-5 h-5 text-start text-start"></i></div>
                    <span class="font-bold text-slate-800 text-start text-start">${d.name}</span>
                </div>
            </td>
            <td class="px-10 py-8 text-start text-start"><span class="px-4 py-1.5 bg-blue-50 text-[#336799] rounded-full text-[10px] font-black uppercase tracking-widest text-start text-start text-start">${d.cat}</span></td>
            <td class="px-10 py-8 text-start text-slate-400 font-medium text-sm text-start text-start text-start">${d.size}</td>
            <td class="px-10 py-8 text-end text-start">
                <button class="p-4 bg-blue-50 text-[#336799] rounded-2xl hover:bg-[#336799] hover:text-white transition-all shadow-sm text-start text-start text-start text-start"><i data-lucide="download" class="w-5 h-5 text-start text-start text-start text-start"></i></button>
            </td>
        </tr>
    `
    )
    .join("");
  lucide.createIcons();
}

function navigateTo(pageId) {
  document.querySelectorAll(".page-section").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(pageId + "Page");
  if (target) target.classList.add("active");
  window.scrollTo(0, 0);
}

function changeLanguage(lang) {
  currentLang = lang;
  const label = document.getElementById("currentLangLabel");
  const flag = document.getElementById("currentLangFlagImg");
  if (label) label.innerText = lang.toUpperCase();
  if (flag) {
    const flags = { id: "IMG/indo.png", en: "IMG/INGGRIS.png", ar: "IMG/arab.png" };
    flag.src = flags[lang];
  }
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  const deco = document.getElementById("heroDeco");
  const stats = document.getElementById("statsCard");
  if (deco) {
    if (lang === "ar") {
      deco.style.left = "0";
      deco.style.right = "auto";
      deco.style.borderRadius = "0 80px 80px 0";
      deco.style.transform = "translateX(-3rem)";
      if (stats) {
        stats.style.left = "auto";
        stats.style.right = "-2rem";
      }
    } else {
      deco.style.right = "0";
      deco.style.left = "auto";
      deco.style.borderRadius = "80px 0 0 80px";
      deco.style.transform = "translateX(3rem)";
      if (stats) {
        stats.style.right = "auto";
        stats.style.left = "-2rem";
      }
    }
  }
  updateUIStrings();
  renderScholarships();
  renderDocs();
}

function updateUIStrings() {
  const l = translations[currentLang];
  if (!l) return;

  const safeSetText = (selector, text, isId = false) => {
    const el = isId ? document.getElementById(selector) : document.querySelector(selector);
    if (el) {
      if (el.childNodes.length > 0 && el.querySelector("i")) {
        el.childNodes[0].textContent = text + " ";
      } else {
        el.innerText = text;
      }
    }
  };

  safeSetText(".nav-item-home", l.nav.home);
  safeSetText(".nav-item-profile", l.nav.profile);
  safeSetText(".dropdown-prakata", l.nav.prakata);
  safeSetText(".dropdown-org-profile", l.nav.organisasi);
  safeSetText(".dropdown-progker", l.nav.progker);
  safeSetText(".dropdown-kinerja", l.nav.kinerja);
  safeSetText(".dropdown-ppid", l.nav.ppid);
  safeSetText(".dropdown-scholarship", l.nav.scholarship);
  safeSetText(".dropdown-org", l.nav.org);
  safeSetText(".nav-item-doc", l.nav.doc);
  safeSetText(".nav-item-service", l.nav.service);
  safeSetText("heroTitle", l.hero.title, true);
  safeSetText("heroSub", l.hero.sub, true);
  safeSetText("heroBtn1", l.hero.btn1, true);
  safeSetText("heroBtn2", l.hero.btn2, true);
  safeSetText("statsLabel", l.hero.stats, true);
  safeSetText("sectionServicesTitle", l.services.title, true);
  safeSetText("sectionNewsTitle", l.news.title, true);
  safeSetText("sectionNewsSub", l.news.sub, true);
  safeSetText("btnAllNews", l.news.btn, true);
  safeSetText("pageOrgTitle", l.orgPage.title, true);
  safeSetText("pageOrgSub", l.orgPage.sub, true);
  safeSetText("pageSkpiTitle", l.skpiPage.title, true);
  safeSetText("pagePrestasiTitle", l.prestasiPage.title, true);
  safeSetText("pagePrestasiSub", l.prestasiPage.sub, true);
  safeSetText("pageScholarshipTitle", l.beasiswa.title, true);
  safeSetText("pageScholarshipSub", l.beasiswa.sub, true);
  safeSetText("pageDocTitle", l.dokumen.title, true);
  safeSetText("pageDocSub", l.dokumen.sub, true);
  safeSetText(".footer-desc", l.footer.desc);
  safeSetText(".footer-links-title", l.footer.links);
  safeSetText(".footer-services-title", l.footer.services);
  safeSetText(".footer-contact-title", l.footer.contact);
}

function toggleSearch() {
  const overlay = document.getElementById("searchOverlay");
  if (!overlay) return;
  overlay.classList.toggle("hidden");
  overlay.classList.toggle("flex");
  if (!overlay.classList.contains("hidden")) {
    const input = document.getElementById("searchInput");
    if (input) input.focus();
  }
}

// Jalankan fungsi inisialisasi saat window dimuat
window.onload = init;
