// Function to show a specific section and hide the others
function showSection(sectionId) {
    const sections = ['timer-section'];
    sections.forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById('menu-icon').style.display = 'block'; // Show menu icon
  }
  
  // Button to show the anniversary countdown
  document.getElementById('anniversary-button').addEventListener('click', () => {
    showSection('timer-section');
    startLiveCountdown(); // Start live countdown
  });
  
  // Live countdown timer
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
  
    updateTimer(); // Run immediately
    const timerInterval = setInterval(updateTimer, 1000); // Update every second
  }
  
  // Redirect to main menu
  function redirectToMenu() {
    const sections = ['timer-section'];
    sections.forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById('menu-icon').style.display = 'none'; // Hide menu icon
  }
  
  // Attach the redirect function to the menu icon
  document.getElementById('menu-icon').addEventListener('click', redirectToMenu);
  
