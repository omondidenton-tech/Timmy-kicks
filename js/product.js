/*=========================================
TIMMY KICKS - PRODUCT DETAILS
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /*=========================================
    GET PRODUCT DATA
    =========================================*/

    const productId =
        new URLSearchParams(window.location.search).get("id");

    const selectedId = Number(productId) || 1;

    const product =
        typeof getProductById === "function"
            ? getProductById(selectedId)
            : null;

    if (!product) {
        console.error(
            "Timmy Kicks: Product not found for ID:",
            selectedId
        );
        return;
    }


    /*=========================================
    PAGE ELEMENTS
    =========================================*/

    const productName =
        document.getElementById("productName");

    const productBrand =
        document.getElementById("productBrand");

    const productCategory =
        document.getElementById("productCategory");

    const productPrice =
        document.getElementById("productPrice");

    const productOldPrice =
        document.getElementById("productOldPrice") ||
        document.getElementById("oldPrice");

    const productDescription =
        document.getElementById("productDescription");

    const productSKU =
        document.getElementById("productSKU");

    const mainImage =
        document.getElementById("mainProductImage") ||
        document.getElementById("mainImage");

    const thumbnailGallery =
        document.getElementById("thumbnailGallery") ||
        document.querySelector(".gallery-thumbnails");

    const quantityInput =
        document.getElementById("quantity");

    const increaseQtyButton =
        document.getElementById("increaseQty");

    const decreaseQtyButton =
        document.getElementById("decreaseQty");

    const addToCartButton =
        document.getElementById("addToCart");

    const buyNowButton =
        document.getElementById("buyNow");

    const whatsappOrderButton =
        document.getElementById("whatsappOrder");

    const wishlistButton =
        document.getElementById("wishlistBtn");

    const sizeSelect =
        document.getElementById("sizeSelect");

    const colourButtons =
        document.querySelectorAll(".colour");


    /*=========================================
    FORMAT PRICE
    =========================================*/

    function formatPrice(price) {

        return "KES " +
            Number(price).toLocaleString("en-KE");

    }


    /*=========================================
    DISPLAY PRODUCT INFORMATION
    =========================================*/

    if (productName) {
        productName.textContent = product.name;
    }

    if (productBrand) {
        productBrand.textContent = product.brand;
    }

    if (productCategory) {
        productCategory.textContent = product.category;
    }

    if (productPrice) {
        productPrice.textContent =
            formatPrice(product.price);
    }

    if (productOldPrice && product.oldPrice) {
        productOldPrice.textContent =
            formatPrice(product.oldPrice);
    }

    if (productDescription) {
        productDescription.textContent =
            product.description;
    }

    if (productSKU) {
        productSKU.textContent = product.sku || "N/A";
    }


    /*=========================================
    MAIN PRODUCT IMAGE
    =========================================*/

    if (mainImage) {

        mainImage.src = product.image;
        mainImage.alt = product.name;

    }


    /*=========================================
    THUMBNAIL GALLERY
    =========================================*/

    function createThumbnails() {

        if (!thumbnailGallery) {
            return;
        }

        thumbnailGallery.innerHTML = "";

        const images =
            product.images &&
            product.images.length
                ? product.images
                : [product.image];


        images.forEach(function (image, index) {

            const thumbnail =
                document.createElement("img");

            thumbnail.src = image;

            thumbnail.alt =
                product.name +
                " thumbnail " +
                (index + 1);

            thumbnail.className =
                "thumb" +
                (index === 0 ? " active" : "");


            thumbnail.addEventListener(
                "click",
                function () {

                    if (mainImage) {

                        mainImage.src = image;

                        mainImage.alt =
                            product.name;

                    }


                    thumbnailGallery
                        .querySelectorAll(".thumb")
                        .forEach(function (item) {

                            item.classList.remove(
                                "active"
                            );

                        });


                    thumbnail.classList.add(
                        "active"
                    );

                }
            );


            thumbnailGallery.appendChild(
                thumbnail
            );

        });

    }

    createThumbnails();


    /*=========================================
    QUANTITY
    =========================================*/

    function getQuantity() {

        if (!quantityInput) {
            return 1;
        }

        let quantity =
            parseInt(
                quantityInput.value,
                10
            );


        if (
            isNaN(quantity) ||
            quantity < 1
        ) {

            quantity = 1;

        }


        if (quantity > 20) {

            quantity = 20;

        }


        quantityInput.value = quantity;

        return quantity;

    }


    if (quantityInput) {

        quantityInput.value = 1;


        quantityInput.addEventListener(
            "change",
            function () {

                getQuantity();

            }
        );


        quantityInput.addEventListener(
            "input",
            function () {

                let value =
                    parseInt(
                        quantityInput.value,
                        10
                    );


                if (isNaN(value)) {
                    return;
                }


                if (value < 1) {

                    quantityInput.value = 1;

                }


                if (value > 20) {

                    quantityInput.value = 20;

                }

            }
        );

    }


    /*=========================================
    INCREASE QUANTITY
    =========================================*/

    if (increaseQtyButton) {

        increaseQtyButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                let quantity =
                    getQuantity();


                if (quantity < 20) {

                    quantity++;

                    quantityInput.value =
                        quantity;

                }

            }
        );

    }


    /*=========================================
    DECREASE QUANTITY
    =========================================*/

    if (decreaseQtyButton) {

        decreaseQtyButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                let quantity =
                    getQuantity();


                if (quantity > 1) {

                    quantity--;

                    quantityInput.value =
                        quantity;

                }

            }
        );

    }


    /*=========================================
    CART BADGE
    =========================================*/

    function updateCartBadge() {

        if (
            typeof window.updateCartCount ===
            "function"
        ) {

            window.updateCartCount();

            return;

        }


        let cart = [];

        try {

            cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];

        } catch (error) {

            cart = [];

        }


        const total =
            cart.reduce(
                function (sum, item) {

                    return sum +
                        (Number(item.quantity) || 0);

                },
                0
            );


        document
            .querySelectorAll(
                "#cart-count,.cart-count,[data-cart-count]"
            )
            .forEach(function (element) {

                element.textContent = total;

                element.style.display =
                    total > 0
                        ? "inline-flex"
                        : "none";

            });

    }


    /*=========================================
    ADD CURRENT PRODUCT TO CART
    =========================================*/

    function addCurrentProduct(quantity) {

        quantity =
            Number(quantity) || 1;


        /*
        Try the existing cart.js function first.
        */

        if (
            typeof window.addToCart ===
            "function"
        ) {

            const result =
                window.addToCart(
                    product.id,
                    quantity
                );


            if (result !== false) {

                updateCartBadge();

                showActionMessage(
                    product.name +
                    " added to cart."
                );

                return true;

            }

        }


        /*
        Fallback cart system
        */

        let cart = [];

        try {

            cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];

        } catch (error) {

            cart = [];

        }


        const existing =
            cart.find(function (item) {

                return Number(item.id) ===
                    Number(product.id);

            });


        if (existing) {

            existing.quantity =
                (Number(existing.quantity) || 0) +
                quantity;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                price: product.price,

                oldPrice: product.oldPrice,

                image: product.image,

                quantity: quantity

            });

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        updateCartBadge();


        showActionMessage(
            product.name +
            " added to cart."
        );


        return true;

    }


    /*=========================================
    ACTION NOTIFICATION
    =========================================*/

    function showActionMessage(message) {

        let notification =
            document.getElementById(
                "productNotification"
            );


        if (!notification) {

            notification =
                document.createElement("div");

            notification.id =
                "productNotification";


            notification.style.position =
                "fixed";

            notification.style.top =
                "90px";

            notification.style.right =
                "20px";

            notification.style.zIndex =
                "9999";

            notification.style.padding =
                "14px 20px";

            notification.style.borderRadius =
                "8px";

            notification.style.background =
                "#111";

            notification.style.color =
                "#fff";

            notification.style.fontSize =
                "14px";

            notification.style.boxShadow =
                "0 8px 25px rgba(0,0,0,.2)";


            document.body.appendChild(
                notification
            );

        }


        notification.textContent =
            message;

        notification.style.display =
            "block";


        clearTimeout(
            window.productNotificationTimer
        );


        window.productNotificationTimer =
            setTimeout(
                function () {

                    notification.style.display =
                        "none";

                },
                2500
            );

    }


    /*=========================================
    ADD TO CART BUTTON
    =========================================*/

    if (addToCartButton) {

        addToCartButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const quantity =
                    getQuantity();


                if (
                    addCurrentProduct(quantity)
                ) {

                    addToCartButton.classList.add(
                        "added"
                    );


                    const originalHTML =
                        addToCartButton.innerHTML;


                    addToCartButton.innerHTML =
                        '<i class="fas fa-check"></i> Added to Cart';


                    setTimeout(
                        function () {

                            addToCartButton.innerHTML =
                                originalHTML;

                            addToCartButton.classList.remove(
                                "added"
                            );

                        },
                        1500
                    );

                }

            }
        );

    }


    /*=========================================
    BUY NOW
    =========================================*/

    if (buyNowButton) {

        buyNowButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const quantity =
                    getQuantity();


                if (
                    addCurrentProduct(quantity)
                ) {

                    window.location.href =
                        "checkout.html";

                }

            }
        );

    }


    /*=========================================
    COLOUR SELECTION
    =========================================*/

    let selectedColour = "Black";


    colourButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                colourButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                selectedColour =
                    button.dataset.colour ||
                    "Not specified";

            }
        );

    });


    /*=========================================
    GET SELECTED SIZE
    =========================================*/

    function getSelectedSize() {

        if (!sizeSelect) {
            return "Not specified";
        }


        return sizeSelect.value ||
            "Not specified";

    }


    /*=========================================
    DIRECT WHATSAPP ORDER
    =========================================*/

    if (whatsappOrderButton) {

        whatsappOrderButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const quantity =
                    getQuantity();

                const size =
                    getSelectedSize();

                const colour =
                    selectedColour;


                /*
                Require a size before ordering.
                */

                if (
                    size ===
                    "Not specified"
                ) {

                    alert(
                        "Please select a shoe size before ordering on WhatsApp."
                    );

                    if (sizeSelect) {
                        sizeSelect.focus();
                    }

                    return;

                }


                /*
                Timmy Kicks WhatsApp number
                */

                const whatsappNumber =
                    "254111711126";


                /*
                Calculate subtotal
                */

                const subtotal =
                    Number(product.price) *
                    quantity;


                /*
                Create WhatsApp message
                */

                const message =

`👟 TIMMY KICKS

NEW PRODUCT ORDER
================================

Product:
${product.name}

Brand:
${product.brand}

Category:
${product.category}

SKU:
${product.sku || "N/A"}

Price:
KES ${Number(product.price).toLocaleString("en-KE")}

Quantity:
${quantity}

Size:
${size}

Colour:
${colour}

Subtotal:
KES ${subtotal.toLocaleString("en-KE")}

================================

Please confirm product availability and delivery details.

Thank you for shopping with Timmy Kicks.`;



                /*
                Generate WhatsApp URL
                */

                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodeURIComponent(message);


                /*
                Open WhatsApp
                */

                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /*=========================================
    WISHLIST
    =========================================*/

    function getWishlist() {

        try {

            return JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        } catch (error) {

            return [];

        }

    }


    function saveWishlist(wishlist) {

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

    }


    function updateWishlistButton() {

        if (!wishlistButton) {
            return;
        }


        const wishlist =
            getWishlist();


        if (
            wishlist.includes(
                Number(product.id)
            )
        ) {

            wishlistButton.classList.add(
                "active"
            );

            wishlistButton.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            wishlistButton.classList.remove(
                "active"
            );

            wishlistButton.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    }


    if (wishlistButton) {

        updateWishlistButton();


        wishlistButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                let wishlist =
                    getWishlist();


                const id =
                    Number(product.id);


                const index =
                    wishlist.indexOf(id);


                if (index === -1) {

                    wishlist.push(id);


                    showActionMessage(
                        product.name +
                        " added to wishlist."
                    );

                } else {

                    wishlist.splice(
                        index,
                        1
                    );


                    showActionMessage(
                        product.name +
                        " removed from wishlist."
                    );

                }


                saveWishlist(
                    wishlist
                );


                updateWishlistButton();

            }
        );

    }


    /*=========================================
    PRODUCT TABS
    =========================================*/

    const tabButtons =
        document.querySelectorAll(
            ".tab-btn"
        );


    const tabContents =
        document.querySelectorAll(
            ".tab-panel"
        );


    tabButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const target =
                        button.dataset.tab;


                    if (!target) {
                        return;
                    }


                    tabButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    tabContents.forEach(
                        function (content) {

                            content.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const targetContent =
                        document.getElementById(
                            target
                        );


                    if (targetContent) {

                        targetContent.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );


    /*=========================================
    PRODUCT DATA ATTRIBUTES
    =========================================*/

    document.body.dataset.productId =
        product.id;


    if (addToCartButton) {

        addToCartButton.dataset.id =
            product.id;

    }


    if (buyNowButton) {

        buyNowButton.dataset.id =
            product.id;

    }


    /*=========================================
    UPDATE BREADCRUMB
    =========================================*/

    const breadcrumbProduct =
        document.getElementById(
            "breadcrumbProduct"
        );


    if (breadcrumbProduct) {

        breadcrumbProduct.textContent =
            product.name;

    }


    /*=========================================
    UPDATE PAGE TITLE
    =========================================*/

    const pageProductTitle =
        document.getElementById(
            "pageProductTitle"
        );


    if (pageProductTitle) {

        pageProductTitle.textContent =
            product.name;

    }


    /*=========================================
    UPDATE HERO DESCRIPTION
    =========================================*/

    const heroDescription =
        document.getElementById(
            "heroDescription"
        );


    if (
        heroDescription &&
        product.description
    ) {

        heroDescription.textContent =
            product.description;

    }


    /*=========================================
    UPDATE AVAILABILITY
    =========================================*/

    const availability =
        document.getElementById(
            "availability"
        );


    const stockBadge =
        document.getElementById(
            "stockBadge"
        );


    if (availability) {

        availability.textContent =
            product.stock > 0 ||
            product.available !== false
                ? "In Stock"
                : "Out of Stock";

    }


    if (stockBadge) {

        if (
            product.stock === 0 ||
            product.available === false
        ) {

            stockBadge.textContent =
                "Out of Stock";

            stockBadge.classList.add(
                "out-of-stock"
            );

        } else {

            stockBadge.textContent =
                "In Stock";

        }

    }


    /*=========================================
    UPDATE SPECIFICATIONS
    =========================================*/

    const specBrand =
        document.getElementById(
            "specBrand"
        );


    const specCategory =
        document.getElementById(
            "specCategory"
        );


    if (specBrand) {

        specBrand.textContent =
            product.brand;

    }


    if (specCategory) {

        specCategory.textContent =
            product.category;

    }


    /*=========================================
    UPDATE FULL DESCRIPTION
    =========================================*/

    const fullDescription =
        document.getElementById(
            "fullDescription"
        );


    if (
        fullDescription &&
        product.description
    ) {

        fullDescription.textContent =
            product.description;

    }


    /*=========================================
    YEAR
    =========================================*/

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


       updateCartBadge();


    console.log(
        "Timmy Kicks Product Details Loaded:",
        product.name,
        product.id
    );

});