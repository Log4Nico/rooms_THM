// Cargar datos de máquinas (puedes usar fetch para cargar un JSON externo)
const maquinas = [
  {
    nombre: "RootMe",
    dificultad: "Fácil",
    tipo: ["Pentesting"],
    descripcion: "Intro a pentesting básico.",
    enlace: "https://tryhackme.com/room/rootme"
  },
  {
    nombre: "Blue",
    dificultad: "Media",
    tipo: ["Blue Team", "Incidentes"],
    descripcion: "Análisis y respuesta en Windows.",
    enlace: "https://tryhackme.com/room/blue"
  }
  // ...añade más máquinas
];

function renderMaquinas(lista) {
  const cont = document.getElementById('maquinas-list');
  if (!lista.length) {
    cont.innerHTML = "<p>No se encontraron máquinas.</p>";
    return;
  }
  cont.innerHTML = lista.map(m => `
    <div class="maquina-card">
      <h3>${m.nombre}</h3>
      <span class="badge">${m.dificultad}</span>
      <span class="badge badge-tipo">${m.tipo.join(', ')}</span>
      <p>${m.descripcion}</p>
      <a href="${m.enlace}" target="_blank">Ver en TryHackMe</a>
    </div>
  `).join('');
}

document.getElementById('search-form').addEventListener('submit', e => {
  e.preventDefault();
  const txt = document.getElementById('search-input').value.toLowerCase();
  const filtradas = maquinas.filter(m =>
    m.nombre.toLowerCase().includes(txt) ||
    m.descripcion.toLowerCase().includes(txt) ||
    m.tipo.join(' ').toLowerCase().includes(txt)
  );
  renderMaquinas(filtradas);
});

// Render inicial
renderMaquinas(maquinas);
