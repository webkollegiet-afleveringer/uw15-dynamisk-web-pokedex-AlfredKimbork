export const formatList = (character, page) => {
    let id = character.url.slice(0, -1).split("/").pop(-1);

    return `    
        <li>
            <a class="__card --hollow" href="card.html?page=${page}&id=${id}">
                <img class="card-img" src="../assets/img/${page}/${id}.jpg" alt="${character.name}">
                ${character.name}
            </a>
        </li>
    `;
}