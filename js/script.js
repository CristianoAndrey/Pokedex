const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumero = document.querySelector('.pokemon_numero');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
const MAX_POKEMON = 1025;

// Buscar Pokémon na API
const fetchpokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );

        if (APIResponse.status === 200) {
            const data = await APIResponse.json();
            return data;
        }

        return null;
    } catch (error) {
        return null;
    }
};

// Renderizar Pokémon na tela
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading....';

    const data = await fetchpokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';

        pokemonName.innerHTML = data.name;
        pokemonNumero.innerHTML = data.id;

        pokemonImage.src =
            data.sprites.versions['generation-v']['black-white'].animated.front_default
            || data.sprites.front_default;

        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'digite direito >:/';
        pokemonNumero.innerHTML = '';
    }
};

// Pesquisar Pokémon digitado
form.addEventListener('submit', (event) => {
    event.preventDefault();

    let pokemon = input.value.trim().toLowerCase();

    if (/^\d+$/.test(pokemon)) {
        pokemon = Number(pokemon);

        if (pokemon > 0) {
            pokemon = ((pokemon - 1) % MAX_POKEMON) + 1;
        }
    }

    renderPokemon(pokemon);

    input.value = '';
});

// Pokémon anterior
buttonPrev.addEventListener('click', () => {
    if (searchPokemon <= 1) {
        searchPokemon = MAX_POKEMON;
    } else {
        searchPokemon--;
    }

    renderPokemon(searchPokemon);
});

// Próximo Pokémon
buttonNext.addEventListener('click', () => {
    if (searchPokemon >= MAX_POKEMON) {
        searchPokemon = 1;
    } else {
        searchPokemon++;
    }

    renderPokemon(searchPokemon);
});

// Inicializar Pokédex
renderPokemon(searchPokemon);
