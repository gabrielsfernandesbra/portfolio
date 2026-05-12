let map;

function criarMapa(lat, lon) {

  if (map) map.remove();

  map = L.map('map').setView([lat, lon], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  L.marker([lat, lon])
    .addTo(map)
    .bindPopup("Localização do IP")
    .openPopup();
}

async function buscar() {

  const ip = document.getElementById("ip").value.trim();
  const resultado = document.getElementById("resultado");

  try {

    resultado.innerHTML = "Buscando...";

    const url = ip
      ? `https://ipinfo.io/${ip}/json`
      : `https://ipinfo.io/json`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error.message || "IP inválido");
    }

    // separa latitude e longitude
    const [lat, lon] = (data.loc || "0,0").split(",");

    resultado.innerHTML = `
      <p><strong>IP:</strong> ${data.ip}</p>
      <p><strong>País:</strong> ${data.country}</p>
      <p><strong>Região:</strong> ${data.region}</p>
      <p><strong>Cidade:</strong> ${data.city}</p>
      <p><strong>CEP:</strong> ${data.postal || "N/A"}</p>
      <p><strong>ISP:</strong> ${data.org}</p>
      <p><strong>Localização:</strong> ${data.loc}</p>
      <p><strong>Timezone:</strong> ${data.timezone || "N/A"}</p>
    `;

    criarMapa(parseFloat(lat), parseFloat(lon));

  } catch (err) {

    resultado.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}