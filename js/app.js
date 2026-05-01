const btn = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");

// FUNCIÓN PRINCIPAL (OBLIGATORIA)
async function cargarDatos(nombre = "") {

  resultado.innerHTML = "<p>Cargando...</p>";

  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`);

    // VALIDACIÓN (IMPORTANTE PARA NOTA)
    if (!response.ok) {
      throw new Error("No se encontraron resultados");
    }

    const data = await response.json();

    resultado.innerHTML = "";

    // Mostrar al menos 6 personajes
    data.results.slice(0, 6).forEach(personaje => {

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${personaje.image}">
    <h3>${personaje.name}</h3>
    <p>${personaje.status}</p>
  `;

  // 👉 FUNCIONALIDAD EXTRA (click)
  card.addEventListener("click", () => {
    alert(
      `Nombre: ${personaje.name}\n` +
      `Estado: ${personaje.status}\n` +
      `Especie: ${personaje.species}\n` +
      `Género: ${personaje.gender}`
    );
  });

  resultado.appendChild(card);
});
  } catch (error) {
    resultado.innerHTML = `<p>❌ ${error.message}</p>`;
  }
}

// EVENTO CLICK
btn.addEventListener("click", () => {
  const texto = document.getElementById("busqueda").value;
  cargarDatos(texto);
});

// ENTER
document.getElementById("busqueda").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

// CARGA INICIAL
window.onload = () => {
  cargarDatos();
};