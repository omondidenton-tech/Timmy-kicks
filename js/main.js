/*
=========================================
TIMMY KICKS
Main JavaScript
=========================================
Site-wide UI functionality
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

    initializeTheme();

    initializeBackToTop();

    initializeSmoothScroll();

    initializeCurrentYear();

});


// =====================================
// MOBILE MENU
// =====================================

function initializeNavigation() {

    const menuButton =
    document.querySelector(".menu-toggle");

    const navLinks =
    document.querySelector(".nav-links");

    if (!menuButton || !navLinks) return;

    menuButton.addEventListener("click", () => {

        menuButton.classList.toggle("active");

        navLinks.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a")

    .forEach(link => {

        link.addEventListener("click", () => {

            menuButton.classList.remove("active");

            navLinks.classList.remove("active");

        });

    });

}


// =====================================
// DARK MODE
// =====================================

function initializeTheme() {

    const themeButton =
    document.getElementById("themeToggle");

    if (!themeButton) return;

    const savedTheme =
    localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeButton.innerHTML =
        '<i class="fas fa-sun"></i>';

    }

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const dark =
        document.body.classList.contains("dark-mode");

        localStorage.setItem(

            "theme",

            dark ? "dark" : "light"

        );

        themeButton.innerHTML = dark

            ? '<i class="fas fa-sun"></i>'

            : '<i class="fas fa-moon"></i>';

    });

}


// =====================================
// BACK TO TOP BUTTON
// =====================================

function initializeBackToTop() {

    const button =
    document.getElementById("backToTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.classList.add("show");

        }

        else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


// =====================================
// SMOOTH SCROLL
// =====================================

function initializeSmoothScroll() {

    document.querySelectorAll('a[href^="#"]')

    .forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const target =

            document.querySelector(

                this.getAttribute("href")

            );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}


// =====================================
// FOOTER YEAR
// =====================================

function initializeCurrentYear() {

    const year =
    document.getElementById("currentYear");

    if (!year) return;

    year.textContent =
    new Date().getFullYear();

}
// =====================================
// STICKY HEADER
// =====================================

function initializeStickyHeader() {

    const header = document.querySelector(".topbar");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.classList.add("sticky");

        } else {

            header.classList.remove("sticky");

        }

    });

}


// =====================================
// ACTIVE NAVIGATION LINK
// =====================================

function initializeActiveNavigation() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}


// =====================================
// FADE-IN ON SCROLL
// =====================================

function initializeScrollAnimations() {

    const elements = document.querySelectorAll(

        ".glass-card, .product-card, .feature-card, section"

    );

    if (!("IntersectionObserver" in window)) {

        elements.forEach(el => el.classList.add("visible"));

        return;

    }

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    elements.forEach(element => {

        element.classList.add("fade-in");

        observer.observe(element);

    });

}


// =====================================
// NEWSLETTER FORM
// =====================================

function initializeNewsletter() {

    const form = document.getElementById("newsletterForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = form.querySelector("input[type='email']");

        if (!email) return;

        if (!Validation.isEmail(email.value)) {

            alert("Please enter a valid email address.");

            return;

        }

        alert("Thank you for subscribing to Timmy Kicks!");

        form.reset();

    });

}


// =====================================
// LOADING ANIMATION
// =====================================

function initializePageLoader() {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    window.addEventListener("load", () => {

        loader.classList.add("hide");

        setTimeout(() => {

            loader.remove();

        }, 500);

    });

}


// =====================================
// UPDATE CART BADGE
// =====================================

function updateCartBadge() {

    const badge = document.getElementById("cartCount");

    if (!badge) return;

    let count = 0;

    try {

        if (
            window.WhatsAppModule &&
            typeof WhatsAppModule.getCartCount === "function"
        ) {

            count = WhatsAppModule.getCartCount();

        } else {

            const cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            count = cart.reduce(

                (total, item) => total + item.quantity,

                0

            );

        }

    } catch (error) {

        count = 0;

    }

    badge.textContent = count;

}


// =====================================
// INITIALIZE REMAINING FEATURES
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    initializeStickyHeader();

    initializeActiveNavigation();

    initializeScrollAnimations();

    initializeNewsletter();

    initializePageLoader();

    updateCartBadge();

});


// =====================================
// GLOBAL FUNCTIONS
// =====================================

window.updateCartBadge = updateCartBadge;

console.log("Timmy Kicks Main Module Loaded.");