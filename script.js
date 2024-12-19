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
  
  function startLiveCountdown() {
  // Set the target anniversary date in UTC
  const anniversaryDateUTC = new Date(Date.UTC(2025, 4, 19, 0, 0, 0)); // May 19, 2025, at 00:00 UTC

  function updateTimer() {
    // Get the current UTC time
    const now = new Date();
    const nowUTC = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    ));

    const diff = anniversaryDateUTC - nowUTC; // Calculate the difference in milliseconds

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
  
  // Embedded versicles array
  const versicles = [
    "1: Salmo 23:4 Aunque pase por valle de sombra de muerte, no temeré mal alguno, porque tú estás conmigo; tu vara y tu cayado me infundirán aliento.",
    "2: Mateo 11:28 Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.",
    "3: Filipenses 4:13 Todo lo puedo en Cristo que me fortalece.",
    "4: Salmo 46:1 Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.",
    "5: Romanos 8:28 Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.",
    "6: Isaías 41:10 No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.",
    "7: Salmo 34:18 Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.",
    "8: Proverbios 3:5 Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia.",
    "9: Jeremías 29:11 Porque yo sé los planes que tengo para vosotros, dice Jehová; planes de bienestar y no de calamidad, para daros un futuro y una esperanza.",
    "10: Juan 16:33 Estas cosas os he hablado para que en mí tengáis paz. En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.",
    "11: Salmo 121:1-2 Alzaré mis ojos a los montes, ¿de dónde vendrá mi socorro? Mi socorro viene de Jehová, que hizo los cielos y la tierra.",
    "12: 2 Timoteo 1:7 Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.",
    "13: Éxodo 14:14 Jehová peleará por vosotros, y vosotros estaréis tranquilos.",
    "14: Romanos 12:12 Gozosos en la esperanza; sufridos en la tribulación; constantes en la oración.",
    "15: Hebreos 13:5 No te desampararé, ni te dejaré.",
    "16: 1 Pedro 5:7 Echad toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.",
    "17: Isaías 40:31 Pero los que esperan en Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.",
    "18: Salmo 37:4 Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón.",
    "19: Filipenses 4:6-7 Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.",
    "20: Proverbios 18:10 Torre fuerte es el nombre de Jehová; a él correrá el justo, y será levantado.",
    "21: Salmo 31:24 Esforzaos todos vosotros los que esperáis en Jehová, y tome aliento vuestro corazón.",
    "22: Isaías 43:2 Cuando pases por las aguas, yo estaré contigo; y si por los ríos, no te anegarán.",
    "23: Salmo 27:1 Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?",
    "24: Josué 1:9 Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.",
    "25: Romanos 15:13 Y el Dios de esperanza os llene de todo gozo y paz en el creer, para que abundéis en esperanza por el poder del Espíritu Santo.",
    "26: Mateo 5:14 Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder.",
    "27: Efesios 3:20 Y a Aquel que es poderoso para hacer todas las cosas mucho más abundantemente de lo que pedimos o entendemos, según el poder que actúa en nosotros.",
    "28: Salmo 56:3 En el día que temo, yo en ti confío.",
    "29: Deuteronomio 31:6 Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos, porque Jehová tu Dios es el que va contigo.",
    "30: Santiago 1:12 Bienaventurado el varón que soporta la tentación; porque cuando haya resistido la prueba, recibirá la corona de vida.",
    "31: Salmo 91:1 El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.",
    "32: Isaías 26:3 Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.",
    "33: Salmo 42:11 ¿Por qué te abates, oh alma mía, y por qué te turbas dentro de mí? Espera en Dios; porque aún he de alabarle.",
    "34: Juan 14:27 La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.",
    "35: Romanos 8:37 Antes, en todas estas cosas somos más que vencedores por medio de aquel que nos amó.",
    "36: Isaías 12:2 He aquí, Dios es salvación mía; confiaré, y no temeré.",
    "37: Proverbios 16:3 Encomienda a Jehová tus obras, y tus pensamientos serán afirmados.",
    "38: 2 Corintios 12:9 Bástate mi gracia; porque mi poder se perfecciona en la debilidad.",
    "39: Salmo 119:105 Lámpara es a mis pies tu palabra, y lumbrera a mi camino.",
    "40: 1 Corintios 10:13 No os ha sobrevenido ninguna tentación que no sea humana; pero fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir."
  ];
  
  
  // Function to load and display the daily verse
  function loadDailyVersicle() {
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
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadDailyVersicle();
  });
  
  
  
  // Redirect to the main menu
  function redirectToMenu() {
    const sections = ['timer-section', 'versicle-section'];
    sections.forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById('menu-icon').style.display = 'none'; // Hide menu icon
  }
  
  // Associate redirection function to menu icon
  document.getElementById('menu-icon').addEventListener('click', redirectToMenu);
