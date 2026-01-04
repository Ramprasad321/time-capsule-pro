const user = JSON.parse(localStorage.getItem("timeCapsuleUser"));
if (!user) window.location.href = "login.html";

const container = document.getElementById("openCapsules");
const capsules = JSON.parse(localStorage.getItem("capsules")) || [];
const today = new Date().toISOString().split("T")[0];

const myCapsules = capsules.filter(c => c.createdBy === user.email);

if (!myCapsules.length) {
    container.innerHTML = `
        <p class="text-center empty-msg">
            No capsules available
        </p>
    `;
}


myCapsules.forEach(capsule => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const isUnlocked = today >= capsule.openDate;

    col.innerHTML = `
        <div class="capsule-card ${isUnlocked ? 'unlocked' : 'locked'}">
            <h5>${capsule.title}</h5>

            <span class="fw-bold ${isUnlocked ? 'text-success' : 'text-danger'}">
                ${isUnlocked ? 'Unlocked 🔓' : 'Locked 🔒'}
            </span>

            ${
                isUnlocked
                ? `
                    ${capsule.image ? `
                        <img 
                            src="${capsule.image}" 
                            class="img-fluid rounded mt-3 mb-2"
                            style="max-height:200px; object-fit:cover;"
                        >
                    ` : ``}

                    <p>${capsule.message}</p>
                    `
                : `<p class="text-muted mt-3">Opens on ${capsule.openDate}</p>`
            }
        </div>
    `;

    container.appendChild(col);
});

