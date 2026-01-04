// ===============================
// AUTH CHECK
// ===============================
const user = JSON.parse(localStorage.getItem("timeCapsuleUser"));
if (!user) {
    window.location.href = "login.html";
}

// ===============================
// IMAGE HANDLING
// ===============================
const imageInput = document.getElementById("capsuleImage");
let imageBase64 = "";

if (imageInput) {
    imageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            imageBase64 = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

// ===============================
// SAVE CAPSULE
// ===============================
function saveCapsule() {
    const title = document.getElementById("title").value.trim();
    const message = document.getElementById("message").value.trim();
    const openDate = document.getElementById("openDate").value;

    if (!title || !message || !openDate) {
        alert("All fields are required");
        return;
    }

    const capsule = {
        id: Date.now(),
        title,
        message,
        image: imageBase64 || null,
        openDate,
        createdBy: user.email
    };

    const capsules = JSON.parse(localStorage.getItem("capsules")) || [];
    capsules.push(capsule);
    localStorage.setItem("capsules", JSON.stringify(capsules));

    alert("Capsule saved successfully!");
    window.location.href = "dashboard.html";
}

// ===============================
// EMOJI HANDLING
// ===============================
const emojis = [
  "😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇",
  "🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚",
  "😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔",
  "😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯",
  "😪","😫","🥱","😴","😌","😛","😜","😝","🤤","😒",
  "😓","😔","😕","🙃","🫠","😲","☹️","🙁","😖","😞",
  "😟","😤","😢","😭","😦","😧","😨","😩","🤯","😬",
  "😰","😱","🥵","🥶","😳","🤪","😵","😡","😠","🤬",

  "❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔",
  "💕","💞","💓","💗","💖","💘","💝",

  "🔥","✨","🎉","🎊","🎈","🎁","🎂","🍰","🍕","🍔",
  "🍟","🍩","🍫","🍿","🍺","☕","🍷",

  "👍","👎","👏","🙌","🫶","🤝","🙏","✌️","🤞","🤟",
  "👌","🤌","🤘","🫰","🖖",

  "🌍","🌎","🌏","🌈","☀️","🌙","⭐","⚡","☁️","❄️",
  "🌸","🌼","🌻","🌹","🌷","🌱","🍀"
];

const emojiPicker = document.getElementById("emojiPicker");

if (emojiPicker) {
    emojis.forEach(emoji => {
        const span = document.createElement("span");
        span.textContent = emoji;
        span.onclick = () => addEmoji(emoji);
        emojiPicker.appendChild(span);
    });
}

function toggleEmojiPicker() {
    emojiPicker.classList.toggle("hidden");
}

function addEmoji(emoji) {
    const messageBox = document.getElementById("message");
    messageBox.value += emoji;
    messageBox.focus();
}
