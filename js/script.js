async function getCharacters() {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => response.json())

    console.log(data)
}

async function getCharacter(characterURL) {
    const data = await fetch(`${characterURL}`)
        .then(response => response.json())

    console.log(data)
}



getCharacters()