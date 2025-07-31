

const milestones = [
    { day: 3, icon: "img/bronze.webp" },
    { day: 7, icon: "img/silver.webp" },
    { day: 15, icon: "img/gold.webp" },
    { day: 30, icon: "img/master.webp" },
    { day: 60, icon: "img/legend.webp" }
];

let count = parseInt(localStorage.getItem("nofapDays")) || 0;

const counterEl = document.getElementById("counter");
const milestoneEl = document.getElementById("milestone");
const nextGoalEl = document.getElementById("nextGoal");
const progressBar = document.getElementById("progressBar");

function updateDisplay() {
    counterEl.innerHTML = `<h1>${count}</h1>`;

    let currentIcon = "";
    let currentMilestoneDay = 0;

    for (let i = milestones.length - 1; i >= 0; i--) {
        if (count >= milestones[i].day) {
            currentIcon = milestones[i].icon;
            currentMilestoneDay = milestones[i].day;
            break;
        }
    }

    milestoneEl.innerHTML = currentIcon ? `<img src="${currentIcon}" alt="milestone" style="height: 40px;">` : "";

    const nextMilestone = milestones.find(m => m.day > count);
    if (nextMilestone) {
        const daysLeft = nextMilestone.day - count;
        nextGoalEl.textContent = `${daysLeft} days to reach next goal`;

        const progress = ((count - currentMilestoneDay) / (nextMilestone.day - currentMilestoneDay)) * 100;
        const clampedProgress = Math.min(Math.max(progress, 0), 100);

        progressBar.style.width = `${clampedProgress}%`;
        progressBar.textContent = `${Math.floor(clampedProgress)}%`;
    } else {
        nextGoalEl.textContent = `🎉 You’ve passed all milestones! Keep going!`;
        progressBar.style.width = `100%`;
        progressBar.textContent = `100%`;
    }
}

document.getElementById("addDay").addEventListener("click", () => {
    count++;
    localStorage.setItem("nofapDays", count);
    updateDisplay();
});

document.getElementById("reset").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset the counter?")) {
        count = 0;
        localStorage.setItem("nofapDays", count);
        updateDisplay();
    }
});

updateDisplay();








let countdown;
function startTimer() {
    clearInterval(countdown); // Reset if already running

    const timerDisplay = document.getElementById('timer');
    let totalSeconds = 10 * 60;

    function updateTimer() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (totalSeconds <= 0) {
            clearInterval(countdown);
            alert("🎉 Breathing exercise complete!");
        }

        totalSeconds--;
    }

    updateTimer();
    countdown = setInterval(updateTimer, 1000);
}