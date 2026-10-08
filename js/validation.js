/*
=========================================
TIMMY KICKS
Validation Module
=========================================
Reusable validation functions
=========================================
*/

// =====================================
// VALIDATION OBJECT
// =====================================

const Validation = {

    // ============================
    // Required Field
    // ============================

    isRequired(value) {

        return value.trim() !== "";

    },

    // ============================
    // Email
    // ============================

    isEmail(email) {

        const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(email.trim());

    },

    // ============================
    // Kenyan Phone
    // ============================

    isKenyanPhone(phone) {

        const pattern =
        /^(?:254|0)(7\d|1\d)\d{7}$/;

        return pattern.test(phone.trim());

    },

    // ============================
    // Name
    // ============================

    isName(name) {

        const pattern =
        /^[A-Za-z ]{2,100}$/;

        return pattern.test(name.trim());

    },

    // ============================
    // Minimum Length
    // ============================

    minLength(value, length) {

        return value.trim().length >= length;

    },

    // ============================
    // Maximum Length
    // ============================

    maxLength(value, length) {

        return value.trim().length <= length;

    },

    // ============================
    // Number
    // ============================

    isNumber(value) {

        return !isNaN(value);

    },

    // ============================
    // Positive Number
    // ============================

    isPositive(value) {

        return Number(value) > 0;

    },

    // ============================
    // Empty Check
    // ============================

    isEmpty(value) {

        return value.trim() === "";

    }

};
// =====================================
// SHOW ERROR
// =====================================

Validation.showError = function (input, message) {

    input.classList.add("input-error");

    let error = input.parentElement.querySelector(".field-error");

    if (!error) {

        error = document.createElement("small");

        error.className = "field-error";

        input.parentElement.appendChild(error);

    }

    error.textContent = message;

};


// =====================================
// CLEAR ERROR
// =====================================

Validation.clearError = function (input) {

    input.classList.remove("input-error");

    const error = input.parentElement.querySelector(".field-error");

    if (error) {

        error.remove();

    }

};


// =====================================
// VALIDATE REQUIRED FIELD
// =====================================

Validation.validateRequired = function (

    input,

    message = "This field is required."

) {

    if (!Validation.isRequired(input.value)) {

        Validation.showError(input, message);

        return false;

    }

    Validation.clearError(input);

    return true;

};


// =====================================
// VALIDATE EMAIL
// =====================================

Validation.validateEmail = function (input) {

    if (!Validation.isEmail(input.value)) {

        Validation.showError(

            input,

            "Please enter a valid email address."

        );

        return false;

    }

    Validation.clearError(input);

    return true;

};


// =====================================
// VALIDATE PHONE
// =====================================

Validation.validatePhone = function (input) {

    if (!Validation.isKenyanPhone(input.value)) {

        Validation.showError(

            input,

            "Enter a valid Kenyan phone number."

        );

        return false;

    }

    Validation.clearError(input);

    return true;

};


// =====================================
// VALIDATE NAME
// =====================================

Validation.validateName = function (input) {

    if (!Validation.isName(input.value)) {

        Validation.showError(

            input,

            "Please enter a valid name."

        );

        return false;

    }

    Validation.clearError(input);

    return true;

};


// =====================================
// LIVE VALIDATION
// =====================================

Validation.enableLiveValidation = function (form) {

    if (!form) return;

    const fields = form.querySelectorAll(

        "input, textarea, select"

    );

    fields.forEach(field => {

        field.addEventListener("input", () => {

            Validation.clearError(field);

        });

    });

};


// =====================================
// VALIDATE ENTIRE FORM
// =====================================

Validation.validateForm = function (form) {

    let valid = true;

    const requiredFields = form.querySelectorAll(

        "[required]"

    );

    requiredFields.forEach(field => {

        if (

            !Validation.validateRequired(field)

        ) {

            valid = false;

        }

    });

    return valid;

};


// =====================================
// GLOBAL ACCESS
// =====================================

window.Validation = Validation;


// =====================================
// INITIALIZATION
// =====================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        const forms =

        document.querySelectorAll("form");

        forms.forEach(form => {

            Validation.enableLiveValidation(form);

        });

        console.log(

            "Validation Module Loaded."

        );

    }

);