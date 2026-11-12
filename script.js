
/* =========================================
   NEXT LEVEL GAMING & ESPORTS ARENA
   FEE CALCULATOR
========================================= */

// Individual experience prices
const prices = {
    vr: 750,
    racing: 750,
    escape: 750,
    birthday: 1500
};

const feeForm = document.getElementById("feeForm");

// Format amounts in South African Rand
function formatCurrency(amount) {
    return "R" + amount.toFixed(2);
}

// Calculate discount according to bookings
function getDiscountRate(numberOfBookings) {
    if (numberOfBookings > 3) {
        return 0.15;
    }

    if (numberOfBookings === 3) {
        return 0.10;
    }

    if (numberOfBookings === 2) {
        return 0.05;
    }

    return 0;
}

// Calculate total fees
function calculateFees() {

    const fields = ["vr", "racing", "escape", "birthday"];
    const quantities = {};

    const feeError = document.getElementById("feeError");

    feeError.textContent = "";

    // Validate all quantities
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

    // Count total bookings
    const totalBookings =
        quantities.vr +
        quantities.racing +
        quantities.escape +
        quantities.birthday;

    // At least one booking is required
    if (totalBookings === 0) {

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

    // Apply booking-based discount
    const discountRate = getDiscountRate(totalBookings);

    const discount = subtotal * discountRate;

    const amountAfterDiscount = subtotal - discount;

    // Calculate VAT at 15%
    const vat = amountAfterDiscount * 0.15;

    // Calculate final estimated total
    const total = amountAfterDiscount + vat;

    // Display calculated amounts
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
