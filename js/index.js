const containerLoader = document.getElementById('container-loader')
const pokeContainer = document.getElementById('poke-container')
const pokemonsNumber = 150
const colors = {
	fire: '#FB6C6C',
	grass: '#48D0B0',
	electric: '#FFD86F',
	water: '#77BDFE',
	ground: '#E0C068',
	rock: '#B8A038',
	fairy: '#EE99AC',
	poison: '#7C538C',
	bug: '#A8B820',
	dragon: '#97b3e6',
	psychic: '#F85888',
	flying: '#A890F0',
	fighting: '#C03028',
	normal: '#A8A878',
}
const mainTypes = Object.keys(colors)
const getPokemon = async (id) => {
	const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
	const resp = await fetch(URL)
	const pokemon = await resp.json()
	createPokemonCard(pokemon)
}
const createPokemonCard = (pokemon) => {
	const { id, name, types } = pokemon
	const pokemonEl = document.createElement('div')
	pokemonEl.classList.add('pokemon')
	const pokeTypes = types.map(({ type }) => type.name)
	const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1)
	const color = colors[type]
	pokemonEl.style.backgroundColor = color
	pokemonEl.innerHTML = `
    <div class='poke-id'>
      <span style='color: ${color}'>#${id.toString().padStart(3, '0')}</span>
    </div>
    <h2 class='poke-name'>${name}</h2>
    <div class='poke-grid'>
      <div class='poke-types'>
    ${types.map(({ type }) => `<div><span style="background-color: ${color}; border: 1px solid ${color};">${type.name}</span></div>`).join('')}
      </div>
      <div class='poke-img'>
        <svg width="100" height="100" stroke=${color} viewBox="0 0 249 250" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M249 135.152H184.391C179.524 163.828 154.562 185.664 124.5 185.664C94.438 185.664 69.4759 163.828 64.6088 135.152H0C5.20826 199.351 58.9595 249.827 124.5 249.827C190.041 249.827 243.792 199.351 249 135.152ZM248.882 113.31H184.143C178.727 85.3086 154.083 64.1633 124.5 64.1633C94.9169 64.1633 70.2725 85.3086 64.8567 113.31H0.118249C5.97203 49.762 59.4247 0 124.5 0C189.575 0 243.028 49.762 248.882 113.31ZM166.25 124.914C166.25 147.972 147.558 166.664 124.5 166.664C101.442 166.664 82.7497 147.972 82.7497 124.914C82.7497 101.856 101.442 83.1633 124.5 83.1633C147.558 83.1633 166.25 101.856 166.25 124.914Z"
          fill=${color}>
        </svg> 
        <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="${name}">
      </div>
    </div>
	`
	pokeContainer.appendChild(pokemonEl)
}
const fetchPokemons = async () => {
	const loaderEl = document.createElement('div')
	loaderEl.classList.add('o-pokeball')
	loaderEl.classList.add('c-loader')
	loaderEl.classList.add('u-flash')
	containerLoader.appendChild(loaderEl)
	pokeContainer.style.display = 'none'
	for (let i = 1; i <= pokemonsNumber; i++) {
		await getPokemon(i)
		if (i == pokemonsNumber) pokeContainer.style.display = 'grid'
	}
	loaderEl.style.display = 'none'
	containerLoader.removeChild(loaderEl)
}
fetchPokemons()
