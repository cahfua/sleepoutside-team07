// Get references to elements
const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const customTimeInput = document.getElementById("customTime");

let timeLeft = 10; // Default starting time
let timer = null;
let isPaused = false;

// Start button event
startButton.addEventListener("click", () => {
  // Use custom time if provided
  const userInput = parseInt(customTimeInput.value);
  if (!isNaN(userInput) && userInput > 0) {
    timeLeft = userInput;
  }

  // Clear any existing timer
  clearInterval(timer);
  countdownDisplay.textContent = timeLeft;

  // Start countdown
  timer = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      countdownDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        countdownDisplay.textContent = "Time's up!";
      }
    }
  }, 1000);
});

// Pause/Resume button event
pauseButton.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
});

// const countdownDisplay = document.getElementById('countdown');
// const startButton = document.getElementById('startButton');

// let timeLeft = 10;

// startButton.addEventListener('click', () => {
//   setInterval(() => {
//     if (timeLeft >= 0) {
//       countdownDisplay.textContent = timeLeft;
//       timeLeft--;
//     } else {
//       // Stop the countdown and display a message
//     }
//   }, 1000); 
// });