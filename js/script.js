async function getCharacters(page) {
    const data = await fetch(page)
        .then(response => response.json())
        console.log(data)
    return data
}

async function loadMore(page = "https://pokeapi.co/api/v2/pokemon") {
    const data = await getCharacters(page)
    const characters = data.results
    const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting) {
            loadMore(data.next)
            observer.unobserve(entries[0].target)
        }
    }, {
        rootMargin: "0 0 1000px 0"
    })

    document.querySelector(".poke-list").innerHTML += characters.map(character => { return `    
        <li class="poke-card">
            ${character.name}
                <img class="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${character.url.slice(0, -1).split("/").pop(-1)}.png" alt="${character.name}">
        </li>`}).join(" ")

    const lastCard = document.querySelector(".poke-card:last-child");
    observer.observe(lastCard)
}

document.querySelector("#main").innerHTML = `<ol class="poke-list"></ol>`;

loadMore()