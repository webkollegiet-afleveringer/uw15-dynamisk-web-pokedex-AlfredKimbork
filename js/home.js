import { nameIcon, pokeball, searchIcon, tagIcon } from "./icons.js";
import { loadMore, currentPage, setCurrentPage, pokeList } from "./useLoadMore.js";
import { useFetch } from "./useFetch.js";
import { useFormat } from "./useFormat.js";

export let currentPageHome = currentPage
export let sortByNum = true;

document.querySelector("#header").innerHTML = `
    ${pokeball}
    <a href="index.html" role="heading" value="1" class="heading">Pokédex</a>
    <nav class="header-nav">
        <div class="search-container">
            <label class="search-label">${searchIcon}</label>
            <input type="text" id="search" class="searchbar" placeholder="Search">
        </div>
        <button class="sort" id="sort">${tagIcon}</button>
    </nav>
`;

const sortBtn = document.querySelector("#sort");
const searchbar = document.querySelector("#search");

searchbar.addEventListener("input", async event => {
    pokeList = document.querySelector(".poke-list");
    pokeList.innerHTML = ""
    const input = event.target.value

    if(input.length !== 0) {
        let searched
        if(sortByNum) {
            searched = await useFetch(`https://pokeapi.co/api/v2/pokemon/${input}/`)
            pokeList.innerHTML = useFormat(searched)
        } else {
                const data = await useFetch("https://pokeapi.co/api/v2/pokemon/?limit=1350")
                searched = data.results.filter(pokemon => pokemon.name.includes(input))
                pokeList.innerHTML += searched
                    .map(searchResult => {
                        return useFormat(searchResult)
                    }).join(" ");
            }
    } else {
        loadMore();
    }
});

sortBtn.addEventListener("click", () => {
    searchbar.value = ""
    setCurrentPage(1)
    if(sortByNum) {
        pokeList.innerHTML = ""
        sortBtn.innerHTML = nameIcon
        sortByNum = false
        loadMore("https://pokeapi.co/api/v2/pokemon/?limit=1350")
    } else {
        pokeList.innerHTML = ""
        sortBtn.innerHTML = tagIcon
        sortByNum = true
        loadMore()
    }
})

loadMore();
