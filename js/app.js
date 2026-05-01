const btn = document.getElementById("btnBuscar");
const resultado = document.getElementById("resultado");

// Buscar al hacer clic
btn.addEventListener("click", async () => {
  const texto = document.getElementById("busqueda").value;

  resultado.innerHTML = "Cargando...";

  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${texto}`);
    const data = await res.json();

    resultado.innerHTML = "";

    data.results.forEach(personaje => {
      const div = document.createElement("div");
      div.classList.add("card");

      div.innerHTML = `
        <img src="${personaje.image}" width="100%">
        <h3>${personaje.name}</h3>
        <p>${personaje.status}</p>
      `;

      resultado.appendChild(div);
    });

  } catch (error) {
    resultado.innerHTML = "No se encontraron personajes ❌";
  }
});

// Buscar con Enter
document.getElementById("busqueda").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    btn.click();
  }
});

// Cargar personajes al inicio
window.onload = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  resultado.innerHTML = "";

  data.results.forEach(personaje => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${personaje.image}" width="100%">
      <h3>${personaje.name}</h3>
      <p>${personaje.status}</p>
    `;

    resultado.appendChild(div);
  });
};