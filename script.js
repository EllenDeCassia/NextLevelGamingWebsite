
/* =========================================
   NEXT LEVEL FEE CALCULATOR
========================================= */

const prices = {
    vr: 750,
    racing: 750,
    escape: 750,
    birthday: 1500
};

const feeForm = document.getElementById("feeForm");

function calculateFees() {

    const quantities = {};
    const fields = ["vr", "racing", "escape", "birthday"];

    const feeError = document.getElementById("feeError");

    feeError.textContent = "";

    // Validate quantities

    for (const field of fields) {

        const input = document.getElementById(field);
        const value = input.value.trim();
        const quantity = Number(value);

        if (
            value === "" ||
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {

            feeError.textContent =
                "Please enter valid whole-number quantities of zero or more.";

            feeError.style.color = "#ff6b6b";

            input.focus();
            return;
        }

        quantities[field] = quantity;
    }

    // Require at least one experience

    const totalQuantity =
        quantities.vr +
        quantities.racing +
        quantities.escape +
        quantities.birthday;

    if (totalQuantity === 0) {

        feeError.textContent =
            "Please select at least one experience.";

        feeError.style.color = "#ff6b6b";
        return;
    }

    // Calculate subtotal

    const subtotal =
        quantities.vr * prices.vr +
        quantities.racing * prices.racing +
        quantities.escape * prices.escape +
        quantities.birthday * prices.birthday;

    // Apply discount

    let discount = 0;

    if (subtotal >= 3000) {
        discount = subtotal * 0.10;
    }

    // Calculate VAT and total

    const amountAfterDiscount = subtotal - discount;

    const vat = amountAfterDiscount * 0.15;

    const total = amountAfterDiscount + vat;

    // Format currency

    function formatCurrency(amount) {
        return "R" + amount.toFixed(2);
    }

    // Display results

    document.getElementById("subtotal").textContent =
        formatCurrency(subtotal);

    document.getElementById("discount").textContent =
        formatCurrency(discount);

    document.getElementById("vat").textContent =
        formatCurrency(vat);

    document.getElementById("total").textContent =
        formatCurrency(total);
}

// Handle form submission

if (feeForm) {

    feeForm.addEventListener("submit", function(event) {

        event.preventDefault();

        calculateFees();

    });
}
