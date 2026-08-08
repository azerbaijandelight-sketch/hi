'use strict';

// ===== STATE =====
const state = {
  currentPage: 'home',
  previousPage: 'home',
  scrollPositions: {},
  cart: [],
  cartOpen: false,
  currentProduct: null,
  currentVacancy: null
};

// ===== WHATSAPP NUMBER =====
const WA_NUMBER = '994559406018';

// ===== PRODUCT DATA =====
const products = {
  'espresso': {
    name: 'Espresso',
    price: 3,
    image: 'images/menu-classic-coffee.jpg',
    desc: 'İtalyan üslubunda hazırlanmış güclü və konsentriləşdirilmiş qəhvə. Ən yüksək keyfiyyətli Arabica dənlərindən hazırlanır. Yoğun aroması və qalın crema təbəqəsi ilə seçilir.',
    category: 'Klassik Qəhvə'
  },
  'americano': {
    name: 'Americano',
    price: 4,
    image: 'images/menu-classic-coffee.jpg',
    desc: 'Espressoya isti su əlavə edilərək hazırlanan yüngül qəhvə. Güclü aromasını qoruyur, lakin daha incə dad profili verir. Hər gün üçün mükəmməl seçim.',
    category: 'Klassik Qəhvə'
  },
  'cappuccino': {
    name: 'Cappuccino',
    price: 5,
    image: 'images/menu-classic-coffee.jpg',
    desc: 'Espresso, buxarlanmış süd və qalın köpüklü süd qatından ibarət klassik italyan içkisi. Üzərinə kakao tozu səpilir. Hər yudumda mükəmməl balans.',
    category: 'Klassik Qəhvə'
  },
  'caffe-latte': {
    name: 'Caffe Latte',
    price: 5,
    image: 'images/menu-classic-coffee.jpg',
    desc: 'Espresso və bol miqdarda buxarlanmış süddən hazırlanan yumşaq qəhvə içkisi. İncə köpük təbəqəsi üzərində latte art ilə tamamlanır.',
    category: 'Klassik Qəhvə'
  },
  'raspberry-coconut': {
    name: 'Raspberry & Coconut Latte',
    price: 7.5,
    image: 'images/menu-signature-coffee.jpg',
    desc: 'Əsgər moruğu şərbəti, kokos südü və espressonun birləşməsindən yaranan unikal imzalı içkimiz. Şirin-ekşi aroma, yumşaq kokos dadı. Vizual olaraq da inanılmaz gözəldir.',
    category: 'İmzalı Qəhvə'
  },
  'banana-caramel': {
    name: 'Banana & Salted Caramel Latte',
    price: 7.5,
    image: 'images/menu-signature-coffee.jpg',
    desc: 'Banan püreyi, duzlu karamel sousu və kremli espressonun əvəzsiz uyumu. Hi Coffee-nin ən məşhur içkilərindən biri. Tatlı-duzlu balans bizi fərqli edir.',
    category: 'İmzalı Qəhvə'
  },
  'raf-classic': {
    name: 'Raf Classic',
    price: 7,
    image: 'images/menu-signature-coffee.jpg',
    desc: 'Espresso, krem, vanil şəkəri və buxarlanmış süddən ibarət yumşaq rus qəhvəsi. İsti olaraq xidmət edilir. Kremli dokusu ilə qəlbinizi ısıdacaq.',
    category: 'İmzalı Qəhvə'
  },
  'raf-macadamia': {
    name: 'Raf (Macadamia)',
    price: 7,
    image: 'images/menu-signature-coffee.jpg',
    desc: 'Klassik Raf reseptinə macadamia fındığı şərbəti əlavə edilərək hazırlanan premium versiya. Eksotik qoz-fındıq aroması ilə seçilir.',
    category: 'İmzalı Qəhvə'
  },
  'iced-americano': {
    name: 'Iced Americano',
    price: 6,
    image: 'images/menu-iced-coffee.jpg',
    desc: 'Soyuq su və buz üzərinə espresso tökülərək hazırlanan serinləşdirici içki. Güclü qəhvə aroması, yüngül dad. Yay günlərinin əvəzolunmaz dostu.',
    category: 'Soyuq Qəhvə'
  },
  'iced-latte': {
    name: 'Iced Latte',
    price: 7,
    image: 'images/menu-iced-coffee.jpg',
    desc: 'Soyuq süd, buz və espressodan hazırlanan yumşaq soyuq içki. Süd köpüyü ilə tamamlanan vizual əsl bir şedevr. Serinliyin ən dadlı forması.',
    category: 'Soyuq Qəhvə'
  },
  'iced-raf': {
    name: 'Iced Raf',
    price: 7,
    image: 'images/menu-iced-coffee.jpg',
    desc: 'Klassik Raf içkisinin soyuq versiyası. Krem, vanil, espresso və buzdan hazırlanır. İsti hava üçün mükəmməl seçimdir.',
    category: 'Soyuq Qəhvə'
  },
  'iced-mocha': {
    name: 'Iced Mocha',
    price: 7,
    image: 'images/menu-iced-coffee.jpg',
    desc: 'Şokolad sousu, espresso, soyuq süd və buzdan hazırlanan dadlı soyuq içki. Şokolad sevilənlər üçün ən yaxşı seçim. Stəkanın içindəki şokolad naxışı özünəməxsus estetika yaradır.',
    category: 'Soyuq Qəhvə'
  },
  'matcha-latte': {
    name: 'Matcha Latte',
    price: 7,
    image: 'images/menu-signature-matcha.jpg',
    desc: 'Premium serenoniya keyfiyyətli Yapon matcha tozu ilə hazırlanmış kremli latte. Antioksidanlarca zəngin, yumşaq enerji verir. Üzərindəki latte art hər içkini unikal edir.',
    category: 'Signature Matcha'
  },
  'strawberry-matcha': {
    name: 'Strawberry Matcha Latte',
    price: 7,
    image: 'images/menu-signature-matcha.jpg',
    desc: 'Çiyələk şərbəti, matcha latte-nin yaşıl rəngi ilə vizual cəlbedici qat-qat içki. Şirinlik və bitki dadının harmoniyası. İnstaqram layiq gözəllik.',
    category: 'Signature Matcha'
  },
  'mango-matcha': {
    name: 'Mango Matcha Latte',
    price: 7,
    image: 'images/menu-signature-matcha.jpg',
    desc: 'Tropik mango şərbəti və matcha-nın bir araya gəldiyi serinləşdirici içki. Narıncı-yaşıl rəng kontrastı həm göz, həm damaq üçün ziyafətdir.',
    category: 'Signature Matcha'
  },
  'matcha-affogato': {
    name: 'Matcha Affogato',
    price: 8,
    image: 'images/pistachio-affogato.jpg',
    desc: 'Vanil dondurması üzərinə isti matcha töküldükdə yaranan sehrli dessert-içki. İsti matcha dondurmanı əridir — hər qaşıq yeni bir sevinc. Hi Coffee-nin ən unikal məhsullarından biri.',
    category: 'Signature Matcha'
  }
};

// ===== VACANCY DATA =====
const vacancies = {
  'barista': {
    icon: '☕',
    title: 'Barista',
    type: 'Tam ştat • Bakı',
    details: `<p><strong>Vəzifə öhdəlikləri:</strong></p>
<ul>
  <li>Müxtəlif qəhvə içkilərinin standartlara uyğun hazırlanması</li>
  <li>Qəhvə avadanlığının düzgün istifadəsi və texniki xidməti</li>
  <li>Müştərilərlə mehriban ünsiyyət qurulması</li>
  <li>İş sahəsinin təmizliyi və sanitariya qaydalarına riayət</li>
  <li>Yeni içkilər üçün yaradıcı ideyaların irəli sürülməsi</li>
</ul>
<p style="margin-top:12px"><strong>Tələblər:</strong></p>
<ul>
  <li>Barista təcrübəsi (üstünlük verilir, lakin məcburi deyil)</li>
  <li>Qəhvəyə ehtiras, müştəri xidmətinə meyil</li>
  <li>Azərbaycan dilini bilmək</li>
</ul>`
  },
  'cashier': {
    icon: '💳',
    title: 'Kassir / Xidmət İşçisi',
    type: 'Tam ştat • Bakı',
    details: `<p><strong>Vəzifə öhdəlikləri:</strong></p>
<ul>
  <li>Müştəri sifarişlərinin qəbulu və ödənişlərin işlənməsi</li>
  <li>Kassir avadanlığının istifadəsi</li>
  <li>Müştəri məmnuniyyətinin ön planda saxlanması</li>
  <li>Məhsullar haqqında məlumat vermək</li>
</ul>
<p style="margin-top:12px"><strong>Tələblər:</strong></p>
<ul>
  <li>Xidmət sahəsində təcrübə (üstünlük verilir)</li>
  <li>Ünsiyyətcil, güləndüz xarakter</li>
  <li>Hesablama bacarığı</li>
</ul>`
  },
  'manager': {
    icon: '📊',
    title: 'Shift Manager',
    type: 'Tam ştat • Bakı',
    details: `<p><strong>Vəzifə öhdəlikləri:</strong></p>
<ul>
  <li>Növbə ərzində kafenin əməliyyatlarının idarəsi</li>
  <li>Komanda üzvlərinin rəhbərliyi və motivasiyası</li>
  <li>Keyfiyyət nəzarəti və standartların qorunması</li>
  <li>Inventar izlənməsi və sifarişlər</li>
  <li>Müştəri şikayətlərinin peşəkar həlli</li>
</ul>
<p style="margin-top:12px"><strong>Tələblər:</strong></p>
<ul>
  <li>F&B sektorunda ən az 1 il rəhbərlik təcrübəsi</li>
  <li>Güclü liderlik və problemhəlletmə bacarığı</li>
  <li>Azərbaycan dilini mükəmməl bilmək</li>
</ul>`
  },
  'cleaner': {
    icon: '✨',
    title: 'Təmizlik İşçisi',
    type: 'Yarım ştat • Bakı',
    details: `<p><strong>Vəzifə öhdəlikləri:</strong></p>
<ul>
  <li>Kafenin ümumi sahəsinin, mətbəxin və sanitariya qovşaqlarının təmizliyi</li>
  <li>Sanitariya normalarına riayət</li>
  <li>Zəruri hallarda anbara yardım</li>
</ul>
<p style="margin-top:12px"><strong>Tələblər:</strong></p>
<ul>
  <li>Məsuliyyətli, dürüst şəxsiyyət</li>
  <li>Fiziki işə qabiliyyət</li>
  <li>Vaxtında işə gəlmək</li>
</ul>`
  }
};

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  // Save scroll position of current page
  const currentEl = document.getElementById('page-' + state.currentPage);
  if (currentEl) {
    state.scrollPositions[state.currentPage] = window.scrollY;
  }

  // Close mobile menu if open
  closeMobileMenu();

  // Close cart if open
  if (state.cartOpen) toggleCart();

  // Set previous page
  state.previousPage = state.currentPage;
  state.currentPage = pageId;

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target page
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Restore scroll
  const savedScroll = state.scrollPositions[pageId];
  if (savedScroll !== undefined) {
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedScroll, behavior: 'instant' });
    });
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

function goBack() {
  // Save current page scroll
  state.scrollPositions[state.currentPage] = window.scrollY;

  const prevPage = state.previousPage || 'home';
  state.currentPage = prevPage;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const targetPage = document.getElementById('page-' + prevPage);
  if (targetPage) targetPage.classList.add('active');

  // Restore scroll position
  const savedScroll = state.scrollPositions[prevPage];
  requestAnimationFrame(() => {
    window.scrollTo({
      top: savedScroll !== undefined ? savedScroll : 0,
      behavior: 'instant'
    });
  });
}

// ===== MOBILE MENU =====
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  links.classList.toggle('open');
  hamburger.classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ===== MENU CATEGORIES =====
function switchCategory(cat) {
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu-category').forEach(c => c.classList.remove('active'));

  const tab = document.querySelector(`[onclick="switchCategory('${cat}')"]`);
  if (tab) tab.classList.add('active');

  const catEl = document.getElementById('cat-' + cat);
  if (catEl) catEl.classList.add('active');
}

// ===== PRODUCT MODAL =====
function openProduct(id) {
  const product = products[id];
  if (!product) return;

  state.currentProduct = id;

  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalImg').alt = product.name;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalPrice').textContent = product.price + ' ₼';

  const modal = document.getElementById('productModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === e.currentTarget) {
    closeProductModal();
  }
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
  document.body.style.overflow = '';
  state.currentProduct = null;
}

function addFromModal() {
  if (!state.currentProduct) return;
  const product = products[state.currentProduct];
  addToCart(state.currentProduct, product.name, product.price);
  closeProductModal();
}

// ===== VACANCY MODAL =====
function openVacancy(id) {
  const v = vacancies[id];
  if (!v) return;

  state.currentVacancy = id;
  document.getElementById('vModalIcon').textContent = v.icon;
  document.getElementById('vModalTitle').textContent = v.title;
  document.getElementById('vModalType').textContent = v.type;
  document.getElementById('vModalDetails').innerHTML = v.details;

  const modal = document.getElementById('vacancyModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVacancyModalOverlay(e) {
  if (e.target === e.currentTarget) closeVacancyModal();
}

function closeVacancyModal() {
  document.getElementById('vacancyModal').classList.remove('active');
  document.body.style.overflow = '';
  state.currentVacancy = null;
}

function applyVacancy() {
  if (!state.currentVacancy) return;
  const v = vacancies[state.currentVacancy];
  const msg = `Salam! ${v.title} vakansiyasına müraciət etmək istəyirəm.\n\nVakansiya: ${v.title}\nGündəlik: ${v.type}\n\nMəlumatlarımı göndərirəm.`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');
  closeVacancyModal();
}

// ===== LIGHTBOX =====
function openLightbox(src, caption) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption;
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

// ===== CART =====
function toggleCart() {
  state.cartOpen = !state.cartOpen;
  document.getElementById('cartSidebar').classList.toggle('active', state.cartOpen);
  document.getElementById('cartOverlay').classList.toggle('active', state.cartOpen);
  document.body.style.overflow = state.cartOpen ? 'hidden' : '';
}

function addToCart(id, name, price) {
  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id, name, price, qty: 1 });
  }
  renderCart();
  animateCartBadge();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  renderCart();
}

function updateQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  renderCart();
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const badgeEl = document.getElementById('cartBadge');

  const totalQty = state.cart.reduce((s, i) => s + i.qty, 0);
  badgeEl.textContent = totalQty;

  if (state.cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Səbət boşdur</p>';
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'block';
  itemsEl.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
      </div>
      <span class="cart-item-price">${(item.price * item.qty).toFixed(1)} ₼</span>
      <button class="remove-btn" onclick="removeFromCart('${item.id}')">✕</button>
    </div>
  `).join('');

  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = total.toFixed(1) + ' ₼';
}

function animateCartBadge() {
  const badge = document.getElementById('cartBadge');
  badge.style.transform = 'scale(1.4)';
  setTimeout(() => { badge.style.transform = 'scale(1)'; }, 250);
}

function sendOrder() {
  if (state.cart.length === 0) return;

  const lines = state.cart.map(i =>
    `• ${i.name} x${i.qty} — ${(i.price * i.qty).toFixed(1)} ₼`
  );
  const total = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const msg = `🛒 *Hi Coffee — Yeni Sifariş*\n\n${lines.join('\n')}\n\n*Cəmi: ${total.toFixed(1)} ₼*\n\nSalam, bu sifarişi vermək istəyirəm!`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');

  // Clear cart
  state.cart = [];
  renderCart();
  toggleCart();
}

// ===== RESERVATION =====
function submitReservation(e) {
  e.preventDefault();
  const name = document.getElementById('resName').value.trim();
  const phone = document.getElementById('resPhone').value.trim();
  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;
  const guests = document.getElementById('resGuests').value;
  const note = document.getElementById('resNote').value.trim();

  if (!name || !phone || !date || !time || !guests) return;

  const formattedDate = new Date(date).toLocaleDateString('az-AZ', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  let msg = `📅 *Hi Coffee — Masa Rezervasiyası*\n\n👤 Ad: ${name}\n📞 Telefon: ${phone}\n📆 Tarix: ${formattedDate}\n⏰ Saat: ${time}\n👥 Nəfər sayı: ${guests}`;
  if (note) msg += `\n📝 Qeyd: ${note}`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');

  // Reset form
  document.getElementById('reservationForm').reset();
}

// ===== FAQ =====
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

  // Open clicked if it wasn't open
  if (!isOpen) item.classList.add('open');
}

// ===== KEYBOARD HANDLERS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProductModal();
    closeVacancyModal();
    closeLightbox();
    if (state.cartOpen) toggleCart();
  }
});

// ===== SET MIN DATE FOR RESERVATION =====
(function setMinDate() {
  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }
})();

// ===== INIT =====
renderCart();
showPage('home');
