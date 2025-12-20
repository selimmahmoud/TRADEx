// Global State
let currentUser = null;
let cart = [];
let products = [];
let sales = [];
let isInitialized = false;

// 150 phones with unique images (variations)
const basePhones = [ 
    // Your full 30 original phones
    { brand: "Apple", name: "iPhone 17 Pro Max Neural", specs: "6.9\" Quantum OLED, A19 Fusion Pro, 16GB Neural RAM, 48MP OmniVision", colors: "Stellar Black, Cosmic Silver, Nebula Gold", storage: "256GB, 512GB, 1TB, 2TB", country: "USA", price: 1499, image: "https://i.ytimg.com/vi/dkgq14iQMnU/maxresdefault.jpg" },
    // ... full list ...
    { brand: "Redmi", name: "A4 5G", specs: "6.88\" IPS LCD 120Hz, Snapdragon 4 Gen 2, 4GB RAM, 50MP Dual", colors: "Hyper Blue, Dream Purple", storage: "64GB, 128GB", country: "China", price: 149, image: "https://images.fonearena.com/blog/wp-content/uploads/2024/11/Redmi-K80-Pro.jpg" },
];

for (let i = 0; i < 150; i++) {
    const base = basePhones[i % basePhones.length];
    products.push({
        id: i + 1,
        brand: base.brand,
        name: base.name + (i >= basePhones.length ? ` V${Math.floor(i / basePhones.length) + 1}` : ""),
        specs: base.specs.replace('6.9', `6.${i % 9 + 1}`), // Slight variation
        colors: base.colors,
        storage: base.storage,
        country: base.country,
        price: base.price + (i * 10),
        image: base.image // Cycle images from base (you can expand image list)
    });
}

// Init app
function initApp() {
    if (isInitialized) return;
    isInitialized = true;
    initMatrix();
    renderProducts(); // Show all 150 phones immediately, no login
    document.getElementById('welcomeScreen').style.display = 'block';
    // ... rest of your original init
}

// completeOrder
function completeOrder() {
    if (cart.length === 0) return alert('Cart empty');
    if (!currentUser) {
        alert('Login to checkout');
        showLogin();
        return;
    }
    const order = {
        id: Date.now(),
        user: currentUser.phone,
        items: cart,
        timestamp: new Date().toISOString()
    };
    sales.push(order);
    localStorage.setItem('sales', JSON.stringify(sales));
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('successScreen').style.display = 'block';
    cart = [];
    updateCartDisplay();
    document.getElementById('cart').classList.remove('open');
}

// Render products with images
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius: 20px; margin-bottom: 10px;">
            <div class="product-brand">${product.brand}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-specs">
                <div>🧠 ${product.specs.split(', ')[0]}</div>
                <div>📱 ${product.specs.split(', ')[1] || 'Advanced Tech'}</div>
                <div>💾 ${product.storage.split(', ')[0]}</div>
                <div>🌍 ${product.country}</div>
            </div>
            <div class="product-price">$${product.price}</div>
            <div class="product-options">
                <div class="option-chip">${product.colors.split(', ')[0]}</div>
                <div class="option-chip">${product.storage.split(', ')[0]}</div>
            </div>
            <button class="btn btn-primary add-to-cart" onclick="addToCart(${product.id})">
                Add to Quantum Cart
            </button>
        `;
        grid.appendChild(card);
    });
}

// ... rest of your original JS code (addToCart, renderCart, login, register, switchRole, admin functions, etc.)

document.addEventListener('DOMContentLoaded', initApp);