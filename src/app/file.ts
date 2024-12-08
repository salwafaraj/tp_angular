let pomodoro = document.getElementById("pomodoro-timer") as HTMLElement;
let short = document.getElementById("short-timer") as HTMLElement;
let long = document.getElementById("long-timer") as HTMLElement;
let currentTimer: HTMLElement | null = null;
let myInterval: number | null = null;

function showDefaultTimer() {
  if (pomodoro && short && long) {
    pomodoro.style.display = "block";
    short.style.display = "none";
    long.style.display = "none";
  }
}

showDefaultTimer();

function hideAll() {
  const timers = document.querySelectorAll<HTMLElement>(".timer-display");
  timers.forEach((timer) => (timer.style.display = "none"));
}

document.getElementById("pomodoro-session")?.addEventListener("click", function () {
  hideAll();
  if (pomodoro) {
    pomodoro.style.display = "block";
    currentTimer = pomodoro;
  }
});

document.getElementById("short-break")?.addEventListener("click", function () {
  hideAll();
  if (short) {
    short.style.display = "block";
    currentTimer = short;
  }
});

document.getElementById("long-break")?.addEventListener("click", function () {
  hideAll();
  if (long) {
    long.style.display = "block";
    currentTimer = long;
  }
});

function startTimer(timerdisplay: HTMLElement) {
  if (myInterval) {
    clearInterval(myInterval);
  }

  const timerDuration = timerdisplay.getAttribute("data-duration")?.split(":")[0];
  if (!timerDuration) return;

  console.log(timerDuration);

  const durationInMilliseconds = parseInt(timerDuration) * 60 * 1000;
  const endTimestamp = Date.now() + durationInMilliseconds;

  myInterval = window.setInterval(function () {
    const timeRemaining = endTimestamp - Date.now();

    if (timeRemaining <= 0) {
      clearInterval(myInterval!);
      timerdisplay.textContent = "00:00";
      const alarm = new Audio(
        "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav"
      );
      alarm.play();
    } else {
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      console.log(formattedTime);
      timerdisplay.textContent = formattedTime;
    }
  }, 1000);
}

document.getElementById("start")?.addEventListener("click", function () {
  if (currentTimer) {
    startTimer(currentTimer);
    (document.getElementById("timer-message") as HTMLElement).style.display = "none";
  } else {
    (document.getElementById("timer-message") as HTMLElement).style.display = "block";
  }
});

document.getElementById("stop")?.addEventListener("click", function () {
  if (currentTimer && myInterval) {
    clearInterval(myInterval);
  }
});
