const CART_KEY = 'eclat_cart';

export function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
}

export function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart(cart);
}

export function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCart(updatedCart);
}

export function updateQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
    }
    
    saveCart(cart);
}

export function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function getCartCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

export function updateCartCount() {
    const count = getCartCount();
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => el.textContent = count);
}

export function updateCartTotal() {
    const total = getCartTotal();
    const totalElements = document.querySelectorAll('.total-amount');
    totalElements.forEach(el => el.textContent = `$${total.toFixed(2)}`);
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCartTotal();
});