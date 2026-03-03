export const useFormat = character => {
    let id 
        
    if(character.url) id = character.url.slice(0, -1).split("/").pop(-1);
        else id = JSON.stringify(character.id)
    
    return `    
        <li>
            <a class="poke-card" href="card.html?id=${id}">
                <span class="poke-id">#${id.padStart(4, "0")}</span>
                <img class="card-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${character.name}">
                ${character.name}
            </a>
        </li>
    `;
}