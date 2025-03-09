document.querySelector("#haku").addEventListener("click", getPokemon); //add event listener to the button

function capitalizeFirstLetter(string) {
  //function to capitalize the first letter of the string
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  //function to convert the string to lowercase
  return string.toLowerCase();
}

function getPokemon(e) {
  //main function for fetching data from API
  const name = document.querySelector("#pokenimi").value; //get the value from input field
  const pokemonName = lowerCaseName(name); //convert the value to lowercase

  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`) //fetch data from API
    .then((response) => response.json())
    .then((data) => {
      //display the data in the div
      document.querySelector(".pokemontulos").innerHTML = `
      <div class="pokemonkuva">
            <img src="${
              data.sprites.other["official-artwork"].front_default
            }" alt="${capitalizeFirstLetter(data.name)}" />
        </div>
        <div class="pokemoninfo">
          <h2>${capitalizeFirstLetter(data.name)}</h2>
          <p>Type: ${data.types
            .map((typeInfo) => typeInfo.type.name)
            .join(", ")}</p>
        </div>
      `;
    })
    .catch((error) => {
      //if the pokemon is not found, display this message
      document.querySelector(".pokemontulos").innerHTML = `
      <div class="pokemoninfo">
        <h3>Pokemon not found</h3>
      </div>
      `;
    });

  e.preventDefault(); //prevent the default action of the form
}
