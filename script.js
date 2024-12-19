// Function to show a specific section and hide the others
function showSection(sectionId) {
    const sections = ['timer-section', 'versicle-section'];
    sections.forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById('menu-icon').style.display = 'block'; // Show menu icon
  }
  
  // Button to show the anniversary countdown
  document.getElementById('anniversary-button').addEventListener('click', () => {
    showSection('timer-section');
    startLiveCountdown(); // Start the live countdown
  });
  
  // Button to show the daily verse
  document.getElementById('versicle-button').addEventListener('click', () => {
    showSection('versicle-section');
    loadDailyVersicle(); // Load the daily verse
  });
  
  // Live countdown timer
function startLiveCountdown() {
    const anniversaryDate = new Date('2025-19-05T00:00:00');
    
    function updateTimer() {
      const now = new Date();
      const diff = anniversaryDate - now;
  
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
        // Always display all components, even if some are zero
        const formattedCountdown = `
          ${days > 0 ? `${days} days, ` : ''}
          ${hours > 0 || days > 0 ? `${hours} hours, ` : ''}
          ${minutes} minutes, 
          ${seconds} seconds remaining.
        `.trim();
  
        // Display the updated countdown
        document.getElementById('countdown-timer').textContent = formattedCountdown;
      } else {
        document.getElementById('countdown-timer').textContent = "The anniversary has passed!";
        clearInterval(timerInterval); // Stop updating after the anniversary
      }
    }
  
    updateTimer(); // Run immediately to show the initial value
    const timerInterval = setInterval(updateTimer, 1000); // Update every second
  }
  
  
  function startLiveCountdown() {
    // Set the target anniversary date in UTC
    const anniversaryDateUTC = new Date(Date.UTC(2025, 4, 19, 0, 0, 0)); // May 19, 2025, at 00:00 UTC
  
    function updateTimer() {
      const now = new Date(); // Get the current local time
      const diff = anniversaryDateUTC - now; // Calculate the difference in milliseconds
  
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
        // Display full countdown
        document.getElementById('countdown-timer').textContent = 
          `${days} day${days !== 1 ? 's' : ''}, ` +
          `${hours} hour${hours !== 1 ? 's' : ''}, ` +
          `${minutes} minute${minutes !== 1 ? 's' : ''}, ` +
          `${seconds} second${seconds !== 1 ? 's' : ''} left.`;
      } else {
        document.getElementById('countdown-timer').textContent = "The anniversary has passed!";
        clearInterval(timerInterval); // Stop the timer after the anniversary
      }
    }
  
    updateTimer(); // Run immediately to show initial value
    const timerInterval = setInterval(updateTimer, 1000); // Update every second
  }
  
  
  
  
  // Redirect to the main menu
  function redirectToMenu() {
    const sections = ['timer-section', 'versicle-section'];
    sections.forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById('menu-icon').style.display = 'none'; // Hide menu icon
  }
  
  // Associate redirection function to menu icon
  document.getElementById('menu-icon').addEventListener('click', redirectToMenu);
  
