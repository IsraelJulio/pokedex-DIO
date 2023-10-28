
const pokeApi = {}
const pokemons = []

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return axios.get(pokemon.url)
        .then(function(response) {                
                pokemons.push(convertPokeApiDetailToPokemon(response.data))
                
        } )
        
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    var pokemonsList = axios.get(url)
        .then(function(response) {
            const { count, next, previous, results } = response.data;
            results.map(pokeApi.getPokemonDetail) 
            console.log('ta rodando',pokemons)
            return pokemons
             
        } )

        return pokemonsList;
}
