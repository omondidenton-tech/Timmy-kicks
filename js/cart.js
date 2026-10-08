/*=================================
    TIMMY KICKS CART SYSTEM
=================================*/

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/*=================================
PRODUCT DATABASE CHECK
=================================*/

// Prevent errors if products.js is missing
if (typeof products === "undefined") {
    console.error("products.js must be loaded before cart.js");
}

/*=================================
DOM ELEMENTS
=================================*/

const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");

const cartBadge =
    document.querySelector(".cart-count") ||
    document.getElementById("cart-count");

/*=================================
SAVE CART
=================================*/

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

/*=================================
UPDATE CART BADGE
=================================*/

function updateCartBadge(){

    if(!cartBadge) return;

    const totalItems = cart.reduce(function(total,item){

        return total + item.quantity;

    },0);

    cartBadge.textContent = totalItems;

}

/*=================================
ADD PRODUCT TO CART
=================================*/

function addToCart(productId){

    productId = Number(productId);

    const product = products.find(function(item){

        return item.id === productId;

    });

    if(!product){

        alert("Product not found.");

        return;

    }

    const existing = cart.find(function(item){

        return item.id === productId;

    });

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1,

            size: "Default"

        });

    }

    saveCart();

    updateCartBadge();

    if(typeof renderCart === "function"){

        renderCart();

    }

    alert(product.name + " added to cart.");

}

/*=================================
HOME PAGE / PRODUCTS PAGE
ADD TO CART BUTTONS
=================================*/

document.addEventListener("click",function(e){

    const button = e.target.closest(".cart-btn");

    if(!button) return;

    const id = button.dataset.id;

    if(!id){

        console.error("Missing data-id on cart button.");

        return;

    }

    addToCart(id);

});
/*=================================
RENDER CART
=================================*/

function renderCart(){

    if(!cartItems) return;

    cartItems.innerHTML="";

    if(cart.length===0){

        if(emptyCart){

            emptyCart.style.display="block";

        }

        updateCartBadge();

        updateTotals();

        return;

    }

    if(emptyCart){

        emptyCart.style.display="none";

    }

    cart.forEach(function(item,index){

        const row=document.createElement("tr");

        row.innerHTML=`

        <td>

            <div class="cart-product">

                <img src="${item.image}" alt="${item.name}">

                <div>

                    <h4>${item.name}</h4>

                    <small>Size: ${item.size}</small>

                </div>

            </div>

        </td>

        <td>

            KES ${item.price.toLocaleString()}

        </td>

        <td>

            <div class="quantity-box">

                <button
                class="qty-btn minus-btn"
                data-index="${index}">

                −

                </button>

                <input
                class="qty-input"
                type="text"
                readonly
                value="${item.quantity}">

                <button
                class="qty-btn plus-btn"
                data-index="${index}">

                +

                </button>

            </div>

        </td>

        <td>

            KES ${(item.price*item.quantity).toLocaleString()}

        </td>

        <td>

            <button
            class="remove-btn"
            data-index="${index}">

                <i class="fas fa-trash"></i>

            </button>

        </td>

        `;

        cartItems.appendChild(row);

    });

    updateCartBadge();

    updateTotals();

}


/*=================================
QUANTITY CONTROLS
=================================*/

function increaseQuantity(index){

    cart[index].quantity++;

    saveCart();

    renderCart();

}

function decreaseQuantity(index){

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }else{

        removeItem(index);

        return;

    }

    saveCart();

    renderCart();

}


/*=================================
REMOVE ITEM
=================================*/

function removeItem(index){

    if(!confirm(
        `Remove "${cart[index].name}" from your cart?`
    )){

        return;

    }

    cart.splice(index,1);

    saveCart();

    renderCart();

}


/*=================================
CLEAR CART
=================================*/

function clearCart(){

    if(!confirm(
        "Clear your shopping cart?"
    )){

        return;

    }

    cart=[];

    saveCart();

    renderCart();

}


/*=================================
EVENT DELEGATION
=================================*/

document.addEventListener("click",function(e){

    const plus=e.target.closest(".plus-btn");

    if(plus){

        increaseQuantity(
            Number(plus.dataset.index)
        );

        return;

    }

    const minus=e.target.closest(".minus-btn");

    if(minus){

        decreaseQuantity(
            Number(minus.dataset.index)
        );

        return;

    }

    const remove=e.target.closest(".remove-btn");

    if(remove){

        removeItem(
            Number(remove.dataset.index)
        );

    }

});


/*=================================
CART TOTALS
=================================*/

let couponDiscount=0;

function calculateSubtotal(){

    return cart.reduce(function(total,item){

        return total+(item.price*item.quantity);

    },0);

}

function calculateDelivery(subtotal){

    if(subtotal===0){

        return 0;

    }

    return 0;

}

function updateTotals(){

    const subtotal=calculateSubtotal();

    const delivery=calculateDelivery(subtotal);

    const discount=
    (subtotal*couponDiscount)/100;

    const grandTotal=
    subtotal+delivery-discount;

    const subtotalElement=
    document.getElementById("subtotal");

    const deliveryElement=
    document.getElementById("delivery");

    const discountElement=
    document.getElementById("discount");

    const grandTotalElement=
    document.getElementById("grandTotal");

    if(subtotalElement){

        subtotalElement.textContent=
        "KES "+subtotal.toLocaleString();

    }

    if(deliveryElement){

        deliveryElement.textContent=
        delivery===0
        ? "FREE"
        : "KES "+delivery.toLocaleString();

    }

    if(discountElement){

        discountElement.textContent=
        "KES "+discount.toLocaleString();

    }

    if(grandTotalElement){

        grandTotalElement.textContent=
        "KES "+grandTotal.toLocaleString();

    }

    localStorage.setItem(

        "orderSummary",

        JSON.stringify({

            subtotal,

            delivery,

            discount,

            total:grandTotal

        })

    );

}
/*=================================
COUPON CODES
=================================*/

const coupons = {

    "WELCOME10":10,
    "TIMMY5":5,
    "FREESHIP":0

};

function applyCoupon(){

    const input = document.getElementById("coupon");
    const message = document.getElementById("couponMessage");

    if(!input || !message) return;

    const code = input.value.trim().toUpperCase();

    if(code===""){

        couponDiscount = 0;

        message.style.color="red";
        message.textContent="Please enter a coupon code.";

        updateTotals();

        return;

    }

    if(coupons.hasOwnProperty(code)){

        couponDiscount = coupons[code];

        message.style.color="green";

        if(code==="FREESHIP"){

            message.textContent="Free delivery applied.";

        }else{

            message.textContent =
            couponDiscount + "% discount applied successfully.";

        }

    }else{

        couponDiscount = 0;

        message.style.color="red";
        message.textContent="Invalid coupon code.";

    }

    updateTotals();

}


/*=================================
PROCEED TO CHECKOUT
=================================*/

function proceedToCheckout(){

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    const subtotal = calculateSubtotal();

    const delivery = calculateDelivery(subtotal);

    const discount =
    (subtotal * couponDiscount) / 100;

    const grandTotal =
    subtotal + delivery - discount;

    const order = {

        items: cart,

        subtotal: subtotal,

        delivery: delivery,

        discount: discount,

        total: grandTotal,

        createdAt: new Date().toISOString()

    };

    localStorage.setItem(

        "currentOrder",

        JSON.stringify(order)

    );

    window.location.href = "checkout.html";

}


/*=================================
BUTTON EVENTS
=================================*/

const applyCouponBtn =
document.getElementById("applyCoupon");

if(applyCouponBtn){

    applyCouponBtn.addEventListener(

        "click",

        applyCoupon

    );

}

const checkoutBtn =
document.querySelector(".checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener(

        "click",

        function(e){

            e.preventDefault();

            proceedToCheckout();

        }

    );

}


/*=================================
ENTER KEY SUPPORT
=================================*/

const couponInput =
document.getElementById("coupon");

if(couponInput){

    couponInput.addEventListener(

        "keydown",

        function(e){

            if(e.key==="Enter"){

                e.preventDefault();

                applyCoupon();

            }

        }

    );

}


/*=================================
HELPER FUNCTIONS
=================================*/

function getCart(){

    return cart;

}

function getCartCount(){

    return cart.reduce(function(total,item){

        return total + item.quantity;

    },0);

}

function isCartEmpty(){

    return cart.length===0;

}


/*=================================
INITIALIZE CART
=================================*/

document.addEventListener("DOMContentLoaded",function(){

    updateCartBadge();

    if(typeof renderCart==="function"){

        renderCart();

    }

    if(typeof updateTotals==="function"){

        updateTotals();

    }

});


/*=================================
GLOBAL FUNCTIONS
=================================*/

window.addToCart = addToCart;
window.renderCart = renderCart;
window.clearCart = clearCart;
window.getCart = getCart;
window.getCartCount = getCartCount;
window.isCartEmpty = isCartEmpty;