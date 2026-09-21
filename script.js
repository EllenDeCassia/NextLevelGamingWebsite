/* =========================================
   NEXT LEVEL GAMING & ESPORTS ARENA
   FEE CALCULATOR
========================================= */


function calculateFees() {

    // EXPERIENCE PRICES

    const VR_PRICE = 750;
    const RACING_PRICE = 750;
    const ESCAPE_PRICE = 750;
    const BIRTHDAY_PRICE = 1500;


    // GET QUANTITIES

    const vr = Number(
        document.getElementById("vr").value
    );

    const racing = Number(
        document.getElementById("racing").value
    );

    const escape = Number(
        document.getElementById("escape").value
    );

    const birthday = Number(
        document.getElementById("birthday").value
    );


    // CALCULATE SUBTOTAL

    const subtotal =
        (vr * VR_PRICE) +
        (racing * RACING_PRICE) +
        (escape * ESCAPE_PRICE) +
        (birthday * BIRTHDAY_PRICE);


    // CALCULATE DISCOUNT

    let discount = 0;

    if (subtotal >= 3000) {

        discount = subtotal * 0.10;

    }


    // AMOUNT AFTER DISCOUNT

    const amountAfterDiscount =
        subtotal - discount;


    // CALCULATE VAT

    const vat =
        amountAfterDiscount * 0.15;


    // CALCULATE TOTAL

    const total =
        amountAfterDiscount + vat;


    // DISPLAY RESULTS

    document.getElementById("subtotal").textContent =
        "R" + subtotal.toFixed(2);

    document.getElementById("discount").textContent =
        "R" + discount.toFixed(2);

    document.getElementById("vat").textContent =
        "R" + vat.toFixed(2);

    document.getElementById("total").textContent =
        "R" + total.toFixed(2);

}