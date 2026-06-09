const products = [];
let filteredProducts = [];

export function setProducts(data) {
    products.length = 0;
    products.push(...data);
    filteredProducts = [...products];
}

export function getProducts() {
    return filteredProducts;
}

export function filterByCategory(category) {
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => 
            product.category.toLowerCase() === category.toLowerCase()
        );
    }
    return filteredProducts;
}

export function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    return filteredProducts;
}

export function getProductById(id) {
    return products.find(product => product.id === id);
}