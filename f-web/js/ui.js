export function renderProducts(products, container) {
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    products.forEach(product => {
        const card = createProductCard(product);
        fragment.appendChild(card);
    });
    
    container.appendChild(fragment);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    return card;
}

export function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}

export function setupSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchOverlay && searchClose && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchInput.focus();
        });
        
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });
        
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
    }
}

export function setupCartSidebar() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    
    if (cartBtn && cartSidebar && cartClose) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
        });
        
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });
    }
}

export function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;
    
    const cart = JSON.parse(localStorage.getItem('eclat_cart') || '[]');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <p>Qty: ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remove</button>
            </div>
        `;
        fragment.appendChild(cartItem);
    });
    
    cartItemsContainer.appendChild(fragment);
}

export function setupTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

export function showLoading(element) {
    element.innerHTML = '<div class="spinner"></div>';
}

export function showError(element, message) {
    element.innerHTML = `
        <p class="error-message">${message}</p>
        <button class="btn btn-primary retry-btn">Retry</button>
    `;
}