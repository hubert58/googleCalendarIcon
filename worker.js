export default {
  async fetch(request, env, ctx) {
    // 1. Récupérer la date actuelle en forçant le fuseau horaire français
    // Cela évite d'avoir la mauvaise date si le serveur Cloudflare est à l'étranger
    const date = new Date(new Date().toLocaleString("en-US", {timeZone: "Europe/Paris"}));
    const day = date.getDate(); // Récupère le jour du mois (1 à 31)
    
    // 2. Construire l'URL officielle de Google Agenda
    const url = `https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${day}_2x.png`;
    
    // 3. Renvoyer une redirection (302) vers cette image avec des en-têtes stricts anti-cache
    return new Response(null, {
      status: 302,
      headers: {
        'Location': url,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
};