console.log("Time Capsule Landing Page Loaded");
// HOME PAGE BUTTONS ONLY
document.getElementById("btnLogin")?.addEventListener("click", () => {
    window.location.href = "login.html";
});

document.getElementById("btnRegister")?.addEventListener("click", () => {
    window.location.href = "register.html";
});
