export const useFormat = character => {
    const id = character.url.slice(0, -1).split("/").pop(-1);
    const page = character.url.slice(0, -3).split("/").pop(-1);

    return `    
        <li>
            <a class="__card" href="card.html?page=${page}&id=${id}">
                <img class="card-img" src="../assets/img/${id}.jpg" alt="${character.name}">
                ${character.name}
            </a>
        </li>
    `;
}