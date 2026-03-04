export const useFormat = character => {
    let id = character.url.slice(0, -1).split("/").pop(-1);
    let page = character.url.slice(0, -3).split("/").pop(-1);
    if(page == "") page = "people"

    return `    
        <li>
            <a class="__card --hollow" href="card.html?page=${page}&id=${id}">
                <img class="card-img" src="../assets/img/${id}.jpg" alt="${character.name}">
                ${character.name}
            </a>
        </li>
    `;
}