/*
Email Module
*/

function sendOrderEmail(customer,cart,total,payment){

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

        payment_method:payment.toUpperCase(),

        order_items:orderItems,

        order_total:WhatsAppModule.formatCurrency(total)

    };

    return emailjs.send(

        "abc123",

        "template_fex89fx",

        templateParams

    );

}