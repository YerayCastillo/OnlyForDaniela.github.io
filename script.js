// Helper function to toggle visibility
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  element.classList.toggle('hidden');
}

// Button to show anniversary date
document.getElementById('anniversary-button').addEventListener('click', () => {
  toggleVisibility('timer-section');
  startLiveCountdown(); // Start the live countdown
});

// Button to show daily versicle
document.getElementById('versicle-button').addEventListener('click', () => {
  toggleVisibility('versicle-section');
  loadRandomVersicle();
});

// Countdown Timer
function startLiveCountdown() {
  const anniversaryDate = new Date('2025-05-19T00:00:00');
  function updateTimer() {
    const now = new Date();
    const diff = anniversaryDate - now;

    if (diff > 0) {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('countdown-timer').textContent = 
        `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining.`;
    } else {
      document.getElementById('countdown-timer').textContent = "The anniversary has passed!";
      clearInterval(timerInterval); // Stop updating after the anniversary
    }
  }

  updateTimer(); // Run immediately to avoid delay
  const timerInterval = setInterval(updateTimer, 1000); // Update every second
}

// Load a random versicle from the file
function loadRandomVersicle() {
  fetch('versicles.txt')
    .then(response => response.text())
    .then(data => {
      const versicles = data.trim().split('\n');
      const randomIndex = Math.floor(Math.random() * versicles.length);
      const [number, title, ...content] = versicles[randomIndex].split(':');

      document.getElementById('versicle-box').innerHTML = `
        <h3>${number}: ${title}</h3>
        <p>${content.join(':')}</p>
      `;
    })
    .catch(() => {
      document.getElementById('versicle-box').textContent = "Could not load a versicle.";
    });
}

// Redirect to menu
function redirectToMenu() {
  window.location.href = '/menu';
}
