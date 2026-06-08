import { fetchProducts } from './api.js';
import { setProducts, getProducts, filterByCategory, searchProducts } from './products.js';
import { addToCart, getCart, removeFromCart, getCartTotal } from './cart.js';
import { 
    renderProducts, 
    setupMobileMenu,
    setupSearch,
    setupCartSidebar,
    renderCartItems,
    setupTestimonials,
    showLoading,
    showError
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    setupMobileMenu();
    setupSearch();
    setupCartSidebar();
    setupTestimonials();
    
    const productsGrid = document.querySelector('.products-grid');
    const loader = document.querySelector('.products-loader');
    
    if (loader) showLoading(loader);
    
    const result = await fetchProducts();
    
    if (result.success) {
        setProducts(result.data);
        const products = getProducts();
        
        setTimeout(() => {
            if (loader) loader.style.display = 'none';
            renderProducts(products, productsGrid);
            setupFilterButtons();
            setupAddToCartButtons();
        }, 500);
    } else {
        if (loader) {
            showError(loader, `Error loading products: ${result.error}`);
            const retryBtn = loader.querySelector('.retry-btn');
            if (retryBtn) retryBtn.addEventListener('click', initializeApp);
        }
    }
    
    setupCartItemRemoval();
    setupNewsletterForm();
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.dataset.category;
            const products = filterByCategory(category);
            renderProducts(products, document.querySelector('.products-grid'));
        });
    });
}

function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = getProducts().find(p => p.id === productId);
            
            if (product) {
                addToCart(product);
                e.target.textContent = 'Added!';
                setTimeout(() => {
                    e.target.textContent = 'Add to Cart';
                }, 1000);
            }
        });
    });
}

function setupCartItemRemoval() {
    document.querySelector('.cart-items')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-item-remove')) {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
            renderCartItems();
        }
    });
}

function setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        form.innerHTML = '<p style="color: var(--deep-plum); font-size: 1.2rem;">Thank you for subscribing!</p>';
    });
}

document.querySelector('.cart-btn')?.addEventListener('click', renderCartItems);