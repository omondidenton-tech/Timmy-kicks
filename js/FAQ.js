/*
=========================================
TIMMY KICKS
FAQ Module
File: js/faq.js
Version: 2.0
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeFAQAccordion();

    initializeFAQSearch();

    initializeKeyboardSupport();

});


/* =====================================
   FAQ ACCORDION
===================================== */

function initializeFAQAccordion() {

    const faqs = document.querySelectorAll(".faq");

    faqs.forEach(faq => {

        const button = faq.querySelector(".question");

        const answer = faq.querySelector(".answer");

        if (!button || !answer) return;

        button.setAttribute("aria-expanded", "false");

        answer.setAttribute("aria-hidden", "true");

        button.addEventListener("click", () => {

            const isActive = faq.classList.contains("active");

            // Close all FAQs
            faqs.forEach(item => {

                item.classList.remove("active");

                const q = item.querySelector(".question");
                const a = item.querySelector(".answer");

                if (q) q.setAttribute("aria-expanded", "false");
                if (a) a.setAttribute("aria-hidden", "true");

            });

            // Open selected FAQ
            if (!isActive) {

                faq.classList.add("active");

                button.setAttribute("aria-expanded", "true");

                answer.setAttribute("aria-hidden", "false");

            }

        });

    });

}


/* =====================================
   FAQ SEARCH
===================================== */

function initializeFAQSearch() {

    const searchInput =
        document.getElementById("faqSearch");

    if (!searchInput) return;

    const faqItems =
        document.querySelectorAll(".faq");

    let noResults =
        document.getElementById("faqNoResults");

    if (!noResults) {

        noResults = document.createElement("p");

        noResults.id = "faqNoResults";

        noResults.textContent =
            "No matching questions found.";

        noResults.style.display = "none";

        noResults.style.textAlign = "center";

        noResults.style.marginTop = "20px";

        noResults.style.color = "#888";

        searchInput.parentElement.appendChild(noResults);

    }

    searchInput.addEventListener("input", function () {

        const value =
            this.value.toLowerCase().trim();

        let matches = 0;

        faqItems.forEach(faq => {

            const text =
                faq.textContent.toLowerCase();

            if (text.includes(value)) {

                faq.style.display = "";

                matches++;

            } else {

                faq.style.display = "none";

            }

        });

        noResults.style.display =
            matches === 0 ? "block" : "none";

    });

}


/* =====================================
   KEYBOARD ACCESSIBILITY
===================================== */

function initializeKeyboardSupport() {

    document.querySelectorAll(".question")

    .forEach(button => {

        button.addEventListener("keydown", event => {

            if (

                event.key === "Enter" ||

                event.key === " "

            ) {

                event.preventDefault();

                button.click();

            }

        });

    });

}


/* =====================================
   OPEN FAQ FROM URL HASH
   Example:
   faq.html#delivery
===================================== */

function openFAQFromHash() {

    const hash =
        window.location.hash.replace("#", "");

    if (!hash) return;

    const target =
        document.getElementById(hash);

    if (!target) return;

    if (target.classList.contains("faq")) {

        const button =
            target.querySelector(".question");

        if (button) {

            button.click();

            target.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }

    }

}

window.addEventListener("load", openFAQFromHash);


/* =====================================
   FAQ STATISTICS
===================================== */

function getFAQCount() {

    return document.querySelectorAll(".faq").length;

}

console.log(

    `Timmy Kicks FAQ Module Loaded (${getFAQCount()} FAQs)`

);