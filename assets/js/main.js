

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const nextButton = document.getElementById('next')
const previousButton = document.getElementById('previous')

const maxRecords = 151
const limit = 10
let offset = 10;
window.addEventListener("load", function () {
    setTimeout(function () {
        loadPokemonItens(0,10)
    }, 2000)

});
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        let newHtml = pokemons.slice(-10).map(convertPokemonToLi).join('')
        pokemonList.innerHTML = newHtml
    })
}

 loadPokemonItens(0, 10)

nextButton.addEventListener('click', () => {
    console.log(offset,'offset',limit,'limit')
    offset += limit
    console.log(offset,'offset',limit,'limit')
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

previousButton.addEventListener('click', () => {
    console.log(offset,'offset',limit,'limit')
    if(offset < 10)
        return
    offset -= limit
        console.log(offset,'offset',limit,'limit')
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
