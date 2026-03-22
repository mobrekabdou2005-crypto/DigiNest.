// Initialize Icons
lucide.createIcons();

// --- MOCK DIGITAL PRODUCTS ---
const initialProducts = [
    {
        id: 'D01',
        title: 'Nexus SaaS Boilerplate - Next.js',
        author: 'EliteDevs',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
        price: 89.00,
        category: 'SaaS Tools',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
        tag: 'Bestseller'
    },
    {
        id: 'D02',
        title: 'Cyber 3D Icons Pack - Isometric',
        author: 'NeonDesign',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        price: 34.00,
        category: '3D Models',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
        tag: 'Featured'
    },
    {
        id: 'D03',
        title: 'Vanguard UI Kit - Figma Library',
        author: 'SystemX',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80',
        price: 59.00,
        category: 'UI Kits',
        image: 'https://images.unsplash.com/photo-1541462608141-ad4d157ee78a?w=600&q=80',
        tag: null
    },
    {
        id: 'D04',
        title: 'Abstract Motion Gradient Toolkit',
        author: 'GlowFlow',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80',
        price: 24.00,
        category: 'Graphic Assets',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80',
        tag: 'Sale'
    },
    {
        id: 'D05',
        title: 'Modern Sans Serif Font - Variable',
        author: 'TypeHaus',
        avatar: 'https://images.unsplash.com/photo-1586297135537-94bc9ba553c7?w=100&q=80',
        price: 19.00,
        category: 'Fonts',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
        tag: null
    },
    {
        id: 'D06',
        title: 'Admin Dashboard Pro - Tailwind CSS',
        author: 'CodeMasters',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        price: 129.00,
        category: 'Code Tutors',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
        tag: 'Premium'
    }
];

// --- APP STATE ---
let digitalProducts = JSON.parse(localStorage.getItem('diginest_assets')) || initialProducts;
let cartCount = 0;
let isManagementMode = false;
const busyButtons = new Set();

// --- PERSISTENCE ---
function saveToStorage() {
    localStorage.setItem('diginest_assets', JSON.stringify(digitalProducts));
}

// --- RENDER PRODUCTS ---
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // If in management mode, add the "Add Product" card
    if (isManagementMode) {
        const addCard = document.createElement('div');
        addCard.className = 'glass-card p-card add-card-ui';
        addCard.style.display = 'flex';
        addCard.style.alignItems = 'center';
        addCard.style.justifyContent = 'center';
        addCard.style.cursor = 'pointer';
        addCard.style.borderStyle = 'dashed';
        addCard.style.minHeight = '300px';
        addCard.onclick = () => openModal();
        addCard.innerHTML = `
            <div style="text-align: center;">
                <i data-lucide="plus-circle" style="width: 48px; height: 48px; color: var(--clr-primary); margin-bottom: 16px;"></i>
                <h3 style="font-size: 18px;">Add New Asset</h3>
            </div>
        `;
        grid.appendChild(addCard);
    }

    digitalProducts.forEach(p => {
        let tagHtml = p.tag ? `<span class="p-tag">${p.tag}</span>` : '';

        const card = document.createElement('div');
        card.className = `glass-card p-card ${isManagementMode ? 'management-active' : ''}`;
        card.innerHTML = `
            <div class="manage-tools">
                <button class="m-btn edit-btn" onclick="openModal('${p.id}')"><i data-lucide="edit-3" style="width: 16px;"></i></button>
                <button class="m-btn del-btn" onclick="deleteProduct('${p.id}')"><i data-lucide="trash-2" style="width: 16px;"></i></button>
            </div>
            <div class="p-img-wrapper">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
                ${tagHtml}
            </div>
            <div class="p-info">
                <h3 class="p-title">${p.title}</h3>
                <div class="p-meta">
                    <div class="p-author">
                        <img src="${p.avatar || 'https://ui-avatars.com/api/?name=' + p.author}" alt="${p.author}">
                        <span>${p.author}</span>
                    </div>
                    <span>${p.category}</span>
                </div>
                <div class="p-price-row">
                    <span class="price">$${p.price.toFixed(2)}</span>
                    <button class="buy-btn" onclick="addToCart(this, event)">
                        <i data-lucide="shopping-bag" style="width: 18px;"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    lucide.createIcons();
    document.body.classList.toggle('management-mode', isManagementMode);
}

// --- INTERFACE TOGGLES ---
function toggleManagementMode() {
    isManagementMode = !isManagementMode;
    const btn = document.getElementById('manage-btn');
    if (isManagementMode) {
        btn.textContent = 'Exit Management';
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-outline');
    } else {
        btn.textContent = 'Manage Assets';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
    }
    renderProducts();
}

// --- MODAL LOGIC ---
function openModal(productId = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const title = document.getElementById('modal-title');
    
    form.reset();
    document.getElementById('edit-id').value = '';
    
    if (productId) {
        const p = digitalProducts.find(x => x.id === productId);
        if (p) {
            title.innerHTML = `Edit <span class="gradient-text">Asset</span>`;
            document.getElementById('edit-id').value = p.id;
            document.getElementById('p-title').value = p.title;
            document.getElementById('p-price').value = p.price;
            document.getElementById('p-category').value = p.category;
            document.getElementById('p-author').value = p.author;
            document.getElementById('p-image').value = p.image;
            document.getElementById('p-tag').value = p.tag || '';
        }
    } else {
        title.innerHTML = `Add New <span class="gradient-text">Asset</span>`;
    }
    
    modal.classList.add('active');
    lucide.createIcons({ parentElement: modal });
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
}

function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;
    const productData = {
        title: document.getElementById('p-title').value,
        price: parseFloat(document.getElementById('p-price').value),
        category: document.getElementById('p-category').value,
        author: document.getElementById('p-author').value,
        image: document.getElementById('p-image').value,
        tag: document.getElementById('p-tag').value || null,
        avatar: `https://ui-avatars.com/api/?name=${document.getElementById('p-author').value}&background=random`
    };

    if (id) {
        const index = digitalProducts.findIndex(p => p.id === id);
        digitalProducts[index] = { ...digitalProducts[index], ...productData };
    } else {
        productData.id = 'D' + Math.floor(Math.random() * 10000);
        digitalProducts.unshift(productData);
    }

    saveToStorage();
    renderProducts();
    closeModal();
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this asset?')) {
        digitalProducts = digitalProducts.filter(p => p.id !== id);
        saveToStorage();
        renderProducts();
    }
}

// --- INTERACTIONS ---
function addToCart(btn, event) {
    if (event) event.stopPropagation();
    if (busyButtons.has(btn)) return;

    busyButtons.add(btn);
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;

    const originalContent = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check" style="width: 18px; color: white;"></i>`;
    btn.style.background = 'var(--clr-primary)';
    btn.style.borderColor = 'var(--clr-primary)';
    
    lucide.createIcons({ parentElement: btn });

    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.background = '';
        btn.style.borderColor = '';
        lucide.createIcons({ parentElement: btn });
        busyButtons.delete(btn);
    }, 1500);
}

// --- NAVBAR EFFECTS ---
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
