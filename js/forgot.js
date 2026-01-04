function verifyEmail() {
    const email = document.getElementById("fpEmail").value.trim();

    if (!email) {
        alert("Enter email");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === email);

    if (!exists) {
        alert("Email not registered");
        return;
    }

    localStorage.setItem("resetEmail", email);
    window.location.href = "reset.html";
}
