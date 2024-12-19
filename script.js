// Helper function to show a specific section and hide others
function showSection(sectionId) {
    const sections = ['timer-section', 'versicle-section'];
    sections.forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById('menu-icon').style.display = 'block'; // Show menu icon
  }
  
  // Button to show anniversary date
  document.getElementById('anniversary-button').addEventListener('click', () => {
    showSection('timer-section');
    startLiveCountdown(); // Start the live countdown
  });
  
  // Button to show daily versicle
  document.getElementById('versicle-button').addEventListener('click', () => {
    showSection('versicle-section');
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
 

function loadDailyVersicle() {
  fetch('versicles.txt')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el archivo versicles.txt');
      }
      return response.text();
    })
    .then(data => {
      const versicles = data.trim().split('\n');
      const today = new Date();
      const dayOfYear = Math.floor(
        (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
      );
      const index = dayOfYear % versicles.length;

      // Dividir y mostrar datos
      const versicleParts = versicles[index].split(':');
      if (versicleParts.length < 3) {
        console.error('Formato incorrecto en versículo:', versicles[index]);
        document.getElementById('versicle-box').textContent = "Error en el formato del versículo.";
        return;
      }

      const number = versicleParts[0]?.trim();
      const title = versicleParts[1]?.trim();
      const content = versicleParts.slice(2).join(':').trim();

      // Mostrar contenido
      document.getElementById('versicle-box').innerHTML = `
        <h3>Versículo ${number}: ${title}</h3>
        <p>${content}</p>
      `;
    })
    .catch(error => {
      console.error('Error cargando el versículo:', error);
      document.getElementById('versicle-box').textContent = "No se pudo cargar el versículo.";
    });
}


  
  // Redirect to the main menu
  function redirectToMenu() {
    const sections = ['timer-section', 'versicle-section'];
    sections.forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById('menu-icon').style.display = 'none'; // Hide menu icon
  }
  
  // Attach the redirect function to the menu icon
  document.getElementById('menu-icon').addEventListener('click', redirectToMenu);
  
