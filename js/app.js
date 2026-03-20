// Initialize Icons
lucide.createIcons();

// --- MOCK DATA ---
const products = [
    {
        id: 'L01',
        title: 'Handcrafted Emerald & Gold Ring',
        vendor: 'AuroraJewels',
        price: 245.00,
        rating: 4.9,
        reviews: 128,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b454bf?w=500&q=80',
        badge: 'Bestseller'
    },
    {
        id: 'L02',
        title: 'Speckled Ceramic Coffee Mug',
        vendor: 'EarthAndFireStudio',
        price: 32.00,
        rating: 4.8,
        reviews: 456,
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&q=80',
        badge: 'Free Shipping'
    },
    {
        id: 'L03',
        title: 'Vintage Leather Messenger Bag',
        vendor: 'HeritageCrafts',
        price: 185.00,
        rating: 4.7,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
        badge: null
    },
    {
        id: 'L04',
        title: 'Abstract Canvas Wall Art - Large',
        vendor: 'ModernistCanvas',
        price: 450.00,
        rating: 5.0,
        reviews: 34,
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=80',
        badge: 'Only 1 left'
    },
    {
        id: 'L05',
        title: 'Hand-poured Soy Candle - Sandalwood',
        vendor: 'LuminaScents',
        price: 24.00,
        rating: 4.9,
        reviews: 890,
        image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=500&q=80',
        badge: 'Bestseller'
    },
    {
        id: 'L06',
        title: 'Minimalist Brass Desk Lamp',
        vendor: 'LumenDesign',
        price: 115.00,
        rating: 4.6,
        reviews: 56,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',
        badge: 'Free Shipping'
    },
    {
        id: 'L07',
        title: 'Woven Cotton Throw Blanket',
        vendor: 'CozyTextiles',
        price: 85.00,
        rating: 4.8,
        reviews: 210,
        image: 'https://images.unsplash.com/photo-1580828369019-222abf8e8156?w=500&q=80',
        badge: null
    },
    {
        id: 'L08',
        title: 'Personalized Walnut Cutting Board',
        vendor: 'WoodCraftersCo',
        price: 65.00,
        rating: 4.9,
        reviews: 543,
        image: 'https://images.unsplash.com/photo-1611077544837-772cba04b12a?w=500&q=80',
        badge: 'Bestseller'
    },
    {
        id: 'L09',
        title: 'Set of 4 Linen Napkins',
        vendor: 'FlaxAndThread',
        price: 38.00,
        rating: 4.7,
        reviews: 112,
        image: 'https://images.unsplash.com/photo-1579737190184-4d8db1c4915a?w=500&q=80',
        badge: 'Free Shipping'
    },
    {
        id: 'L10',
        title: 'Handmade Silver Hoop Earrings',
        vendor: 'AuroraJewels',
        price: 45.00,
        rating: 4.8,
        reviews: 320,
        image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=500&q=80',
        badge: null
    }
];

// --- APP STATE ---
let cartCount = 0;

// --- RENDER PRODUCTS ---
function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    products.forEach(p => {
        let badgeHtml = '';
        if (p.badge) {
            const badgeClass = p.badge === 'Free Shipping' ? 'free-ship' : '';
            badgeHtml = `<span class="p-badge ${badgeClass}">${p.badge}</span>`;
        }

        const card = document.createElement('div');
        card.className = 'p-card';
        card.innerHTML = `
            <div class="p-image">
                <img src="${p.image}" alt="${p.title}">
                <button class="fav-btn" onclick="toggleFavorite(this, event)">
                    <i data-lucide="heart"></i>
                </button>
                <div class="add-cart-overlay" onclick="addToCart(event)">
                    <i data-lucide="shopping-bag" style="width: 14px; margin-right: 4px;"></i> Add to basket
                </div>
            </div>
            <h3 class="p-title" title="${p.title}">${p.title}</h3>
            <p class="p-vendor">${p.vendor}</p>
            <div class="p-rating">
                <i data-lucide="star"></i> ${p.rating} <span style="color: var(--clr-text-light);">(${p.reviews})</span>
            </div>
            <div class="p-price">
                $${p.price.toFixed(2)} ${badgeHtml}
            </div>
        `;
        grid.appendChild(card);
    });

    lucide.createIcons();
}

// --- INTERACTIONS ---
function toggleFavorite(btn, event) {
    event.stopPropagation(); // prevent card click
    btn.classList.toggle('active');
    
    // Change icon fill via SVG attribute
    const icon = btn.querySelector('svg');
    if(btn.classList.contains('active')) {
        icon.setAttribute('fill', 'var(--clr-accent)');
        icon.setAttribute('stroke', 'var(--clr-accent)');
    } else {
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
    }
}

function addToCart(event) {
    event.stopPropagation();
    cartCount++;
    const badge = document.getElementById('cart-count');
    badge.textContent = cartCount;
    
    // Simple popup feedback
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check" style="width: 14px; margin-right: 4px;"></i> Added!`;
    btn.style.backgroundColor = 'var(--clr-primary)';
    btn.style.color = 'white';
    lucide.createIcons();
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
        lucide.createIcons();
    }, 1500);
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
