function updateClock() {
    const now = new Date();

    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours();

    document.querySelector(".second").style.transform =
        `translateX(-50%) rotate(${sec * 6}deg)`;

    document.querySelector(".minute").style.transform =
        `translateX(-50%) rotate(${min * 6}deg)`;

    document.querySelector(".hour").style.transform =
        `translateX(-50%) rotate(${(hr % 12) * 30 + min / 2}deg)`;
}

setInterval(updateClock, 1000);
updateClock();
function updateClock() {
  const now = new Date();

  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = now.getHours() % 12 + minutes / 60;

  document.querySelector(".second").style.transform =
    `translateX(-50%) rotate(${seconds * 6}deg)`;

  document.querySelector(".minute").style.transform =
    `translateX(-50%) rotate(${minutes * 6}deg)`;

  document.querySelector(".hour").style.transform =
    `translateX(-50%) rotate(${hours * 30}deg)`;

  requestAnimationFrame(updateClock);
}

updateClock();
