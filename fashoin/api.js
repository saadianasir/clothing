const API_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const products = await response.json();
        const transformedProducts = products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image
        }));
        return { success: true, data: transformedProducts };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Product not found');
        }
        const product = await response.json();
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image
        };
    } catch (error) {
        return null;
    }
}