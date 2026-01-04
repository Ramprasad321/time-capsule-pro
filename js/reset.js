function resetPassword() {
    const newPass = document.getElementById("newPass").value.trim();
    const confirmPass = document.getElementById("confirmPass").value.trim();

    if (!newPass || !confirmPass) {
        alert("Fill all fields");
        return;
    }

    if (newPass !== confirmPass) {
        alert("Passwords do not match");
        return;
    }

    const resetEmail = localStorage.getItem("resetEmail");
    if (!resetEmail) {
        alert("Session expired");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u =>
        u.email === resetEmail ? { ...u, password: newPass } : u
    );

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("resetEmail");

    alert("Password reset successful!");
    window.location.href = "login.html";
}
