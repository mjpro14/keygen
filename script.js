const SECRET_SALT = "MJDEV";


function generateKey() {
    let mac = document
        .getElementById("macInput")
        .value
        .trim()
        .toUpperCase();

    // Remove colons from MAC address
    mac = mac.replace(/:/g, "");

    if (mac === "") {
        alert("Pakilagay ang MAC Address / Device ID ng user!");
        return;
    }

    // Combine MAC + Secret Salt
    const combinedString = mac + SECRET_SALT;

    // Generate MD5 hash
    const hash = CryptoJS
        .MD5(combinedString)
        .toString()
        .toUpperCase();

    // Get first 10 characters
    const finalKey = hash.substring(0, 10);

    // Display generated key
    document.getElementById("generatedKey").innerText = finalKey;

    document.getElementById("resultArea").style.display = "block";
}


function copyKey() {
    const keyText = document
        .getElementById("generatedKey")
        .innerText;

    navigator.clipboard.writeText(keyText)
        .then(() => {
            alert("Na-copy na ang Key: " + keyText);
        })
        .catch(() => {
            alert("Hindi ma-copy ang key. Please copy it manually.");
        });
}
