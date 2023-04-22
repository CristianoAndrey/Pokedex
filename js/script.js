const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumero = document.querySelector('.pokemon_numero');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let searchPokemon = 1;

const fetchpokemon= async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
    if(APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
    }
}   
const renderPokemon= async(pokemon) => {
    pokemonName.innerHTML= 'Loading....'
    const data = await fetchpokemon(pokemon);
    if(data){
    pokemonImage.style.display= 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    searchPokemon = data.id;
    }else{
        pokemonImage.style.display= 'none';
        pokemonName.innerHTML = 'digite direito >:/'
        pokemonNumero.innerHTML = '';
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () =>{
    if(searchPokemon >1){
        searchPokemon-=1;
        renderPokemon(searchPokemon)
    }  
});

buttonNext.addEventListener('click', () =>{
    searchPokemon+=1;
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);