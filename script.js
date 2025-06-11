// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('products-container').innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

// Display products in the grid
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.title}" class="product-image">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        productsContainer.appendChild(productCard);
    });
}

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const description = card.querySelector('.product-description').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

searchButton.addEventListener('click', searchProducts);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchProducts); 