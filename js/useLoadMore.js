import { leftArrow, rightArrow} from "./icons.js";
import { useFetch } from "./useFetch.js";
import { useFormat } from "./useFormat.js";
import { sortByNum, currentPageHome } from "./home.js";

const mainDOM = document.querySelector("#main");
export let pokeList
let batchSize = 40
export let currentPage = 1;
export const setCurrentPage = (newPage) => currentPage = newPage


export async function loadMore(page = `https://pokeapi.co/api/v2/pokemon/?limit=${batchSize}`) {
    const data = await useFetch(page);
    const characters = data.results;
    // const observer = new IntersectionObserver(entries => {
        //     if (entries[0].isIntersecting) {
            //         loadMore(data.next);
            //         observer.unobserve(entries[0].target);
            //     }
            // }, {
                //     rootMargin: "0 0 1000px 0",
                // });
                
    mainDOM.innerHTML = `<ul class="poke-list"></ul>`;
    pokeList = document.querySelector(".poke-list");

    if(sortByNum) {
        pokeList.innerHTML += characters
            .map(character => {
                return useFormat(character)
            }).join(" ");
    
        // observer.observe(document.querySelector("li:last-child"));
    } else {
        characters.sort((a, b) => a.name.localeCompare(b.name))
            for (let i = (currentPage * batchSize) - batchSize; i < currentPage * batchSize; i++) {
                pokeList.innerHTML += useFormat(characters[i]);
                
                
            }
        // pokeList.innerHTML += characters.sort((a, b) => a.name.localeCompare(b.name))
        //     .map(character => {
        //         return useFormat(character)
        //     }).join(" ");
    }
    
    mainDOM.innerHTML += `
            <nav class="page-nav">
                <button class="prev-bt --btn --clear" id="prevBtn">
                    ${leftArrow}
                </button>
                <span class="page --white">${currentPage} / ${Math.ceil(data.count / batchSize)}</span>
                <button class="next-btn --btn --clear" id="nextBtn">
                    ${rightArrow}
                </button>
            </nav>
        `;
        document.querySelector("#prevBtn").addEventListener("click", () => {
            if(currentPage > 1) {
                currentPage--
                if(sortByNum) loadMore(`https://pokeapi.co/api/v2/pokemon/?limit=${batchSize}&offset=${(currentPage * batchSize) - batchSize}`)
                    else loadMore("https://pokeapi.co/api/v2/pokemon/?limit=1350")
            }
        });
    
        document.querySelector("#nextBtn").addEventListener("click", () => {
            if(currentPage < Math.ceil(data.count / batchSize)) {
    
                currentPage++
                if(sortByNum) loadMore(`https://pokeapi.co/api/v2/pokemon/?offset=${(currentPage * batchSize) - batchSize}&limit=${batchSize}`)
                    else loadMore("https://pokeapi.co/api/v2/pokemon/?limit=1350");
            }
        });
    }