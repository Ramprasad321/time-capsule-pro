// CHECK LOGIN
const user = JSON.parse(localStorage.getItem("timeCapsuleUser"));
if (!user) {
    window.location.href = "login.html";
}

const capsuleList = document.getElementById("capsuleList");

// GET ALL CAPSULES
let capsules = JSON.parse(localStorage.getItem("capsules")) || [];

// FILTER LOGGED-IN USER CAPSULES
const myCapsules = capsules.filter(c => c.createdBy === user.email);

// EMPTY STATE
if (myCapsules.length === 0) {
    capsuleList.innerHTML = `
        <p class="text-center" empty-msg">
            No capsules created yet!
        </p>
    `;
}

// CURRENT DATE
const today = new Date().toISOString().split("T")[0];

// DISPLAY CAPSULES
myCapsules.forEach(capsule => {

    // 🔴 THIS LINE WAS MISSING EARLIER
    const col = document.createElement("div");
    col.className = "col-md-4";

    const status = today >= capsule.openDate
    ? "Unlocked 🔓"
    : "Locked 🔒";

const cardClass = today >= capsule.openDate
    ? "capsule-card unlocked"
    : "capsule-card locked";

col.innerHTML = `
    <div class="${cardClass}">
        <h5>${capsule.title}</h5>
        <small>Open Date: ${capsule.openDate}</small><br>

        <span class="status ${today >= capsule.openDate ? 'unlocked' : 'locked'}">
            ${status}
        </span><br>

        <button class="btn btn-danger btn-sm mt-3"
            onclick="deleteCapsule(${capsule.id})">
            Delete
        </button>
    </div>
`;


    capsuleList.appendChild(col);
});

// DELETE CAPSULE
function deleteCapsule(id) {
    if (!confirm("Delete this capsule?")) return;

    capsules = capsules.filter(c => c.id !== id);
    localStorage.setItem("capsules", JSON.stringify(capsules));

    location.reload();
}
