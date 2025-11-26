// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero img');

function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Auto slide every 5 seconds

// Cart Counter
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
document.getElementById('cartCount').textContent = cartCount;

function addToCart() {
    cartCount++;
    document.getElementById('cartCount').textContent = cartCount;
    localStorage.setItem('cartCount', cartCount);
    alert('Product added to cart!');
}

// Search Filter
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    let hasResults = false;

    products.forEach(product => {
        const name = product.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) {
            product.classList.remove('hidden');
            hasResults = true;
        } else {
            product.classList.add('hidden');
        }
    });

    document.getElementById('noResults').style.display = hasResults ? 'none' : 'block';
}

document.getElementById('searchInput').addEventListener('input', filterProducts);
