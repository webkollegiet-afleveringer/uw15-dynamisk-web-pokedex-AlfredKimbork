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
    }, { rootMargin: "0 0 1000px 0" })

    document.querySelector(".poke-list").innerHTML += characters.map(character => { 
        const id = character.url.slice(0, -1).split("/").pop(-1)
        let idFormat
        switch (id.length) {
            case 1:
                idFormat = `#000${id}`
                break;
            case 2:
                idFormat = `#00${id}`
                break;
            case 3:
                idFormat = `#0${id}`
                break;
            case 4:
                idFormat = `#${id}`
                break;
            default:
                idFormat = `#????`
                break;
        }
        return `    
            <li class="poke-card">
                <span class="poke-id">${idFormat}</span>
                <img class="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${character.name}">
                ${character.name}
            </li>
        `
    }).join(" ")

    observer.observe(document.querySelector(".poke-card:last-child"))
}

document.querySelector("#main").innerHTML = `<ul class="poke-list"></ul>`;

loadMore()