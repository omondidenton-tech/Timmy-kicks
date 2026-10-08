
const STORE = {

    name: "Timmy Kicks",

    whatsapp: "254111711126",

    currency: "KES",

    paymentNumber: "0111711126"

};


// =========================================
// DATE & TIME
// =========================================

function getCurrentDateTime() {

    const now = new Date();

    return now.toLocaleString("en-KE", {

        weekday: "long",

        year: "numeric",

        month: "long",

        day: "numeric",

        hour: "2-digit",

        minute: "2-digit"

    });

}


// =========================================
// FORMAT CURRENCY
// =========================================

function formatCurrency(amount) {

    return STORE.currency + " " +

    Number(amount).toLocaleString();

}


// =========================================
// GET CART
// =========================================

function getCartItems() {

    return JSON.parse(

        localStorage.getItem("cart")

    ) || [];

}


// =========================================
// CALCULATE TOTAL
// =========================================

function calculateCartTotal(cart) {

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

    });

    return total;

}


// =========================================
// FORMAT CUSTOMER DETAILS
// =========================================

function formatCustomer(customer) {

    return `

👤 CUSTOMER DETAILS

Name:
${customer.name}

Phone:
${customer.phone}

Email:
${customer.email}

County:
${customer.county}

Town:
${customer.town}

Address:
${customer.address}

Delivery Notes:
${customer.notes || "None"}

`;

}


// =========================================
// FORMAT PRODUCTS
// =========================================

function formatProducts(cart) {

    let output = "";

    cart.forEach((item, index) => {

        output +=

`${index + 1}. ${item.name}

Price:
${formatCurrency(item.price)}

Quantity:
${item.quantity}

Subtotal:
${formatCurrency(item.price * item.quantity)}

--------------------------------

`;

    });

    return output;

}


// =========================================
// FORMAT TOTALS
// =========================================

function formatTotals(cart) {

    const subtotal = calculateCartTotal(cart);

    const shipping = 0;

    const total = subtotal + shipping;

    return `

Subtotal:
${formatCurrency(subtotal)}

Shipping:
${formatCurrency(shipping)}

TOTAL:
${formatCurrency(total)}

`;

}


// =========================================
// PAYMENT DETAILS
// =========================================

function formatPayment(method) {

    let paymentText =

"\n💳 PAYMENT METHOD\n";

    paymentText +=

"--------------------------------\n\n";

    if(method === "mpesa"){

        paymentText +=

`M-Pesa

Send Money Number:

${STORE.paymentNumber}

`;

    }

    else{

        paymentText +=

"Cash on Delivery";

    }

    return paymentText;

}


// =========================================
// CREATE ORDER MESSAGE
// =========================================

function buildWhatsAppMessage(customer, paymentMethod) {

    const cart = getCartItems();

    const total = calculateCartTotal(cart);

    let message =

`👟 ${STORE.name}

NEW CUSTOMER ORDER

================================

Order Date

${getCurrentDateTime()}

================================

`;

    message += formatCustomer(customer);

    message +=

"\n🛒 ORDER ITEMS\n";

    message +=

"================================\n\n";

    message += formatProducts(cart);

    message +=

"\n================================";

    message += formatTotals(cart);

    message += formatPayment(paymentMethod);

    message +=

`

Grand Total

${formatCurrency(total)}

Thank you for shopping
with Timmy Kicks.

`;

    return message;

}
// =========================================
// GENERATE WHATSAPP URL
// =========================================

function generateWhatsAppURL(message) {

    return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;

}


// =========================================
// OPEN WHATSAPP
// =========================================

function openWhatsApp(message) {

    const url = generateWhatsAppURL(message);

    window.open(url, "_blank");

}


// =========================================
// SEND CUSTOMER ORDER
// =========================================

function sendWhatsAppOrder(customer, paymentMethod) {

    const cart = getCartItems();

    if (cart.length === 0) {

        alert("Your shopping cart is empty.");

        return false;

    }

    const message = buildWhatsAppMessage(
        customer,
        paymentMethod
    );

    openWhatsApp(message);

    return true;

}


// =========================================
// CLEAR CART
// =========================================

function clearCartAfterOrder() {

    localStorage.removeItem("cart");

    if (typeof updateCartCount === "function") {

        updateCartCount();

    }

}


// =========================================
// COMPLETE ORDER
// =========================================

function completeOrder(customer, paymentMethod) {

    const sent = sendWhatsAppOrder(

        customer,

        paymentMethod

    );

    if (!sent) {

        return false;

    }

    clearCartAfterOrder();

    return true;

}


// =========================================
// CHECK IF CART HAS ITEMS
// =========================================

function cartHasItems() {

    return getCartItems().length > 0;

}


// =========================================
// GET CART COUNT
// =========================================

function getCartCount() {

    return getCartItems().reduce(

        (count, item) => count + item.quantity,

        0

    );

}


// GET CART TOTAL// 

function getCartGrandTotal() {

    return calculateCartTotal(

        getCartItems()

    );

}



window.WhatsAppModule = {

    STORE,

    getCartItems,

    cartHasItems,

    getCartCount,

    getCartGrandTotal,

    formatCurrency,

    calculateCartTotal,

    buildWhatsAppMessage,

    sendWhatsAppOrder,

    completeOrder,

    clearCartAfterOrder

};



document.addEventListener("DOMContentLoaded", () => {

    console.log("Timmy Kicks WhatsApp Module Loaded.");

});