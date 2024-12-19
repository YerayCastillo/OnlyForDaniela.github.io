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
  
    updateTimer(); // Run immediately to show the initial value
    const timerInterval = setInterval(updateTimer, 1000); // Update every second
  }
  
  // Function to load and display the daily verse
  function loadDailyVersicle() {
    fetch('versicles.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to load the verses file.");
        }
        return response.text();
      })
      .then(data => {
        // Split the verses into an array, each line as an individual entry
        const versicles = data.trim().split('\n');
  
        // Get the current date in UTC
        const todayUTC = new Date();
        const yearStartUTC = new Date(Date.UTC(todayUTC.getUTCFullYear(), 0, 0));
  
        // Calculate the day of the year (UTC-based)
        const dayOfYear = Math.floor((todayUTC - yearStartUTC) / (1000 * 60 * 60 * 24));
  
        // Determine the verse for today
        const index = dayOfYear % versicles.length; // Cycle if days exceed the number of verses
  
        // Extract the verse components (number, title, and content)
        const [number, title, ...contentParts] = versicles[index].split(':');
        const content = contentParts.join(':').trim(); // Join the remaining parts as the full content
  
        // Display the verse in the designated box
        document.getElementById('versicle-box').innerHTML = `
          <h3>Verse ${number.trim()}: ${title.trim()}</h3>
          <p>${content}</p>
        `;
      })
      .catch(error => {
        console.error("Error loading daily verse:", error);
        document.getElementById('versicle-box').textContent = "Failed to load the verse of the day.";
      });
  }
  
  // Redirect to the main menu
  function redirectToMenu() {
    const sections = ['timer-section', 'versicle-section'];
    sections.forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById('menu-icon').style.display = 'none'; // Hide menu icon
  }
  
  // Associate redirection function to menu icon
  document.getElementById('menu-icon').addEventListener('click', redirectToMenu);
  
  // Load the daily verse once the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    loadDailyVersicle();
  });

  
