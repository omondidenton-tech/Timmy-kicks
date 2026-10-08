/*
=========================================
TIMMY KICKS
About Page Module
File: js/about.js
Version: 1.0
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeAboutPage();

});


/* =====================================
   ABOUT PAGE INITIALIZATION
===================================== */

function initializeAboutPage() {

    initializeCounters();

    initializeTeamCards();

    initializeMissionAnimation();

    console.log("Timmy Kicks About Module Loaded.");

}


/* =====================================
   ANIMATED COUNTERS
===================================== */

function initializeCounters() {

    const counters = document.querySelectorAll("[data-counter]");

    if (!counters.length) return;

    counters.forEach(counter => {

        const target = parseInt(counter.dataset.counter, 10);

        if (isNaN(target)) return;

        let value = 0;

        const increment = Math.max(1, Math.ceil(target / 100));

        const timer = setInterval(() => {

            value += increment;

            if (value >= target) {

                value = target;

                clearInterval(timer);

            }

            counter.textContent = value;

        }, 20);

    });

}


/* =====================================
   TEAM CARD HOVER EFFECT
===================================== */

function initializeTeamCards() {

    const cards = document.querySelectorAll(".team-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("active");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("active");

        });

    });

}


/* =====================================
   MISSION / VALUES ANIMATION
===================================== */

function initializeMissionAnimation() {

    const items = document.querySelectorAll(

        ".about-card, .mission-card, .value-card"

    );

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.2

    });

    items.forEach(item => {

        item.classList.add("fade-in");

        observer.observe(item);

    });

}