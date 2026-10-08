/*
=========================================
TIMMY KICKS
Contact Page Module
File: js/contact.js
Version: 1.0
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeContactForm();

    initializeCharacterCounter();

    console.log("Timmy Kicks Contact Module Loaded.");

});


/* =====================================
   CONTACT FORM
===================================== */

function initializeContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const subject =
            document.getElementById("subject");

        const message =
            document.getElementById("message");

        if (!name.value.trim()) {

            alert("Please enter your name.");

            name.focus();

            return;

        }

        if (
            window.Validation &&
            !Validation.isEmail(email.value)
        ) {

            alert("Please enter a valid email address.");

            email.focus();

            return;

        }

        if (!subject.value.trim()) {

            alert("Please enter a subject.");

            subject.focus();

            return;

        }

        if (!message.value.trim()) {

            alert("Please enter your message.");

            message.focus();

            return;

        }

        alert("Thank you! Your message has been sent.");

        form.reset();

        updateCharacterCounter();

    });

}


/* =====================================
   CHARACTER COUNTER
===================================== */

function initializeCharacterCounter() {

    const textarea =
        document.getElementById("message");

    if (!textarea) return;

    let counter =
        document.getElementById("messageCounter");

    if (!counter) {

        counter = document.createElement("small");

        counter.id = "messageCounter";

        counter.style.display = "block";

        counter.style.marginTop = "8px";

        counter.style.color = "#888";

        textarea.parentNode.appendChild(counter);

    }

    textarea.addEventListener(

        "input",

        updateCharacterCounter

    );

    updateCharacterCounter();

}


/* =====================================
   UPDATE COUNTER
===================================== */

function updateCharacterCounter() {

    const textarea =
        document.getElementById("message");

    const counter =
        document.getElementById("messageCounter");

    if (!textarea || !counter) return;

    counter.textContent =
        `${textarea.value.length} characters`;

}