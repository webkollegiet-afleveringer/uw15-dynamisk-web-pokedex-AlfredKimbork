import { useFetch } from "./useFetch.js";
import { formatList } from "./formats/formatList.js";
import { params } from "./useParams.js";

let page = params.get("page");
const headerDOM = document.querySelector("#header");
const mainDOM = document.querySelector("#main");
let sortByNum = true;
let currentPage = 1;
let list

if(page === null) page = "people"

async function loadMore(url = ``) {
    console.log("triggered")
    const data = await useFetch(url);
    const characters = data.results;
    mainDOM.innerHTML = `<ul class="__list"></ul>`;
    list = document.querySelector(".__list");

    if(sortByNum) {
        list.innerHTML += characters
            .map(character => {
                return formatList(character, page)
            }).join(" ");
    }

    mainDOM.innerHTML += `
        <nav class="page-nav">
            <button class="prev-btn --btn --clear" id="prevBtn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1044_208)">
                        <path d="M9.175 14.2L4.225 9.25C4.14167 9.16667 4.08333 9.08333 4.05 9C4.01667 8.91667 4 8.825 4 8.725C4 8.625 4.01667 8.53333 4.05 8.45C4.08333 8.36667 4.14167 8.28333 4.225 8.2L9.2 3.225C9.35 3.075 9.52917 3 9.7375 3C9.94583 3 10.125 3.075 10.275 3.225C10.425 3.375 10.4958 3.55833 10.4875 3.775C10.4792 3.99167 10.4 4.175 10.25 4.325L5.85 8.725L10.275 13.15C10.425 13.3 10.5 13.475 10.5 13.675C10.5 13.875 10.425 14.05 10.275 14.2C10.125 14.35 9.94167 14.425 9.725 14.425C9.50833 14.425 9.325 14.35 9.175 14.2Z" fill="#171717"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_1044_208" x="0" y="0" width="14.5" height="19.425" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1044_208"/>
                            <feOffset dy="1"/>
                            <feGaussianBlur stdDeviation="1.5"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1044_208"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1044_208" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </button>
            <span class="page">${currentPage} / ${Math.ceil(data.count / 10)}</span>
            <button class="next-btn --btn --clear" id="nextBtn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1044_467)">
                        <path d="M4.21324 14.2131C4.0799 14.0464 4.00907 13.8631 4.00074 13.6631C3.9924 13.4631 4.06324 13.2881 4.21324 13.1381L8.61324 8.7381L4.18824 4.3131C4.0549 4.17976 3.9924 4.00059 4.00074 3.77559C4.00907 3.55059 4.0799 3.37143 4.21324 3.23809C4.3799 3.07143 4.55907 2.99226 4.75074 3.0006C4.9424 3.00893 5.11324 3.08809 5.26324 3.23809L10.2382 8.21309C10.3216 8.29643 10.3799 8.37976 10.4132 8.46309C10.4466 8.54643 10.4632 8.6381 10.4632 8.7381C10.4632 8.8381 10.4466 8.92976 10.4132 9.01309C10.3799 9.09643 10.3216 9.17976 10.2382 9.26309L5.28824 14.2131C5.13824 14.3631 4.96324 14.4339 4.76324 14.4256C4.56324 14.4173 4.3799 14.3464 4.21324 14.2131Z" fill="#171717"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_1044_467" x="0" y="0" width="14.4631" height="19.4263" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1044_467"/>
                            <feGaussianBlur stdDeviation="1.5"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feOffset dy="1"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1044_467"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1044_467" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </button>
        </nav>
    `;
    if(currentPage > 1) {
        document.querySelector("#prevBtn").addEventListener("click", () => {
            currentPage--
            loadMore(data.previous);
        });
    } else document.querySelector("#prevBtn").classList.add("--off")

    if(currentPage < Math.ceil(data.count / 10)) {
        document.querySelector("#nextBtn").addEventListener("click", () => {
            currentPage++
            loadMore(data.next);
        });
    } else document.querySelector("#nextBtn").classList.add("--off")
}

headerDOM.innerHTML = `
    <a href="index.html" role="heading" value="1" class="heading --hollow">Star Regristry</a>
    <nav class="header-nav">
        <ul>
            <li><a href="index.html?page=people">People</a></li>
            <li><a href="index.html?page=planets">Planets</a></li>
            <li><a href="index.html?page=starships">Starships</a></li>
        </ul>
    </nav>
        <div class="search-container">
            <label class="search-label">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9 11.6333L6.88333 7.61667C6.55 7.90556 6.16111 8.13056 5.71667 8.29167C5.27222 8.45278 4.8 8.53333 4.3 8.53333C3.1 8.53333 2.08333 8.11667 1.25 7.28333C0.416667 6.45 0 5.44444 0 4.26667C0 3.08889 0.416667 2.08333 1.25 1.25C2.08333 0.416667 3.09444 0 4.28333 0C5.46111 0 6.46389 0.416667 7.29167 1.25C8.11944 2.08333 8.53333 3.08889 8.53333 4.26667C8.53333 4.74444 8.45555 5.20556 8.3 5.65C8.14444 6.09444 7.91111 6.51111 7.6 6.9L11.65 10.9167C11.75 11.0056 11.8 11.1194 11.8 11.2583C11.8 11.3972 11.7444 11.5222 11.6333 11.6333C11.5333 11.7333 11.4111 11.7833 11.2667 11.7833C11.1222 11.7833 11 11.7333 10.9 11.6333ZM4.28333 7.53333C5.18333 7.53333 5.95 7.21389 6.58333 6.575C7.21667 5.93611 7.53333 5.16667 7.53333 4.26667C7.53333 3.36667 7.21667 2.59722 6.58333 1.95833C5.95 1.31944 5.18333 1 4.28333 1C3.37222 1 2.59722 1.31944 1.95833 1.95833C1.31944 2.59722 1 3.36667 1 4.26667C1 5.16667 1.31944 5.93611 1.95833 6.575C2.59722 7.21389 3.37222 7.53333 4.28333 7.53333Z" fill="#FFE820"/>
                </svg>
            </label>
            <input type="text" id="search" class="searchbar" placeholder="Search">
        </div>
`;


document.querySelector("#search").addEventListener("input", async event => {
    list = document.querySelector(".__list");

    if(event.target.value.length !== 0) {
        list.innerHTML = "";
        loadMore(`https://swapi.dev/api/${page}/?search=${event.target.value}&format=json`)
    } else {
        list.innerHTML = "";
        if (page) loadMore(`https://swapi.dev/api/${page}/?format=json`);
            else loadMore(`https://swapi.dev/api/people/?format=json`);
    }
});

if (page) loadMore(`https://swapi.dev/api/${page}/?format=json`);
    else loadMore(`https://swapi.dev/api/people/?format=json`);
