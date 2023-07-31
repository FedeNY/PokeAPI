const contenedorPokemon = document.getElementById("pokemonContainer");
const contenedorInfo = document.getElementById("contenedorInfo");
const paginacion = document.getElementById("navPag");
let next = localStorage.getItem("next");
let prev = localStorage.getItem("prev");
const cosa = document.getElementById("cosa");







async function getFetch(url) {
  if (url != null) {
    try {
      const res = await fetch(url);
      const resultado = await res.json();
      const pokemonUrls = resultado.results.map((pokemon) => pokemon.url);
      const pokemonDataResponses = await Promise.all(
        pokemonUrls.map((url) => fetch(url))
      );
      const pokemonData = await Promise.all(
        pokemonDataResponses.map((response) => response.json())
      );
      pokeRenderizacion(pokemonData);

      next = resultado.next;
      prev = resultado.previous;
      localStorage.setItem("next", next);
      localStorage.setItem("prev", prev);
    } catch (error) {
      console.log(error);
    }
  }
}

const activa = (pokemon) => {
  let datos = JSON.stringify(pokemon);
  localStorage.setItem("datosPokemon", datos);
};



const pokeRenderizacion = (arr) => {
  if (contenedorPokemon) {
    contenedorPokemon.innerHTML = " ";
    arr.forEach((e) => {
      let eData = JSON.stringify(e);

      contenedorPokemon.innerHTML += `
          <div  class="card">
            <img src=${e.sprites.front_default} />

              <div class="boxInfo"> <span> ${e.name} </span> <a onlcick="activa(${eData})" href="poke.html">Ver Mas </a> <div>
            

          </div>
        `;
    });
  }
};

if (contenedorPokemon) {
  const botonNext = document.createElement("button");
  botonNext.className = "btnStyle";
  botonNext.textContent = "Next";
  paginacion.append(botonNext);
  botonNext.addEventListener("click", () => getFetch(next));

  const botonPrev = document.createElement("button");
  botonPrev.className = "btnStyle";
  botonPrev.textContent = "Prev";
  paginacion.prepend(botonPrev);
  botonPrev.addEventListener("click", () => getFetch(prev));
}

getFetch("https://pokeapi.co/api/v2/pokemon/");

const detalle = () => {
  let dato = localStorage.getItem("datosPokemon");

  let datos = JSON.parse(dato);

  console.log(datos);
  if (contenedorInfo) {
    contenedorInfo.innerHTML = `<div class="statDiv" ><img src="${datos.sprites.front_default}" width="200px" /> <h1> ${datos.name} </h1><p> Altura: ${datos.height}</p></div>`;
  }
};

detalle();
