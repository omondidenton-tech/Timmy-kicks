/* Checkout Module */

/* Elements */

const checkoutForm=document.getElementById("checkoutForm");
const checkoutItems=document.getElementById("checkoutSummaryItems");
const subtotalElement=document.getElementById("checkoutSubtotal");
const shippingElement=document.getElementById("checkoutShipping");
const totalElement=document.getElementById("checkoutTotal");
const paymentInstructions=document.getElementById("paymentInstructions");
const paymentMethod=document.getElementById("paymentMethod");
const confirmOrderButton=document.getElementById("confirmOrder");
const formError=document.getElementById("formError");

const SHIPPING_COST=0;


/* Cart */

function getCart(){

    return WhatsAppModule.getCartItems();

}

function calculateTotals(cart){

    const subtotal=WhatsAppModule.calculateCartTotal(cart);

    return{

        subtotal:subtotal,

        shipping:SHIPPING_COST,

        total:subtotal+SHIPPING_COST

    };

}


/* Checkout Summary */

function renderCheckoutSummary(){

    const cart=getCart();

    checkoutItems.innerHTML="";

    if(cart.length===0){

        checkoutItems.innerHTML=

        "<p class='empty-cart'>Your shopping cart is empty.</p>";

        subtotalElement.textContent="KES 0";

        shippingElement.textContent="FREE";

        totalElement.textContent="KES 0";

        return;

    }

    cart.forEach(item=>{

        const row=document.createElement("div");

        row.className="checkout-item";

        row.innerHTML=`

        <div class="checkout-item-info">

            <h4>${item.name}</h4>

            <p>Quantity: <strong>${item.quantity}</strong></p>

        </div>

        <div class="checkout-price">

            ${WhatsAppModule.formatCurrency(item.price*item.quantity)}

        </div>

        `;

        checkoutItems.appendChild(row);

    });

    const totals=calculateTotals(cart);

    subtotalElement.textContent=

    WhatsAppModule.formatCurrency(totals.subtotal);

    shippingElement.textContent=

    totals.shipping===0

    ? "FREE"

    : WhatsAppModule.formatCurrency(totals.shipping);

    totalElement.textContent=

    WhatsAppModule.formatCurrency(totals.total);

}


/* Payment */

function updatePaymentInstructions(){

    if(paymentMethod.value==="mpesa"){

        paymentInstructions.classList.remove("hidden");

    }

    else{

        paymentInstructions.classList.add("hidden");

    }

}

paymentMethod.addEventListener(

    "change",

    updatePaymentInstructions

);


/* Customer */

function getCustomer(){

    return{

        name:document.getElementById("fullName").value.trim(),

        phone:document.getElementById("phoneNumber").value.trim(),

        email:document.getElementById("email").value.trim(),

        county:document.getElementById("county").value.trim(),

        town:document.getElementById("town").value.trim(),

        address:document.getElementById("address").value.trim(),

        notes:document.getElementById("deliveryNotes").value.trim()

    };

}


/* Error */

function showError(message){

    formError.textContent=message;

    formError.style.display="block";

    formError.scrollIntoView({

        behavior:"smooth",

        block:"center"

    });

}

function clearError(){

    formError.textContent="";

    formError.style.display="none";

}
/* Validation */

function validateCheckoutForm(){

    clearError();

    const customer=getCustomer();

    if(customer.name===""){

        showError("Please enter your full name.");

        return false;

    }

    const phoneRegex=/^(?:254|0)(7\d|1\d)\d{7}$/;

    if(customer.phone===""){

        showError("Please enter your phone number.");

        return false;

    }

    if(!phoneRegex.test(customer.phone)){

        showError("Please enter a valid Kenyan phone number.");

        return false;

    }

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(customer.email===""){

        showError("Please enter your email address.");

        return false;

    }

    if(!emailRegex.test(customer.email)){

        showError("Please enter a valid email address.");

        return false;

    }

    if(customer.county===""){

        showError("Please enter your county.");

        return false;

    }

    if(customer.town===""){

        showError("Please enter your town.");

        return false;

    }

    if(customer.address===""){

        showError("Please enter your delivery address.");

        return false;

    }

    if(paymentMethod.value===""){

        showError("Please select a payment method.");

        return false;

    }

    return true;

}


/* Email */

async function sendOrderEmail(customer,cart,total){

    const orderItems=cart.map(item=>

        `${item.name} x${item.quantity} - ${WhatsAppModule.formatCurrency(item.price*item.quantity)}`

    ).join("\n");

    const templateParams={

        customer_name:customer.name,

        customer_phone:customer.phone,

        customer_email:customer.email,

        customer_county:customer.county,

        customer_town:customer.town,

        customer_address:customer.address,

        delivery_notes:customer.notes||"None",

        payment_method:paymentMethod.value,

        order_items:orderItems,

        order_total:WhatsAppModule.formatCurrency(total)

    };

    try{

        await emailjs.send(

            "abc123",

            "template_fex89fx",

            templateParams

        );

        return true;

    }

    catch(error){

        console.error("EmailJS Error:",error);

        return false;

    }

}


/* Checkout */

async function completeCheckout(){

    const customer=getCustomer();

    const cart=getCart();

    const totals=calculateTotals(cart);

    const emailSent=await sendOrderEmail(

        customer,

        cart,

        totals.total

    );

    if(!emailSent){

        showError(

            "Unable to send the order email. Please try again."

        );

        return;

    }

    const success=WhatsAppModule.completeOrder(

        customer,

        paymentMethod.value

    );

    if(!success){

        showError(

            "Unable to complete your order."

        );

        return;

    }

    checkoutForm.reset();

    paymentInstructions.classList.add("hidden");

    renderCheckoutSummary();

    alert(

        "Thank you for shopping with Timmy Kicks!\n\nYour order has been received successfully.\n\nTimmy Kicks has received your order by email.\n\nWhatsApp will now open."

    );

    window.location.href="thankyou.html";

}
/* Submit */

checkoutForm.addEventListener(

    "submit",

    async function(event){

        event.preventDefault();

        clearError();

        if(!WhatsAppModule.cartHasItems()){

            showError(

                "Your shopping cart is empty."

            );

            return;

        }

        if(!validateCheckoutForm()){

            return;

        }

        if(paymentMethod.value==="mpesa"){

            paymentInstructions.classList.remove("hidden");

            paymentInstructions.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

            return;

        }

        checkoutForm.querySelector("button[type='submit']").disabled=true;

        await completeCheckout();

        checkoutForm.querySelector("button[type='submit']").disabled=false;

    }

);


/* Confirm Payment */

confirmOrderButton.addEventListener(

    "click",

    async function(){

        clearError();

        if(!validateCheckoutForm()){

            return;

        }

        confirmOrderButton.disabled=true;

        await completeCheckout();

        confirmOrderButton.disabled=false;

    }

);


/* Initialize */

document.addEventListener(

    "DOMContentLoaded",

    function(){

        renderCheckoutSummary();

        updatePaymentInstructions();

        clearError();

    }

);


/* Module */

console.log("Timmy Kicks Checkout Module Loaded.");