/*=========================================
TIMMY KICKS - PRODUCT DATABASE
=========================================*/

const products = [
    {
        id: 1,
        name: "Air Jordan 4",
        brand: "Jordan",
        category: "Sneakers",
        price: 4000,
        oldPrice: 4500,
        image: "images/shoes/jordan4.jpg",
        description: "Classic basketball sneaker with premium leather finish.",
        sku: "TK001"
    },

    {
        id: 2,
        name: "Nike Air Force 1",
        brand: "Nike",
        category: "Sneakers",
        price: 2500,
        oldPrice: 2800,
        image: "images/shoes/airforce1.jpg",
        description: "Legendary everyday sneaker loved around the world.",
        sku: "TK002"
    },

    {
        id: 3,
        name: "Adidas Samba",
        brand: "Adidas",
        category: "Sneakers",
        price: 3800,
        oldPrice: 4000,
        image: "images/shoes/samba.jpg",
        description: "Retro skate-inspired sneakers with premium suede finish.",
        sku: "TK003"
    },

    {
        id: 4,
        name: "Nike Dunk Low Panda",
        brand: "Nike",
        category: "Sneakers",
        price: 3800,
        oldPrice: 4200,
        image: "images/shoes/panda.jpg",
        description: "One of the world's most popular lifestyle sneakers.",
        sku: "TK004"
    },

    {
        id: 5,
        name: "Nike TN",
        brand: "Puma",
        category: "Sneakers",
        price: 3800,
        oldPrice: 4000,
        image: "images/shoes/niketn.jpg",
        description: "Bold streetwear sneaker with lightweight cushioning.",
        sku: "TK005"
    },

    {
        id: 6,
        name: "Vans Old Skool",
        brand: "Vans",
        category: "Sneakers",
        price: 2000,
        oldPrice: 2400,
        image: "images/shoes/vans.jpg",
        description: "Timeless skate shoe built for everyday comfort.",
        sku: "TK006"
    },

    {
        id: 7,
        name: "Converse",
        brand: "Converse",
        category: "Sneakers",
        price: 2000,
        oldPrice: 2500,
        image: "images/shoes/converse.jpg",
        description: "Classic high-top sneaker perfect for casual outfits.",
        sku: "TK007"
    },

    {
        id: 8,
        name: "New Balance 550",
        brand: "New Balance",
        category: "Sneakers",
        price: 3800,
        oldPrice: 4000,
        image: "images/shoes/nb550.jpg",
        description: "Premium retro basketball sneaker with modern comfort.",
        sku: "TK008"
    },

    {
        id: 9,
        name: "Dr Martens 1460 Boots",
        brand: "Dr Martens",
        category: "Sneakers",
        price: 4500,
        oldPrice: 5000,
        image: "images/shoes/drmartens.jpg",
        description: "Premium leather boots built for durability, comfort and timeless style.",
        sku: "TK009"
    },

    {
        id: 10,
        name: "Manchester United Jersey",
        brand: "Adidas",
        category: "Football Jersey",
        price: 1800,
        oldPrice: 2500,
        image: "images/products/manutd.jpg",
        description: "Football jersey with lightweight breathable fabric.",
        sku: "TK010"
    },

    {
        id: 11,
        name: "Arsenal Home Jersey",
        brand: "Adidas",
        category: "Football Jersey",
        price: 1800,
        oldPrice: 2500,
        image: "images/products/arsenal.jpg",
        description: "Premium supporters jersey designed for all-day comfort.",
        sku: "TK011"
    },

    {
        id: 12,
        name: "LA Lakers Jersey",
        brand: "Nike",
        category: "Basketball Jersey",
        price: 1500,
        oldPrice: 2200,
        image: "images/products/lakers.jpg",
        description: "Premium basketball jersey with breathable performance fabric.",
        sku: "TK012"
    },

    {
        id: 13,
        name: "Chicago Bulls Jersey",
        brand: "Nike",
        category: "Basketball Jersey",
        price: 1500,
        oldPrice: 1800,
        image: "images/products/bulls.jpg",
        description: "Classic NBA jersey inspired by one of basketball's greatest teams.",
        sku: "TK013"
    },

    {
        id: 14,
        name: "Real Madrid Home Jersey",
        brand: "Adidas",
        category: "Football Jersey",
        price: 1800,
        oldPrice: 2500,
        image: "images/products/realmadrid.jpg",
        description: "High-quality football jersey inspired by the Spanish giants.",
        sku: "TK014"
    },

    {
        id: 15,
        name: "Chelsea Home Jersey",
        brand: "Nike",
        category: "Football Jersey",
        price: 1600,
        oldPrice: 1800,
        image: "images/products/chelsea.jpg",
        description: "Modern football jersey with lightweight breathable construction.",
        sku: "TK015"
    },

    {
        id: 16,
        name: "Air Jordan 1 High",
        brand: "Jordan",
        category: "Sneakers",
        price: 3900,
        oldPrice: 4200,
        image: "images/shoes/jordan1.jpg",
        description: "The legendary sneaker that launched the iconic Jordan legacy.",
        sku: "TK016"
    },

    {
        id: 17,
        name: "Nike Air Max 90",
        brand: "Nike",
        category: "Sneakers",
        price: 2800,
        oldPrice: 2900,
        image: "images/shoes/airmax90.jpg",
        description: "Comfortable everyday sneaker featuring legendary Air cushioning.",
        sku: "TK017"
    },

    {
        id: 18,
        name: "Nike Air Max 97",
        brand: "Nike",
        category: "Sneakers",
        price: 3000,
        oldPrice: 3200,
        image: "images/shoes/airmax97.jpg",
        description: "Streamlined design with full-length Air cushioning.",
        sku: "TK018"
    },

    {
        id: 19,
        name: "Adidas Gazelle",
        brand: "Adidas",
        category: "Sneakers",
        price: 3800,
        oldPrice: 4000,
        image: "images/shoes/gazelle.jpg",
        description: "The iconic shell-toe sneaker built for everyday streetwear.",
        sku: "TK019"
    },

    {
        id: 20,
        name: "New Balance 9060",
        brand: "New Balance",
        category: "Sneakers",
        price: 4200,
        oldPrice: 4500,
        image: "images/shoes/nb9060.jpg",
        description: "Premium lifestyle sneaker combining comfort and bold design.",
        sku: "TK020"
    },

    {
        id: 21,
        name: "Jordan 11",
        brand: "Jordan",
        category: "Sneakers",
        price: 3500,
        oldPrice: 3800,
        image: "images/shoes/jordan11.jpg",
        description: "Premium basketball sneaker with iconic patent leather finish.",
        sku: "TK021"
    },

    {
        id: 22,
        name: "Liverpool Home Jersey",
        brand: "Nike",
        category: "Football Jersey",
        price: 1800,
        oldPrice: 2000,
        image: "images/products/liverpool.jpg",
        description: "Premium supporters jersey with breathable performance fabric.",
        sku: "TK022"
    },

    {
        id: 23,
        name: "Golden State Warriors Jersey",
        brand: "Nike",
        category: "Basketball Jersey",
        price: 1800,
        oldPrice: 2000,
        image: "images/products/warriors.jpg",
        description: "Premium NBA jersey inspired by the champions.",
        sku: "TK023"
    },

    {
        id: 24,
        name: "Puma Speedcat",
        brand: "Puma",
        category: "Sneakers",
        price: 3800,
        oldPrice: 4000,
        image: "images/shoes/speedcat.jpg",
        description: "High-performance streetwear shoes offering exceptional comfort and energy return.",
        sku: "TK024"
    }
];


/*=========================================
GLOBAL PRODUCT VARIABLES
=========================================*/

let filteredProducts = [...products];

let productsDisplayed = 8;


/*=========================================
PRODUCT GRID
=========================================*/

const productGrid = document.getElementById("productGrid");
const productCount = document.getElementById("productCount");
const loadMoreBtn = document.getElementById("loadMoreBtn");


/*=========================================
FORMAT PRICE
=========================================*/

function formatPrice(price) {
    return new Intl.NumberFormat("en-KE").format(price);
}


/*=========================================
RENDER PRODUCTS
=========================================*/

function renderProducts() {

    if (!productGrid) return;

    productGrid.innerHTML = "";

    const productsToDisplay = filteredProducts.slice(0, productsDisplayed);

    if (productsToDisplay.length === 0) {

        productGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>No Products Found</h3>
                <p>Try changing your search or filter options.</p>
            </div>
        `;

        if (productCount) {
            productCount.textContent = "Showing 0 Products";
        }

        if (loadMoreBtn) {
            loadMoreBtn.style.display = "none";
        }

        return;
    }


    productsToDisplay.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product-card";

        card.dataset.name = product.name;
        card.dataset.brand = product.brand;
        card.dataset.category = product.category;
        card.dataset.price = product.price;

        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-content">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="price">
                    KES ${formatPrice(product.price)}
                </div>

                <div class="product-buttons">

                    <button
                        class="wishlist-btn"
                        aria-label="Add ${product.name} to wishlist"
                    >
                        <i class="far fa-heart"></i>
                    </button>

                    <button
                        class="btn add-to-cart"
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-price="${product.price}"
                        data-image="${product.image}"
                    >
                        Add to Cart
                    </button>

                    <a
                        href="product.html?id=${product.id}"
                        class="btn btn-outline"
                    >
                        View Details
                    </a>

                </div>

            </div>
        `;

        productGrid.appendChild(card);

    });


    if (productCount) {

        productCount.textContent =
            `Showing ${productsToDisplay.length} of ${filteredProducts.length} Products`;

    }


    if (loadMoreBtn) {

        if (productsDisplayed >= filteredProducts.length) {

            loadMoreBtn.style.display = "none";

        } else {

            loadMoreBtn.style.display = "inline-block";

        }

    }


    initializeProductCards();

    initializeWishlist();

}


/*=========================================
SEARCH + FILTER
=========================================*/

function filterProducts() {

    const searchInput =
        document.getElementById("searchInput");

    const brandFilter =
        document.getElementById("brandFilter");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const priceFilter =
        document.getElementById("priceFilter");


    const search =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    const brand =
        brandFilter
            ? brandFilter.value
            : "all";

    const category =
        categoryFilter
            ? categoryFilter.value
            : "all";

    const price =
        priceFilter
            ? priceFilter.value
            : "all";


    filteredProducts = products.filter(function(product) {

        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.brand.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);


        const matchesBrand =
            brand === "all" ||
            product.brand === brand;


        const matchesCategory =
            category === "all" ||
            product.category === category;


        let matchesPrice = true;


        if (price === "0-2500") {

            matchesPrice =
                product.price <= 2500;

        }

        else if (price === "2501-3500") {

            matchesPrice =
                product.price >= 2501 &&
                product.price <= 3500;

        }

        else if (price === "3501-4000") {

            matchesPrice =
                product.price >= 3501 &&
                product.price <= 4000;

        }

        else if (price === "4001") {

            matchesPrice =
                product.price >= 4001;

        }


        return (
            matchesSearch &&
            matchesBrand &&
            matchesCategory &&
            matchesPrice
        );

    });


    productsDisplayed = 8;

    applySorting(false);

}


/*=========================================
SORT PRODUCTS
=========================================*/

function applySorting(resetDisplay = true) {

    const sortFilter =
        document.getElementById("sortFilter");

    const sort =
        sortFilter
            ? sortFilter.value
            : "default";


    if (sort === "price-low") {

        filteredProducts.sort(function(a, b) {
            return a.price - b.price;
        });

    }

    else if (sort === "price-high") {

        filteredProducts.sort(function(a, b) {
            return b.price - a.price;
        });

    }

    else if (sort === "name") {

        filteredProducts.sort(function(a, b) {

            return a.name.localeCompare(b.name);

        });

    }


    if (resetDisplay) {
        productsDisplayed = 8;
    }


    renderProducts();

}


/*=========================================
LOAD MORE
=========================================*/

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", function() {

        productsDisplayed += 8;

        renderProducts();

    });

}


/*=========================================
FILTER EVENTS
=========================================*/

const searchInput =
    document.getElementById("searchInput");

const brandFilter =
    document.getElementById("brandFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const priceFilter =
    document.getElementById("priceFilter");

const sortFilter =
    document.getElementById("sortFilter");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}


if (brandFilter) {

    brandFilter.addEventListener(
        "change",
        filterProducts
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


if (priceFilter) {

    priceFilter.addEventListener(
        "change",
        filterProducts
    );

}


if (sortFilter) {

    sortFilter.addEventListener(
        "change",
        function() {
            applySorting(true);
        }
    );

}


/*=========================================
PRODUCT LOOKUP FUNCTIONS
=========================================*/

function getProductById(id) {

    return products.find(function(product) {

        return Number(product.id) === Number(id);

    });

}


function getProductIdFromUrl() {

    const params =
        new URLSearchParams(window.location.search);

    return Number(params.get("id")) || 1;

}


function getProductFromUrl() {

    return getProductById(
        getProductIdFromUrl()
    );

}


/*=========================================
CART STORAGE
=========================================*/

function getCart() {

    try {

        const savedCart =
            localStorage.getItem("cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];

    }

    catch (error) {

        console.error(
            "Timmy Kicks: Unable to read cart.",
            error
        );

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/*=========================================
UPDATE CART COUNT
=========================================*/

function updateCartCount() {

    const cart = getCart();

    const quantity =
        cart.reduce(function(total, item) {

            return total +
                (Number(item.quantity) || 0);

        }, 0);


    document
        .querySelectorAll(
            "#cartCount, #cart-count, .cart-count, [data-cart-count]"
        )
        .forEach(function(element) {

            element.textContent = quantity;

            element.style.display =
                quantity > 0
                    ? "inline-flex"
                    : "none";

        });

}


/*=========================================
ADD TO CART
=========================================*/

function addToCart(productId, quantity = 1) {

    const product =
        getProductById(productId);


    if (!product) {

        console.error(
            "Timmy Kicks: Product not found:",
            productId
        );

        return false;

    }


    const cart = getCart();


    const existingItem =
        cart.find(function(item) {

            return Number(item.id) ===
                Number(product.id);

        });


    if (existingItem) {

        existingItem.quantity =
            (Number(existingItem.quantity) || 0) +
            Number(quantity);

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            oldPrice: product.oldPrice,

            image: product.image,

            quantity: Number(quantity)

        });

    }


    saveCart(cart);

    updateCartCount();

    return true;

}


/*=========================================
ADD TO CART BUTTONS
=========================================*/

function initializeProductCards() {

    document
        .querySelectorAll(
            ".product-card .add-to-cart"
        )
        .forEach(function(button) {

            if (
                button.dataset.productInitialized ===
                "true"
            ) {
                return;
            }


            button.dataset.productInitialized =
                "true";


            button.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    event.stopPropagation();


                    const id =
                        Number(button.dataset.id);


                    if (
                        addToCart(id, 1)
                    ) {

                        const originalText =
                            button.innerHTML;


                        button.classList.add(
                            "added"
                        );


                        button.innerHTML =
                            '<i class="fas fa-check"></i> Added';


                        setTimeout(
                            function() {

                                button.innerHTML =
                                    originalText;

                                button.classList.remove(
                                    "added"
                                );

                            },
                            1200
                        );

                    }

                }
            );

        });

}


/*=========================================
WISHLIST
=========================================*/

function initializeWishlist() {

    document
        .querySelectorAll(".wishlist-btn")
        .forEach(function(button) {

            if (
                button.dataset.wishlistInitialized ===
                "true"
            ) {
                return;
            }


            button.dataset.wishlistInitialized =
                "true";


            button.addEventListener(
                "click",
                function() {

                    const icon =
                        button.querySelector("i");


                    button.classList.toggle(
                        "active"
                    );


                    if (
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        icon.classList.remove(
                            "far"
                        );

                        icon.classList.add(
                            "fas"
                        );

                    }

                    else {

                        icon.classList.remove(
                            "fas"
                        );

                        icon.classList.add(
                            "far"
                        );

                    }

                }
            );

        });

}


/*=========================================
INITIALIZE PRODUCTS PAGE
=========================================*/

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        renderProducts();

        console.log(
            "Timmy Kicks: 24 products loaded successfully."
        );

    }
);