/**
 * ===== TECHSTORE - SISTEMA DE E-COMMERCE =====
 * Archivo JavaScript principal con toda la funcionalidad del sitio
 * Incluye: Autenticación, Productos, Carrito, Validaciones y más
 */

// ===== VARIABLES GLOBALES =====
let currentUser = null; // Usuario actual logueado
let products = []; // Array de productos
let cart = []; // Array del carrito
let filteredProducts = []; // Productos filtrados para búsqueda

// ===== PRODUCTOS ARTIFICIALES (20 productos) =====
const artificialProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "smartphones",
    brand: "Apple",
    model: "15 Pro Max",
    price: 1299990,
    condition: "nuevo",
    description: "El último iPhone con chip A17 Pro, cámara de 48MP y pantalla de titanio. Incluye todos los accesorios originales.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    seller: "TechStore Oficial"
  },
  {
    id: 2,
    name: "MacBook Pro 16\" M3",
    category: "laptops",
    brand: "Apple",
    model: "MacBook Pro 16",
    price: 2499990,
    condition: "nuevo",
    description: "Laptop profesional con chip M3, 16GB RAM, 512GB SSD. Perfect para desarrollo y diseño gráfico.",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    seller: "Apple Store"
  },
  {
    id: 3,
    name: "Gaming PC RTX 4080",
    category: "gaming",
    brand: "ASUS",
    model: "ROG Strix",
    price: 1899990,
    condition: "nuevo",
    description: "PC Gaming de alta gama con RTX 4080, Intel i7-13700K, 32GB RAM DDR5, 1TB NVMe SSD.",
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=400&fit=crop",
    seller: "Gaming Pro"
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    category: "smartphones",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 1199990,
    condition: "nuevo",
    description: "Smartphone premium con S Pen, cámara de 200MP, pantalla AMOLED 6.8\" y batería de 5000mAh.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    seller: "Samsung Store"
  },
  {
    id: 5,
    name: "PlayStation 5 Pro",
    category: "gaming",
    brand: "Sony",
    model: "PS5 Pro",
    price: 899990,
    condition: "nuevo",
    description: "Consola de nueva generación con 8K gaming, ray tracing avanzado y SSD ultra rápido de 1TB.",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
    seller: "Sony Store"
  },
  {
    id: 6,
    name: "Dell XPS 13",
    category: "laptops",
    brand: "Dell",
    model: "XPS 13",
    price: 1299990,
    condition: "como-nuevo",
    description: "Ultrabook premium con Intel i7-13700H, 16GB RAM, 512GB SSD, pantalla InfinityEdge 4K.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=400&fit=crop",
    seller: "Dell Official"
  },
  {
    id: 7,
    name: "Mechanical Gaming Keyboard RGB",
    category: "accesorios",
    brand: "Razer",
    model: "BlackWidow V4",
    price: 199990,
    condition: "nuevo",
    description: "Teclado mecánico gaming con switches Cherry MX, iluminación RGB Chroma y reposamanos magnético.",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
    seller: "Razer Store"
  },
  {
    id: 8,
    name: "Monitor Gaming 27\" 144Hz",
    category: "accesorios",
    brand: "ASUS",
    model: "ROG Swift",
    price: 599990,
    condition: "nuevo",
    description: "Monitor gaming 27\" QHD, 144Hz, G-SYNC Compatible, 1ms de respuesta, panel IPS.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    seller: "ASUS Gaming"
  },
  {
    id: 9,
    name: "RTX 4070 Ti Graphics Card",
    category: "componentes",
    brand: "NVIDIA",
    model: "GeForce RTX 4070 Ti",
    price: 899990,
    condition: "nuevo",
    description: "Tarjeta gráfica de última generación con 12GB GDDR6X, Ray Tracing de 3ra gen y DLSS 3.",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop",
    seller: "NVIDIA Store"
  },
  {
    id: 10,
    name: "Smart TV 55\" 4K OLED",
    category: "hogar",
    brand: "LG",
    model: "OLED55C3",
    price: 1499990,
    condition: "nuevo",
    description: "Smart TV OLED 55\", 4K Ultra HD, HDR10 Pro, WebOS, ideal para gaming y streaming.",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    seller: "LG Electronics"
  },
  {
    id: 11,
    name: "iPad Air M2",
    category: "accesorios",
    brand: "Apple",
    model: "iPad Air",
    price: 799990,
    condition: "nuevo",
    description: "Tablet profesional con chip M2, pantalla Liquid Retina 10.9\", compatible con Apple Pencil.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    seller: "Apple Store"
  },
  {
    id: 12,
    name: "Gaming Chair RGB",
    category: "accesorios",
    brand: "Secretlab",
    model: "TITAN Evo",
    price: 549990,
    condition: "nuevo",
    description: "Silla gaming premium con soporte lumbar magnético, reposabrazos 4D y iluminación RGB.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop",
    seller: "Secretlab"
  },
  {
    id: 13,
    name: "AirPods Pro 2nd Gen",
    category: "accesorios",
    brand: "Apple",
    model: "AirPods Pro",
    price: 299990,
    condition: "nuevo",
    description: "Auriculares inalámbricos con cancelación activa de ruido, audio espacial y estuche MagSafe.",
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
    seller: "Apple Store"
  },
  {
    id: 14,
    name: "MSI Gaming Laptop",
    category: "laptops",
    brand: "MSI",
    model: "Katana 15",
    price: 999990,
    condition: "nuevo",
    description: "Laptop gaming con RTX 4060, Intel i7-13620H, 16GB DDR5, 1TB SSD, pantalla 15.6\" 144Hz.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
    seller: "MSI Gaming"
  },
  {
    id: 15,
    name: "Samsung 32\" Curved Monitor",
    category: "accesorios",
    brand: "Samsung",
    model: "Odyssey G5",
    price: 399990,
    condition: "muy-bueno",
    description: "Monitor curvo gaming 32\" QHD, 144Hz, HDR10, FreeSync Premium, diseño sin bordes.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    seller: "Samsung Gaming"
  },
  {
    id: 16,
    name: "Nintendo Switch OLED",
    category: "gaming",
    brand: "Nintendo",
    model: "Switch OLED",
    price: 449990,
    condition: "nuevo",
    description: "Consola híbrida con pantalla OLED 7\", audio mejorado, 64GB almacenamiento interno.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    seller: "Nintendo Store"
  },
  {
    id: 17,
    name: "Robot Aspirador Xiaomi",
    category: "hogar",
    brand: "Xiaomi",
    model: "Mi Robot Vacuum S10+",
    price: 399990,
    condition: "nuevo",
    description: "Robot aspiradora inteligente con mapeo láser, estación de autovaciado y control por app.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    seller: "Xiaomi Store"
  },
  {
    id: 18,
    name: "SSD NVMe 2TB",
    category: "componentes",
    brand: "Samsung",
    model: "980 PRO",
    price: 299990,
    condition: "nuevo",
    description: "SSD NVMe PCIe 4.0, 2TB capacidad, velocidades de hasta 7,000 MB/s, ideal para gaming.",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
    seller: "Samsung Storage"
  },
  {
    id: 19,
    name: "Cafetera Smart WiFi",
    category: "hogar",
    brand: "Breville",
    model: "Barista Express",
    price: 699990,
    condition: "como-nuevo",
    description: "Cafetera espresso automática con molinillo integrado, control WiFi y aplicación móvil.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    seller: "Breville Home"
  },
  {
    id: 20,
    name: "Lavadora Inteligente 18kg",
    category: "hogar",
    brand: "Samsung",
    model: "WW18M8700QV",
    price: 899990,
    condition: "nuevo",
    description: "Lavadora inteligente 18kg, tecnología EcoBubble, WiFi, tambor Diamond Drum, eficiencia A+++.",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop",
    seller: "Samsung Home"
  }
];

// ===== INICIALIZACIÓN AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Iniciando TechStore...');
  
  // Inicializar datos desde localStorage o usar productos artificiales
  initializeData();
  
  // Configurar event listeners
  setupEventListeners();
  
  // Verificar sesión de usuario
  checkUserSession();
  
  // Renderizar productos iniciales
  renderProducts();
  
  // Actualizar contador del carrito
  updateCartCounter();
  
  console.log('✅ TechStore inicializado correctamente');
});

// ===== INICIALIZACIÓN DE DATOS =====
function initializeData() {
  console.log('📦 Inicializando datos...');
  
  // Cargar productos desde localStorage o usar productos artificiales
  const savedProducts = localStorage.getItem('techstore_products');
  if (savedProducts) {
    products = JSON.parse(savedProducts);
    console.log(`📦 Cargados ${products.length} productos desde localStorage`);
  } else {
    products = [...artificialProducts];
    localStorage.setItem('techstore_products', JSON.stringify(products));
    console.log(`📦 Cargados ${products.length} productos artificiales`);
  }
  
  // Cargar carrito desde localStorage
  const savedCart = localStorage.getItem('techstore_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    console.log(`🛒 Cargados ${cart.length} items del carrito`);
  }
  
  // Inicializar filteredProducts con todos los productos
  filteredProducts = [...products];
}

// ===== CONFIGURACIÓN DE EVENT LISTENERS =====
function setupEventListeners() {
  console.log('🔗 Configurando event listeners...');
  
  // === NAVEGACIÓN ===
  
  // Botón de vender (abrir modal)
  const openUploadBtn = document.getElementById('openUploadBtn');
  const sellHeroBtn = document.getElementById('sellHeroBtn');
  
  if (openUploadBtn) {
    openUploadBtn.addEventListener('click', () => openSellModal());
  }
  if (sellHeroBtn) {
    sellHeroBtn.addEventListener('click', () => openSellModal());
  }
  
  // Botones de autenticación
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', () => openAuthModal('login'));
  }
  if (registerBtn) {
    registerBtn.addEventListener('click', () => openAuthModal('register'));
  }
  
  // Botón de perfil y logout
  const profileBtn = document.getElementById('profileBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (profileBtn) {
    profileBtn.addEventListener('click', () => openProfileModal());
  }
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => logout());
  }
  
  // Botón del carrito
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => openCartModal());
  }
  
  // === FORMULARIOS ===
  
  // Formulario de producto
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', handleProductSubmit);
  }
  
  // Formularios de autenticación
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
  
  // Formulario de perfil
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileUpdate);
  }
  
  // === BÚSQUEDA Y FILTROS ===
  
  // Formulario de búsqueda
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }
  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
  }
  
  // Botones de categoría
  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', handleCategoryFilter);
  });
  
  // === IMAGEN DE PRODUCTO ===
  
  // Preview de imagen en formulario de producto
  const productImage = document.getElementById('productImage');
  if (productImage) {
    productImage.addEventListener('change', handleImagePreview);
  }
  
  // Botón para remover imagen
  const removeImageBtn = document.getElementById('removeImageBtn');
  if (removeImageBtn) {
    removeImageBtn.addEventListener('click', removeImagePreview);
  }
  
  // === CONTADOR DE CARACTERES ===
  
  // Contador de caracteres en descripción
  const productDescription = document.getElementById('productDescription');
  if (productDescription) {
    productDescription.addEventListener('input', updateCharCounter);
  }
  
  // === TOGGLE DE CONTRASEÑA ===
  
  // Toggle para mostrar/ocultar contraseña
  const toggleLoginPassword = document.getElementById('toggleLoginPassword');
  const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
  
  if (toggleLoginPassword) {
    toggleLoginPassword.addEventListener('click', () => togglePasswordVisibility('loginPassword', 'toggleLoginPassword'));
  }
  if (toggleRegisterPassword) {
    toggleRegisterPassword.addEventListener('click', () => togglePasswordVisibility('registerPassword', 'toggleRegisterPassword'));
  }
  
  // === CARRITO ===
  
  // Botones del carrito
  const clearCartBtn = document.getElementById('clearCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  }
}

// ===== FUNCIONES DE AUTENTICACIÓN =====

/**
 * Abre el modal de autenticación
 * @param {string} tab - 'login' o 'register'
 */
function openAuthModal(tab = 'login') {
  const authModal = new bootstrap.Modal(document.getElementById('authModal'));
  
  // Activar el tab correcto
  if (tab === 'register') {
    document.getElementById('register-tab').click();
  } else {
    document.getElementById('login-tab').click();
  }
  
  authModal.show();
}

/**
 * Maneja el login del usuario
 * @param {Event} e - Evento del formulario
 */
function handleLogin(e) {
  e.preventDefault();
  console.log('🔐 Intentando login...');
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  
  // Validar campos
  if (!validateEmail(email)) {
    showFieldError('loginEmail', 'Por favor ingresa un email válido');
    return;
  }
  
  if (password.length < 6) {
    showFieldError('loginPassword', 'La contraseña debe tener al menos 6 caracteres');
    return;
  }
  
  // Simular autenticación (en producción sería una llamada al servidor)
  const users = JSON.parse(localStorage.getItem('techstore_users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Login exitoso
    currentUser = user;
    localStorage.setItem('techstore_current_user', JSON.stringify(user));
    
    updateUIForLoggedUser();
    bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
    
    showToast('¡Bienvenido de vuelta!', 'success');
    console.log('✅ Login exitoso:', user.name);
  } else {
    showToast('Email o contraseña incorrectos', 'error');
    console.log('❌ Login fallido');
  }
}

/**
 * Maneja el registro del usuario
 * @param {Event} e - Evento del formulario
 */
function handleRegister(e) {
  e.preventDefault();
  console.log('📝 Intentando registro...');
  
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  // Validaciones
  if (name.length < 2) {
    showFieldError('registerName', 'El nombre debe tener al menos 2 caracteres');
    return;
  }
  
  if (!validateEmail(email)) {
    showFieldError('registerEmail', 'Por favor ingresa un email válido');
    return;
  }
  
  if (password.length < 6) {
    showFieldError('registerPassword', 'La contraseña debe tener al menos 6 caracteres');
    return;
  }
  
  if (password !== confirmPassword) {
    showFieldError('confirmPassword', 'Las contraseñas no coinciden');
    return;
  }
  
  // Verificar si el usuario ya existe
  const users = JSON.parse(localStorage.getItem('techstore_users') || '[]');
  if (users.some(u => u.email === email)) {
    showFieldError('registerEmail', 'Este email ya está registrado');
    return;
  }
  
  // Crear nuevo usuario
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
    profile: {
      phone: '',
      city: '',
      address: '',
      paymentMethod: '',
      bankAccount: '',
      bio: ''
    }
  };
  
  users.push(newUser);
  localStorage.setItem('techstore_users', JSON.stringify(users));
  
  // Login automático después del registro
  currentUser = newUser;
  localStorage.setItem('techstore_current_user', JSON.stringify(newUser));
  
  updateUIForLoggedUser();
  bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
  
  showToast('¡Cuenta creada exitosamente!', 'success');
  console.log('✅ Registro exitoso:', newUser.name);
}

/**
 * Cierra sesión del usuario
 */
function logout() {
  console.log('👋 Cerrando sesión...');
  
  currentUser = null;
  localStorage.removeItem('techstore_current_user');
  
  updateUIForLoggedOut();
  showToast('Sesión cerrada', 'info');
  
  console.log('✅ Sesión cerrada');
}

/**
 * Verifica si hay una sesión activa
 */
function checkUserSession() {
  const savedUser = localStorage.getItem('techstore_current_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateUIForLoggedUser();
    console.log('👤 Sesión activa:', currentUser.name);
  }
}

/**
 * Actualiza la UI cuando el usuario está logueado
 */
function updateUIForLoggedUser() {
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  const userName = document.getElementById('userName');
  
  if (authButtons) authButtons.style.display = 'none';
  if (userMenu) userMenu.style.display = 'block';
  if (userName) userName.textContent = currentUser.name;
}

/**
 * Actualiza la UI cuando el usuario no está logueado
 */
function updateUIForLoggedOut() {
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  
  if (authButtons) authButtons.style.display = 'flex';
  if (userMenu) userMenu.style.display = 'none';
}

// ===== FUNCIONES DE PERFIL =====

/**
 * Abre el modal de perfil
 */
function openProfileModal() {
  if (!currentUser) {
    showToast('Debes iniciar sesión primero', 'warning');
    openAuthModal('login');
    return;
  }
  
  // Cargar datos del perfil en el formulario
  document.getElementById('profileName').value = currentUser.name || '';
  document.getElementById('profileEmail').value = currentUser.email || '';
  document.getElementById('profilePhone').value = currentUser.profile?.phone || '';
  document.getElementById('profileCity').value = currentUser.profile?.city || '';
  document.getElementById('profileAddress').value = currentUser.profile?.address || '';
  document.getElementById('paymentMethod').value = currentUser.profile?.paymentMethod || '';
  document.getElementById('bankAccount').value = currentUser.profile?.bankAccount || '';
  document.getElementById('profileBio').value = currentUser.profile?.bio || '';
  
  const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
  profileModal.show();
}

/**
 * Maneja la actualización del perfil
 * @param {Event} e - Evento del formulario
 */
function handleProfileUpdate(e) {
  e.preventDefault();
  console.log('💼 Actualizando perfil...');
  
  const name = document.getElementById('profileName').value.trim();
  const phone = document.getElementById('profilePhone').value.trim();
  const city = document.getElementById('profileCity').value.trim();
  const address = document.getElementById('profileAddress').value.trim();
  const paymentMethod = document.getElementById('paymentMethod').value;
  const bankAccount = document.getElementById('bankAccount').value.trim();
  const bio = document.getElementById('profileBio').value.trim();
  
  // Validar nombre
  if (name.length < 2) {
    showFieldError('profileName', 'El nombre debe tener al menos 2 caracteres');
    return;
  }
  
  // Actualizar datos del usuario
  currentUser.name = name;
  currentUser.profile = {
    ...currentUser.profile,
    phone,
    city,
    address,
    paymentMethod,
    bankAccount,
    bio
  };
  
  // Guardar en localStorage
  localStorage.setItem('techstore_current_user', JSON.stringify(currentUser));
  
  // Actualizar en la lista de usuarios
  const users = JSON.parse(localStorage.getItem('techstore_users') || '[]');
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex] = currentUser;
    localStorage.setItem('techstore_users', JSON.stringify(users));
  }
  
  // Actualizar UI
  updateUIForLoggedUser();
  bootstrap.Modal.getInstance(document.getElementById('profileModal')).hide();
  
  showToast('Perfil actualizado correctamente', 'success');
  console.log('✅ Perfil actualizado');
}

// ===== FUNCIONES DE PRODUCTOS =====

/**
 * Abre el modal para vender producto
 */
function openSellModal() {
  if (!currentUser) {
    showToast('Debes iniciar sesión para vender productos', 'warning');
    openAuthModal('login');
    return;
  }
  
  const sellModal = new bootstrap.Modal(document.getElementById('sellModal'));
  sellModal.show();
}

/**
 * Maneja el envío del formulario de producto
 * @param {Event} e - Evento del formulario
 */
function handleProductSubmit(e) {
  e.preventDefault();
  console.log('📦 Creando nuevo producto...');
  
  if (!currentUser) {
    showToast('Debes iniciar sesión para vender productos', 'warning');
    return;
  }
  
  const formData = new FormData(e.target);
  const productData = {
    name: formData.get('productName').trim(),
    category: formData.get('productCategory'),
    brand: formData.get('productBrand').trim(),
    model: formData.get('productModel').trim(),
    price: parseInt(formData.get('productPrice')),
    condition: formData.get('productCondition'),
    description: formData.get('productDescription').trim()
  };
  
  // Validaciones
  if (!validateProductData(productData)) {
    return;
  }
  
  // Crear nuevo producto
  const newProduct = {
    id: Date.now(),
    ...productData,
    image: document.getElementById('previewImg').src || 'https://via.placeholder.com/400x400?text=Sin+Imagen',
    seller: currentUser.name,
    sellerId: currentUser.id,
    createdAt: new Date().toISOString()
  };
  
  // Agregar a la lista de productos
  products.push(newProduct);
  filteredProducts.push(newProduct);
  localStorage.setItem('techstore_products', JSON.stringify(products));
  
  // Cerrar modal y limpiar formulario
  bootstrap.Modal.getInstance(document.getElementById('sellModal')).hide();
  e.target.reset();
  removeImagePreview();
  
  // Renderizar productos
  renderProducts();
  
  showToast('¡Producto publicado exitosamente!', 'success');
  console.log('✅ Producto creado:', newProduct.name);
}

/**
 * Valida los datos del producto
 * @param {Object} data - Datos del producto
 * @returns {boolean} - True si es válido
 */
function validateProductData(data) {
  const errors = [];
  
  if (data.name.length < 3 || data.name.length > 100) {
    showFieldError('productName', 'El nombre debe tener entre 3 y 100 caracteres');
    errors.push('name');
  }
  
  if (!data.category) {
    showFieldError('productCategory', 'Selecciona una categoría');
    errors.push('category');
  }
  
  if (data.brand.length < 2 || data.brand.length > 50) {
    showFieldError('productBrand', 'La marca debe tener entre 2 y 50 caracteres');
    errors.push('brand');
  }
  
  if (data.price < 1000 || data.price > 10000000) {
    showFieldError('productPrice', 'El precio debe estar entre $1.000 y $10.000.000');
    errors.push('price');
  }
  
  if (!data.condition) {
    showFieldError('productCondition', 'Selecciona el estado del producto');
    errors.push('condition');
  }
  
  if (data.description.length < 10 || data.description.length > 500) {
    showFieldError('productDescription', 'La descripción debe tener entre 10 y 500 caracteres');
    errors.push('description');
  }
  
  return errors.length === 0;
}

/**
 * Renderiza todos los productos
 */
function renderProducts() {
  console.log('🎨 Renderizando productos...');
  
  const container = document.getElementById('productsContainer');
  const noProducts = document.getElementById('noProducts');
  
  if (!container) return;
  
  // Limpiar contenedor
  container.innerHTML = '';
  
  if (filteredProducts.length === 0) {
    if (noProducts) noProducts.style.display = 'block';
    return;
  }
  
  if (noProducts) noProducts.style.display = 'none';
  
  // Crear cards para cada producto
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    container.appendChild(productCard);
  });
  
  console.log(`✅ Renderizados ${filteredProducts.length} productos`);
}

/**
 * Crea una card de producto
 * @param {Object} product - Datos del producto
 * @returns {HTMLElement} - Elemento HTML de la card
 */
function createProductCard(product) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4 fade-in-up';
  
  const categoryIcons = {
    smartphones: 'bi-phone',
    laptops: 'bi-laptop',
    gaming: 'bi-controller',
    accesorios: 'bi-headphones',
    componentes: 'bi-cpu',
    hogar: 'bi-house'
  };
  
  const conditionColors = {
    nuevo: 'success',
    'como-nuevo': 'info',
    'muy-bueno': 'primary',
    bueno: 'warning',
    regular: 'secondary'
  };
  
  const conditionTexts = {
    nuevo: 'Nuevo',
    'como-nuevo': 'Como nuevo',
    'muy-bueno': 'Muy bueno',
    bueno: 'Bueno',
    regular: 'Regular'
  };
  
  col.innerHTML = `
    <div class="card product-card h-100">
      <img src="${product.image}" class="card-img-top product-image" alt="${product.name}" loading="lazy">
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <span class="badge bg-primary category-badge">
            <i class="${categoryIcons[product.category] || 'bi-tag'} me-1"></i>
            ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
          <span class="badge bg-${conditionColors[product.condition] || 'secondary'} condition-badge">
            ${conditionTexts[product.condition] || product.condition}
          </span>
        </div>
        
        <h5 class="card-title">${product.name}</h5>
        <p class="text-muted mb-1">
          <i class="bi bi-building me-1"></i>${product.brand} ${product.model || ''}
        </p>
        <p class="price-tag mb-2">${formatPrice(product.price)}</p>
        <p class="card-text text-muted small flex-grow-1">${truncateText(product.description, 100)}</p>
        
        <div class="d-flex justify-content-between align-items-center mt-auto">
          <small class="text-muted">
            <i class="bi bi-person me-1"></i>${product.seller}
          </small>
          <div class="btn-group" role="group">
            <button class="btn btn-outline-primary btn-sm" onclick="viewProduct(${product.id})" title="Ver detalles">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-gaming btn-sm" onclick="addToCart(${product.id})" title="Añadir al carrito">
              <i class="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return col;
}

/**
 * Ve los detalles de un producto
 * @param {number} productId - ID del producto
 */
function viewProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // Crear modal dinámico para mostrar detalles del producto
  const modalHtml = `
    <div class="modal fade" id="productModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${product.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
              </div>
              <div class="col-md-6">
                <h4 class="text-primary">${formatPrice(product.price)}</h4>
                <p><strong>Marca:</strong> ${product.brand}</p>
                <p><strong>Modelo:</strong> ${product.model || 'No especificado'}</p>
                <p><strong>Estado:</strong> <span class="badge bg-success">${product.condition}</span></p>
                <p><strong>Vendedor:</strong> ${product.seller}</p>
                <p><strong>Descripción:</strong></p>
                <p>${product.description}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-gaming" onclick="addToCart(${product.id}); bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();">
              <i class="bi bi-cart-plus me-2"></i>Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Eliminar modal anterior si existe
  const existingModal = document.getElementById('productModal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Añadir nuevo modal al DOM
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  
  // Mostrar modal
  const productModal = new bootstrap.Modal(document.getElementById('productModal'));
  productModal.show();
  
  // Limpiar modal cuando se cierre
  document.getElementById('productModal').addEventListener('hidden.bs.modal', function () {
    this.remove();
  });
}

// ===== FUNCIONES DE CARRITO =====

/**
 * Añade un producto al carrito
 * @param {number} productId - ID del producto
 */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) {
    showToast('Producto no encontrado', 'error');
    return;
  }
  
  // Verificar si el producto ya está en el carrito
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      addedAt: new Date().toISOString()
    });
  }
  
  // Guardar en localStorage
  localStorage.setItem('techstore_cart', JSON.stringify(cart));
  
  // Actualizar contador
  updateCartCounter();
  
  showToast(`${product.name} añadido al carrito`, 'success');
  console.log('🛒 Producto añadido al carrito:', product.name);
}

/**
 * Elimina un producto del carrito
 * @param {number} productId - ID del producto
 */
function removeFromCart(productId) {
  const productIndex = cart.findIndex(item => item.id === productId);
  if (productIndex === -1) return;
  
  const productName = cart[productIndex].name;
  cart.splice(productIndex, 1);
  
  // Guardar en localStorage
  localStorage.setItem('techstore_cart', JSON.stringify(cart));
  
  // Actualizar UI
  updateCartCounter();
  renderCartItems();
  
  showToast(`${productName} eliminado del carrito`, 'info');
  console.log('🗑️ Producto eliminado del carrito:', productName);
}

/**
 * Actualiza la cantidad de un producto en el carrito
 * @param {number} productId - ID del producto
 * @param {number} newQuantity - Nueva cantidad
 */
function updateCartQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  item.quantity = newQuantity;
  
  // Guardar en localStorage
  localStorage.setItem('techstore_cart', JSON.stringify(cart));
  
  // Actualizar UI
  updateCartCounter();
  renderCartItems();
  
  console.log(`🔄 Cantidad actualizada: ${item.name} - ${newQuantity}`);
}

/**
 * Limpia todo el carrito
 */
function clearCart() {
  if (cart.length === 0) {
    showToast('El carrito ya está vacío', 'info');
    return;
  }
  
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    cart = [];
    localStorage.removeItem('techstore_cart');
    
    updateCartCounter();
    renderCartItems();
    
    showToast('Carrito vaciado', 'info');
    console.log('🗑️ Carrito vaciado');
  }
}

/**
 * Actualiza el contador del carrito
 */
function updateCartCounter() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Agregar animación si hay items
    if (totalItems > 0) {
      cartCount.classList.add('pulse');
      setTimeout(() => cartCount.classList.remove('pulse'), 1000);
    }
  }
}

/**
 * Abre el modal del carrito
 */
function openCartModal() {
  renderCartItems();
  const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
  cartModal.show();
}

/**
 * Renderiza los items del carrito
 */
function renderCartItems() {
  console.log('🛒 Renderizando items del carrito...');
  
  const cartItems = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const cartTotal = document.getElementById('cartTotal');
  
  if (!cartItems) return;
  
  // Limpiar contenedor
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    if (emptyCart) emptyCart.style.display = 'block';
    if (cartTotal) cartTotal.textContent = '0';
    return;
  }
  
  if (emptyCart) emptyCart.style.display = 'none';
  
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image me-3">
        <div class="flex-grow-1">
          <h6 class="mb-1">${item.name}</h6>
          <small class="text-muted">${item.brand} ${item.model || ''}</small>
          <div class="d-flex align-items-center mt-2">
            <button class="btn btn-outline-secondary btn-sm me-2" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">
              <i class="bi bi-dash"></i>
            </button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-outline-secondary btn-sm ms-2" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">
              <i class="bi bi-plus"></i>
            </button>
          </div>
        </div>
        <div class="text-end">
          <div class="fw-bold">${formatPrice(itemTotal)}</div>
          <small class="text-muted">${formatPrice(item.price)} c/u</small>
          <div class="mt-2">
            <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    
    cartItems.appendChild(cartItem);
  });
  
  if (cartTotal) {
    cartTotal.textContent = formatPrice(total);
  }
  
  console.log(`✅ Renderizados ${cart.length} items del carrito`);
}

/**
 * Maneja el proceso de checkout
 */
function handleCheckout() {
  if (!currentUser) {
    showToast('Debes iniciar sesión para realizar la compra', 'warning');
    openAuthModal('login');
    return;
  }
  
  if (cart.length === 0) {
    showToast('Tu carrito está vacío', 'warning');
    return;
  }
  
  // Simular proceso de pago
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (confirm(`¿Confirmar compra por ${formatPrice(total)}?`)) {
    // Limpiar carrito después de la compra
    cart = [];
    localStorage.removeItem('techstore_cart');
    
    updateCartCounter();
    bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
    
    showToast('¡Compra realizada exitosamente!', 'success');
    console.log('💳 Compra completada por' , formatPrice(total));
  }
}

// ===== FUNCIONES DE BÚSQUEDA Y FILTROS =====

/**
 * Maneja la búsqueda de productos
 * @param {Event} e - Evento del formulario
 */
function handleSearch(e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim();
  performSearch(query);
}

/**
 * Maneja la búsqueda en tiempo real
 * @param {Event} e - Evento de input
 */
function handleSearchInput(e) {
  const query = e.target.value.trim();
  
  // Debounce para no hacer búsquedas muy frecuentes
  clearTimeout(window.searchTimeout);
  window.searchTimeout = setTimeout(() => {
    performSearch(query);
  }, 300);
}

/**
 * Realiza la búsqueda de productos
 * @param {string} query - Término de búsqueda
 */
function performSearch(query) {
  console.log('🔍 Buscando:', query);
  
  if (!query) {
    filteredProducts = [...products];
  } else {
    const searchTerm = query.toLowerCase();
    filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }
  
  renderProducts();
  console.log(`✅ Encontrados ${filteredProducts.length} productos`);
}

/**
 * Maneja el filtro por categoría
 * @param {Event} e - Evento del botón
 */
function handleCategoryFilter(e) {
  const category = e.target.dataset.category;
  
  // Actualizar botones activos
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  e.target.classList.add('active');
  
  // Filtrar productos
  if (category === 'all') {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(product => product.category === category);
  }
  
  renderProducts();
  console.log(`📂 Filtrado por categoría: ${category} - ${filteredProducts.length} productos`);
}

// ===== FUNCIONES DE UI Y UTILIDADES =====

/**
 * Muestra un toast notification
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
 */
function showToast(message, type = 'info') {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;
  
  const toastId = 'toast_' + Date.now();
  const iconMap = {
    success: 'bi-check-circle-fill',
    error: 'bi-x-circle-fill',
    warning: 'bi-exclamation-triangle-fill',
    info: 'bi-info-circle-fill'
  };
  
  const colorMap = {
    success: 'text-success',
    error: 'text-danger',
    warning: 'text-warning',
    info: 'text-info'
  };
  
  const toastHtml = `
    <div id="${toastId}" class="toast toast-${type}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <i class="${iconMap[type]} ${colorMap[type]} me-2"></i>
        <strong class="me-auto">TechStore</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;
  
  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  
  const toastElement = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastElement, { delay: 4000 });
  
  // Eliminar el toast del DOM después de que se oculte
  toastElement.addEventListener('hidden.bs.toast', function () {
    this.remove();
  });
  
  toast.show();
}

/**
 * Muestra error en un campo específico
 * @param {string} fieldId - ID del campo
 * @param {string} message - Mensaje de error
 */
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = field.parentNode.querySelector('.invalid-feedback');
  
  if (field) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
  }
  
  if (errorDiv) {
    errorDiv.textContent = message;
  }
  
  // Limpiar error cuando el usuario empiece a escribir
  field.addEventListener('input', function clearError() {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    if (errorDiv) errorDiv.textContent = '';
    field.removeEventListener('input', clearError);
  }, { once: true });
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Formatea un precio para mostrar
 * @param {number} price - Precio a formatear
 * @returns {string} - Precio formateado
 */
function formatPrice(price) {
  return new Intl.NumberFormat('es-CL').format(price);
}

/**
 * Trunca un texto a un número máximo de caracteres
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} - Texto truncado
 */
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Maneja la vista previa de imagen
 * @param {Event} e - Evento del input file
 */
function handleImagePreview(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  // Validar tipo de archivo
  if (!file.type.startsWith('image/')) {
    showFieldError('productImage', 'Por favor selecciona un archivo de imagen válido');
    return;
  }
  
  // Validar tamaño (5MB máximo)
  if (file.size > 5 * 1024 * 1024) {
    showFieldError('productImage', 'La imagen no debe superar los 5MB');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const previewImg = document.getElementById('previewImg');
    const imagePreview = document.getElementById('imagePreview');
    
    if (previewImg && imagePreview) {
      previewImg.src = event.target.result;
      imagePreview.style.display = 'block';
    }
  };
  
  reader.readAsDataURL(file);
  console.log('🖼️ Imagen cargada para preview');
}

/**
 * Remueve la vista previa de imagen
 */
function removeImagePreview() {
  const previewImg = document.getElementById('previewImg');
  const imagePreview = document.getElementById('imagePreview');
  const productImage = document.getElementById('productImage');
  
  if (previewImg) previewImg.src = '';
  if (imagePreview) imagePreview.style.display = 'none';
  if (productImage) productImage.value = '';
  
  console.log('🗑️ Vista previa de imagen removida');
}

/**
 * Actualiza el contador de caracteres
 * @param {Event} e - Evento de input
 */
function updateCharCounter(e) {
  const charCount = document.getElementById('charCount');
  if (charCount) {
    charCount.textContent = e.target.value.length;
  }
}

/**
 * Alterna la visibilidad de la contraseña
 * @param {string} passwordFieldId - ID del campo de contraseña
 * @param {string} toggleButtonId - ID del botón toggle
 */
function togglePasswordVisibility(passwordFieldId, toggleButtonId) {
  const passwordField = document.getElementById(passwordFieldId);
  const toggleButton = document.getElementById(toggleButtonId);
  
  if (!passwordField || !toggleButton) return;
  
  const isPassword = passwordField.type === 'password';
  passwordField.type = isPassword ? 'text' : 'password';
  
  const icon = toggleButton.querySelector('i');
  if (icon) {
    icon.className = isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
  }
}

// ===== FUNCIONES GLOBALES PARA USAR EN HTML =====

/**
 * Funciones globales que se pueden llamar desde el HTML
 * Se declaran en el scope global para que estén disponibles
 */
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.viewProduct = viewProduct;

// ===== UTILIDADES DE DEPURACIÓN =====

/**
 * Función para depuración - muestra el estado actual
 */
function debugState() {
  console.group('🔧 Estado actual de TechStore');
  console.log('Usuario actual:', currentUser);
  console.log('Productos totales:', products.length);
  console.log('Productos filtrados:', filteredProducts.length);
  console.log('Items en carrito:', cart.length);
  console.log('Carrito:', cart);
  console.groupEnd();
}

// Hacer debugState disponible globalmente en desarrollo
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.debugState = debugState;
  console.log('🔧 Función debugState() disponible para depuración');
}

// ===== EVENT LISTENERS ADICIONALES =====

// Cerrar modales al hacer clic fuera de ellos
document.addEventListener('click', function(e) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (e.target === modal) {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  });
});

// Manejo de teclas de acceso rápido
document.addEventListener('keydown', function(e) {
  // Esc para cerrar modales
  if (e.key === 'Escape') {
    const openModals = document.querySelectorAll('.modal.show');
    openModals.forEach(modal => {
      const modalInstance = bootstrap.Modal.getInstance(modal);
      if (modalInstance) {
        modalInstance.hide();
      }
    });
  }
  
  // Ctrl + K para enfocar búsqueda
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  }
});

// Animaciones de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Lazy loading para imágenes
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'navigation') {
      console.log('⚡ Tiempo de carga de página:', entry.loadEventEnd - entry.loadEventStart, 'ms');
    }
  }
});

try {
  perfObserver.observe({ entryTypes: ['navigation'] });
} catch (error) {
  console.log('Performance Observer no soportado');
}

// ===== INICIALIZACIÓN DE SERVICE WORKER (OPCIONAL) =====

// Registro del service worker para PWA (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Descomentado para evitar errores ya que no tenemos service worker
    // navigator.serviceWorker.register('/sw.js')
    //   .then(function(registration) {
    //     console.log('✅ Service Worker registrado:', registration.scope);
    //   })
    //   .catch(function(error) {
    //     console.log('❌ Error registrando Service Worker:', error);
    //   });
  });
}

// ===== MANEJO DE ERRORES GLOBALES =====

// Manejo de errores JavaScript globales
window.addEventListener('error', function(e) {
  console.error('❌ Error JavaScript:', e.error);
  showToast('Ha ocurrido un error inesperado', 'error');
});

// Manejo de promesas rechazadas
window.addEventListener('unhandledrejection', function(e) {
  console.error('❌ Promesa rechazada:', e.reason);
  showToast('Error de conexión', 'error');
});

// ===== FUNCIONES DE LIMPIEZA =====

// Limpiar recursos al salir de la página
window.addEventListener('beforeunload', function() {
  // Guardar datos importantes antes de cerrar
  if (currentUser) {
    localStorage.setItem('techstore_current_user', JSON.stringify(currentUser));
  }
  localStorage.setItem('techstore_cart', JSON.stringify(cart));
  localStorage.setItem('techstore_products', JSON.stringify(products));
  
  console.log('💾 Datos guardados antes de cerrar');
});

console.log('🎉 TechStore JavaScript cargado completamente');
console.log('📱 Versión: 1.0.0');
console.log('🔧 Para depuración, usa debugState() en la consola');

// ===== TESTING Y DESARROLLO =====

// Solo en desarrollo - crear datos de prueba
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  // Función para crear usuario de prueba
  window.createTestUser = function() {
    const testUser = {
      id: 999,
      name: 'Usuario de Prueba',
      email: 'test@techstore.com',
      password: '123456',
      createdAt: new Date().toISOString(),
      profile: {
        phone: '+56 9 1234 5678',
        city: 'Santiago',
        address: 'Av. Providencia 123',
        paymentMethod: 'transferencia',
        bankAccount: '12345678-9',
        bio: 'Usuario de prueba para desarrollo'
      }
    };
    
    const users = JSON.parse(localStorage.getItem('techstore_users') || '[]');
    if (!users.find(u => u.email === testUser.email)) {
      users.push(testUser);
      localStorage.setItem('techstore_users', JSON.stringify(users));
      console.log('👤 Usuario de prueba creado: test@techstore.com / 123456');
    }
  };
  
  // Función para limpiar todos los datos
  window.clearAllData = function() {
    if (confirm('¿Seguro que quieres limpiar todos los datos?')) {
      localStorage.removeItem('techstore_users');
      localStorage.removeItem('techstore_current_user');
      localStorage.removeItem('techstore_cart');
      localStorage.removeItem('techstore_products');
      location.reload();
    }
  };
  
  console.log('🧪 Funciones de desarrollo disponibles:');
  console.log('  - createTestUser(): Crear usuario de prueba');
  console.log('  - clearAllData(): Limpiar todos los datos');
}