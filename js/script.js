
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // MOBILE MENU
    // ==========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            if (navLinks.classList.contains("active")) {

                menuToggle.innerHTML = '<i class="fas fa-times"></i>';

            } else {

                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

            }

        });

    }


    // ==========================================
    // STICKY HEADER EFFECT
    // ==========================================

    const header = document.querySelector(".header");

    window.addEventListener("scroll", function () {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });


    // ==========================================
    // HERO IMAGE SLIDER
    // ==========================================

    let currentSlide = 0;

    const slides = document.querySelectorAll(".hero-slide");

    const dots = document.querySelectorAll(".slider-dots span");

    function showSlide(index) {

        slides.forEach(slide => {

            slide.classList.remove("active");

        });

        dots.forEach(dot => {

            dot.classList.remove("active");

        });

        if (slides[index]) {

            slides[index].classList.add("active");

        }

        if (dots[index]) {

            dots[index].classList.add("active");

        }

    }

    if (slides.length > 0) {

        showSlide(0);

        setInterval(function () {

            currentSlide++;

            if (currentSlide >= slides.length) {

                currentSlide = 0;

            }

            showSlide(currentSlide);

        }, 5000);

        dots.forEach(function (dot, index) {

            dot.addEventListener("click", function () {

                currentSlide = index;

                showSlide(index);

            });

        });

    }


    // ==========================================
    // FLASH SALE COUNTDOWN
    // ==========================================

    const countdownDate = new Date();

    countdownDate.setDate(countdownDate.getDate() + 7);

    function updateCountdown() {

        const now = new Date().getTime();

        const distance = countdownDate - now;

        if (distance <= 0) {

            return;

        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const d = document.getElementById("days");
        const h = document.getElementById("hours");
        const m = document.getElementById("minutes");
        const s = document.getElementById("seconds");

        if (d) d.textContent = String(days).padStart(2, "0");
        if (h) h.textContent = String(hours).padStart(2, "0");
        if (m) m.textContent = String(minutes).padStart(2, "0");
        if (s) s.textContent = String(seconds).padStart(2, "0");

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);


    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {

                backToTop.style.display = "flex";

            } else {

                backToTop.style.display = "none";

            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }


    // ==========================================
    // COUNTER ANIMATION
    // ==========================================

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.dataset.target || counter.textContent.replace(/\D/g, ""));

            let count = 0;

            const increment = Math.ceil(target / 120);

            const timer = setInterval(function () {

                count += increment;

                if (count >= target) {

                    count = target;

                    clearInterval(timer);

                }

                if (counter.textContent.includes("+")) {

                    counter.textContent = count + "+";

                } else {

                    counter.textContent = count;

                }

            }, 20);

            counterObserver.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(function (counter) {

        counterObserver.observe(counter);

    });


    // ==========================================
    // SCROLL REVEAL
    // ==========================================

    const revealElements = document.querySelectorAll(

        ".product-card, .category-card, .why-card, .testimonial-card"

    );

    const revealObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    // ==========================================
    // NEWSLETTER
    // ==========================================

    const newsletterForm = document.getElementById("newsletterForm");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = newsletterForm.querySelector("input[type='email']");

            if (!email.value.trim()) {

                alert("Please enter your email.");

                return;

            }

            alert("Thank you for subscribing to Timmy Kicks!");

            newsletterForm.reset();

        });

    }


    // ==========================================
    // WHATSAPP ORDER BUTTON
    // ==========================================

    const orderButtons = document.querySelectorAll("[data-product]");

    orderButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const product = button.dataset.product;

            const price = button.dataset.price;

            const message =
                "Hello Timmy Kicks!%0A%0A" +
                "I would like to order:%0A%0A" +
                "Product: " + product + "%0A" +
                "Price: " + price + "%0A%0A" +
                "Please assist me with payment and delivery.";

            window.open(

                "https://wa.me/254111711126?text=" + message,

                "_blank"

            );

        });

    });

});