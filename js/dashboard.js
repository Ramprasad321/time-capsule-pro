// CHECK LOGIN
const user = JSON.parse(localStorage.getItem("timeCapsuleUser"));
if (!user) {
    window.location.href = "login.html";
}
document.getElementById("welcomeText").innerText =
    ` Hello Welcome, ${user.name} ✨`;

// NAVIGATION
function goCreate() {
    window.location.href = "create.html";
}
function goManage() {
    window.location.href = "manage.html";
}
function goOpen() {
    window.location.href = "open.html";
}


// LOGOUT
function logout() {
    localStorage.removeItem("timeCapsuleUser");
    window.location.href = "index.html";
}
