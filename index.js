const jeopardyEl = document.getElementById("jeopardy");
const pokedexEl = document.getElementById("pokedex");
const libraryEl = document.getElementById("library");
const tvguideEl = document.getElementById("tvguide");

//JEOPARDY

async function getCategories(count, offset){
    let response = await fetch(`https://jservice.io/api/categories?count=${count}&offset=${offset}`);
    let data = await response.json();
    return data

}

function getCategoryHtml(category) {
    return `
        <div class="my-category-title">
            ${category.title} 
        </div>
        ${getClueHtml(100)}
        ${getClueHtml(200)}
        ${getClueHtml(300)}
        ${getClueHtml(400)}
    `
}

let getClueHtml = clueValue => {
    return `<div class="my-category-clue" style="grid-row-start: ${clueValue / 100 + 1}">$${clueValue}</div>`
} 

getCategories(5, 30).then(categories => {
    console.log(categories)
    jeopardyEl.innerHTML = `
        <div class="board">
            ${categories.map(getCategoryHtml).join('')}
        </div>
    `
})


// POKEDEX

async function getAllPokemon() {
    let response = await fetch("pokemon.json")
    let data = await response.json()
    return data.slice(0, 100)
}

function getPokemonHtml(aPokemon) {
    return `
        <div class="a-pokemon">
            <div class="a-pokemon-id">${aPokemon.id}</div>
            
            <div class="a-pokemon-name">${aPokemon.name.english}</div>
            <div class="a-pokemon-type">${aPokemon.type.join(' / ')}</div>
            
            <div class="a-pokemon-stat">HP: ${aPokemon.base.HP}</div>
            <div class="a-pokemon-stat">Attack: ${aPokemon.base.Attack}</div>
            <div class="a-pokemon-stat">Defense: ${aPokemon.base.Defense}</div>
            <div class="a-pokemon-stat">Speed: ${aPokemon.base.Speed}</div>
            
            <div class="a-pokemon-alt-name">${aPokemon.name.japanese}</div>
            <div class="a-pokemon-alt-name">${aPokemon.name.chinese}</div>
            <div class="a-pokemon-alt-name">${aPokemon.name.french}</div>
        </div>
    `
}

function displayPokedex(allPokemon) {
    console.log(allPokemon[0])
    pokedexEl.innerHTML = `<div class="my-pokedex">
        ${allPokemon.map(getPokemonHtml).join('')}
    </div>`
}

getAllPokemon().then(displayPokedex)

//LIBRARY

async function getBooks() {
    let response = await fetch('books.json')
    let books = await response.json()
    let n = 1
    return books.map(book => {
        book.id = n
        n += 1
        return book
    })
}

function getBookHtml(book) {
    return `<div class="my-book">
        <div class="my-book-cover">${book.title}</div>
        <div class="my-book-spine"></div>
        <div class="my-book-footer"></div>
    </div>`
}

function displayLibrary(books) {
    libraryEl.innerHTML = `<div class="my-library">
        ${books.map(getBookHtml).join('')}
    </div>`
}

getBooks()
    .then(displayLibrary)
    .catch(e => console.log(e))