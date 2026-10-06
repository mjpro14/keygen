/* =====================================================
   SELLER ACTIVATION CONFIG
===================================================== */
const SELLERACTIVATIONCODE = "SELLER-MJDEV-2026";
const SELLERSTORAGEKEY = "frpSellerActivated";
const SECRET_SALT = "MJDEV";

/* =====================================================
   CHECK SAVED ACTIVATION ON LOAD
===================================================== */
window.addEventListener("DOMContentLoaded", function () {
    checkActivationState();

    // Trigger activation on Enter key in input
    const sellerInput = document.getElementById("sellerCode");
    if (sellerInput) {
        sellerInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                activateSeller();
            }
        });
    }

    // Trigger generation on Enter key in MAC input
    const macInput = document.getElementById("macInput");
    if (macInput) {
        macInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                generateKey();
            }
        });
    }
});

function checkActivationState() {
    const isActivated = localStorage.getItem(SELLERSTORAGEKEY) === "true";
    const modal = document.getElementById("sellerModal");
    const badge = document.getElementById("sellerBadge");

    if (isActivated) {
        modal.style.display = "none";
        badge.style.display = "flex";
    } else {
        modal.style.display = "flex";
        badge.style.display = "none";
    }
}

/* =====================================================
   ACTIVATE SELLER
===================================================== */
function activateSeller() {
    const input = document.getElementById("sellerCode");
    const error = document.getElementById("sellerError");
    const success = document.getElementById("sellerSuccess");
    const enteredCode = input.value.trim().toUpperCase();

    error.style.display = "none";
    success.style.display = "none";

    if (enteredCode === "") {
        error.innerText = "Please enter your activation code.";
        error.style.display = "block";
        return;
    }

    if (enteredCode === SELLERACTIVATIONCODE) {
        // Permanently save to LocalStorage
        localStorage.setItem(SELLERSTORAGEKEY, "true");
        success.style.display = "block";

        setTimeout(function () {
            checkActivationState();
            input.value = "";
            showToast("Seller Activated Successfully!");
        }, 600);
    } else {
        error.innerText = "Invalid activation code.";
        error.style.display = "block";
    }
}

/* =====================================================
   LOCK / RESET SELLER ACTIVATION
===================================================== */
function lockSeller() {
    if (confirm("Gusto mo bang i-lock ulit ang Seller Activation?")) {
        localStorage.removeItem(SELLERSTORAGEKEY);
        checkActivationState();
        showToast("Seller account locked.");
    }
}

/* =====================================================
   ORIGINAL KEY GENERATOR
===================================================== */
function generateKey() {
    let mac = document.getElementById("macInput").value.trim().toUpperCase();
    mac = mac.replace(/:/g, "");

    if (mac === "") {
        showToast("Pakilagay ang MAC Address / Device ID!");
        return;
    }

    let combinedString = mac + SECRET_SALT;
    let hash = CryptoJS.MD5(combinedString).toString().toUpperCase();
    let finalKey = hash.substring(0, 10);

    document.getElementById("generatedKey").innerText = finalKey;
    document.getElementById("resultArea").style.display = "block";
}

/* =====================================================
   COPY KEY TO CLIPBOARD
===================================================== */
function copyKey() {
    let keyText = document.getElementById("generatedKey").innerText;
    if (!keyText) return;

    navigator.clipboard.writeText(keyText).then(function () {
        showToast("Key copied: " + keyText);
    }).catch(function () {
        showToast("Failed to copy key.");
    });
}

/* =====================================================
   CUSTOM TOAST NOTIFICATION
===================================================== */
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2500);
}
