import { useFetch } from "./useFetch.js";
import { useFormat } from "./useFormat.js";

const headerDOM = document.querySelector("#header");
const mainDOM = document.querySelector("#main");
let sortByNum = true;
let currentPage = 1;
let pokeList

async function loadMore(page = "https://pokeapi.co/api/v2/pokemon") {
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
        pokeList.innerHTML += characters.sort((a, b) => a.name.localeCompare(b.name))
            .map(character => {
                return useFormat(character)
            }).join(" ");
    }

    mainDOM.innerHTML += `
        <nav class="page-nav">
            <button class="prev-bt --btn --clear" id="prevBtn">
                <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1044_208)">
                        <path d="M9.175 14.2L4.225 9.25C4.14167 9.16667 4.08333 9.08333 4.05 9C4.01667 8.91667 4 8.825 4 8.725C4 8.625 4.01667 8.53333 4.05 8.45C4.08333 8.36667 4.14167 8.28333 4.225 8.2L9.2 3.225C9.35 3.075 9.52917 3 9.7375 3C9.94583 3 10.125 3.075 10.275 3.225C10.425 3.375 10.4958 3.55833 10.4875 3.775C10.4792 3.99167 10.4 4.175 10.25 4.325L5.85 8.725L10.275 13.15C10.425 13.3 10.5 13.475 10.5 13.675C10.5 13.875 10.425 14.05 10.275 14.2C10.125 14.35 9.94167 14.425 9.725 14.425C9.50833 14.425 9.325 14.35 9.175 14.2Z" fill="white"/>
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
            <span class="page --white">${currentPage}</span>
            <button class="next-btn --btn --clear" id="nextBtn">
                <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1044_467)">
                        <path d="M4.21324 14.2131C4.0799 14.0464 4.00907 13.8631 4.00074 13.6631C3.9924 13.4631 4.06324 13.2881 4.21324 13.1381L8.61324 8.7381L4.18824 4.3131C4.0549 4.17976 3.9924 4.00059 4.00074 3.77559C4.00907 3.55059 4.0799 3.37143 4.21324 3.23809C4.3799 3.07143 4.55907 2.99226 4.75074 3.0006C4.9424 3.00893 5.11324 3.08809 5.26324 3.23809L10.2382 8.21309C10.3216 8.29643 10.3799 8.37976 10.4132 8.46309C10.4466 8.54643 10.4632 8.6381 10.4632 8.7381C10.4632 8.8381 10.4466 8.92976 10.4132 9.01309C10.3799 9.09643 10.3216 9.17976 10.2382 9.26309L5.28824 14.2131C5.13824 14.3631 4.96324 14.4339 4.76324 14.4256C4.56324 14.4173 4.3799 14.3464 4.21324 14.2131Z" fill="white"/>
                    </g>
                    <defs>
                        <filter id="filter0_d_1044_467" x="0" y="0" width="14.4631" height="19.4263" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1044_467"/>
                            <feOffset dy="1"/>
                            <feGaussianBlur stdDeviation="1.5"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1044_467"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1044_467" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </button>
        </nav>
    `;
    document.querySelector("#prevBtn").addEventListener("click", () => {
        // mainDOM.innerHTML = "";
        currentPage--
        loadMore(data.previous);
    });
    document.querySelector("#nextBtn").addEventListener("click", () => {
        // mainDOM.innerHTML = "";
        currentPage++
        loadMore(data.next);
    });
}

headerDOM.innerHTML = `
    <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.8572 12C14.8572 13.578 13.578 14.8571 12.0001 14.8571C10.4221 14.8571 9.14292 13.578 9.14292 12C9.14292 10.422 10.4221 9.14286 12.0001 9.14286C13.578 9.14286 14.8572 10.422 14.8572 12Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 24C18.0454 24 23.0467 19.5296 23.8785 13.7143H16.8503C16.1443 15.7118 14.2393 17.1429 12.0001 17.1429C9.76083 17.1429 7.85584 15.7118 7.14984 13.7143H0.121582C0.953404 19.5296 5.95468 24 12.0001 24ZM7.14984 10.2857H0.121582C0.953404 4.47035 5.95468 0 12.0001 0C18.0454 0 23.0467 4.47035 23.8785 10.2857H16.8503C16.1443 8.28824 14.2393 6.85714 12.0001 6.85714C9.76083 6.85714 7.85584 8.28824 7.14984 10.2857ZM14.8572 12C14.8572 13.578 13.578 14.8571 12.0001 14.8571C10.4221 14.8571 9.14292 13.578 9.14292 12C9.14292 10.422 10.4221 9.14286 12.0001 9.14286C13.578 9.14286 14.8572 10.422 14.8572 12Z" fill="white"/>
    </svg>
    <h1 class="heading">Pokédex</h1>
    <nav class="header-nav">
        <div class="search-container">
            <label class="search-label">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9 11.6333L6.88333 7.61667C6.55 7.90556 6.16111 8.13056 5.71667 8.29167C5.27222 8.45278 4.8 8.53333 4.3 8.53333C3.1 8.53333 2.08333 8.11667 1.25 7.28333C0.416667 6.45 0 5.44444 0 4.26667C0 3.08889 0.416667 2.08333 1.25 1.25C2.08333 0.416667 3.09444 0 4.28333 0C5.46111 0 6.46389 0.416667 7.29167 1.25C8.11944 2.08333 8.53333 3.08889 8.53333 4.26667C8.53333 4.74444 8.45555 5.20556 8.3 5.65C8.14444 6.09444 7.91111 6.51111 7.6 6.9L11.65 10.9167C11.75 11.0056 11.8 11.1194 11.8 11.2583C11.8 11.3972 11.7444 11.5222 11.6333 11.6333C11.5333 11.7333 11.4111 11.7833 11.2667 11.7833C11.1222 11.7833 11 11.7333 10.9 11.6333ZM4.28333 7.53333C5.18333 7.53333 5.95 7.21389 6.58333 6.575C7.21667 5.93611 7.53333 5.16667 7.53333 4.26667C7.53333 3.36667 7.21667 2.59722 6.58333 1.95833C5.95 1.31944 5.18333 1 4.28333 1C3.37222 1 2.59722 1.31944 1.95833 1.95833C1.31944 2.59722 1 3.36667 1 4.26667C1 5.16667 1.31944 5.93611 1.95833 6.575C2.59722 7.21389 3.37222 7.53333 4.28333 7.53333Z" fill="#DC0A2D"/>
                </svg>
            </label>
            <input type="text" id="search" class="searchbar" placeholder="Search">
        </div>
        <button class="sort" id="sort">
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.31975 10.6667C2.1642 10.6667 2.03642 10.6056 1.93642 10.4833C1.83642 10.3611 1.80864 10.2222 1.85309 10.0667L2.41975 7.83333H0.503086C0.347531 7.83333 0.216975 7.76944 0.11142 7.64167C0.00586422 7.51389 -0.0246914 7.37222 0.0197531 7.21667C0.0419753 7.10556 0.0975308 7.01389 0.18642 6.94167C0.275309 6.86944 0.380864 6.83333 0.503086 6.83333H2.66975L3.41975 3.83333H1.16975C1.0142 3.83333 0.883642 3.76944 0.778087 3.64167C0.672531 3.51389 0.641975 3.37222 0.68642 3.21667C0.708642 3.10556 0.764197 3.01389 0.853086 2.94167C0.941975 2.86944 1.04753 2.83333 1.16975 2.83333H3.66975L4.28642 0.366667C4.30864 0.255556 4.36142 0.166667 4.44475 0.1C4.52809 0.0333334 4.62531 0 4.73642 0C4.89198 0 5.01698 0.0611112 5.11142 0.183333C5.20586 0.305556 5.23642 0.444445 5.20309 0.6L4.65309 2.83333H7.66975L8.28642 0.366667C8.30864 0.255556 8.36142 0.166667 8.44475 0.1C8.52809 0.0333334 8.62531 0 8.73642 0C8.89197 0 9.01697 0.0611112 9.11142 0.183333C9.20586 0.305556 9.23642 0.444445 9.20309 0.6L8.65309 2.83333H10.5698C10.7253 2.83333 10.8559 2.89722 10.9614 3.025C11.067 3.15278 11.0975 3.29444 11.0531 3.45C11.0309 3.56111 10.9753 3.65278 10.8864 3.725C10.7975 3.79722 10.692 3.83333 10.5698 3.83333H8.40309L7.65309 6.83333H9.90309C10.0586 6.83333 10.1892 6.89722 10.2948 7.025C10.4003 7.15278 10.4309 7.29444 10.3864 7.45C10.3642 7.56111 10.3086 7.65278 10.2198 7.725C10.1309 7.79722 10.0253 7.83333 9.90309 7.83333H7.40309L6.78642 10.3C6.7642 10.3889 6.71697 10.4722 6.64475 10.55C6.57253 10.6278 6.4642 10.6667 6.31975 10.6667C6.1642 10.6667 6.03642 10.6056 5.93642 10.4833C5.83642 10.3611 5.80864 10.2222 5.85309 10.0667L6.41975 7.83333H3.40309L2.78642 10.3C2.7642 10.3889 2.71698 10.4722 2.64475 10.55C2.57253 10.6278 2.4642 10.6667 2.31975 10.6667ZM3.65309 6.83333H6.66975L7.41975 3.83333H4.40309L3.65309 6.83333Z" fill="#DC0A2D"/>
            </svg>
        </button>
    </nav>
`;

const sortBtn = document.querySelector("#sort");

document.querySelector("#search").addEventListener("input", async event => {
    if(event.target.value.length !== 0) {
        const searched = await useFetch(`https://pokeapi.co/api/v2/pokemon/${event.target.value}/`)
        pokeList.innerHTML = useFormat(searched)
    } else {
        pokeList.innerHTML = ""
        loadMore();
    }
});

sortBtn.addEventListener("click", () => {
    if(sortByNum) {
        pokeList.innerHTML = ""
        sortBtn.innerHTML = `
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 10C0.355556 10 0.236111 9.95278 0.141667 9.85833C0.0472223 9.76389 0 9.64444 0 9.5C0 9.35556 0.0472223 9.23611 0.141667 9.14167C0.236111 9.04722 0.355556 9 0.5 9H8.83333C8.97778 9 9.09722 9.04722 9.19167 9.14167C9.28611 9.23611 9.33333 9.35556 9.33333 9.5C9.33333 9.64444 9.28611 9.76389 9.19167 9.85833C9.09722 9.95278 8.97778 10 8.83333 10H0.5ZM3.21667 4.6H6.11667L4.7 0.9H4.63333L3.21667 4.6ZM1.95 7.33333C1.77222 7.33333 1.65556 7.275 1.6 7.15833C1.54444 7.04167 1.54444 6.9 1.6 6.73333L3.93333 0.516667C3.98889 0.372222 4.08611 0.25 4.225 0.15C4.36389 0.0499999 4.51111 0 4.66667 0C4.82222 0 4.96944 0.0499999 5.10833 0.15C5.24722 0.25 5.34444 0.372222 5.4 0.516667L7.73333 6.73333C7.78889 6.9 7.78889 7.04167 7.73333 7.15833C7.67778 7.275 7.56111 7.33333 7.38333 7.33333C7.29444 7.33333 7.21389 7.30833 7.14167 7.25833C7.06944 7.20833 7.02222 7.15 7 7.08333L6.35 5.35H2.96667L2.31667 7.08333C2.29444 7.15 2.24722 7.20833 2.175 7.25833C2.10278 7.30833 2.02778 7.33333 1.95 7.33333Z" fill="#DC0A2D"/>
            </svg>
        `;
        sortByNum = false
        loadMore("https://pokeapi.co/api/v2/pokemon/?limit=1350")
    } else {
        pokeList.innerHTML = ""
        sortBtn.innerHTML = `
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.31975 10.6667C2.1642 10.6667 2.03642 10.6056 1.93642 10.4833C1.83642 10.3611 1.80864 10.2222 1.85309 10.0667L2.41975 7.83333H0.503086C0.347531 7.83333 0.216975 7.76944 0.11142 7.64167C0.00586422 7.51389 -0.0246914 7.37222 0.0197531 7.21667C0.0419753 7.10556 0.0975308 7.01389 0.18642 6.94167C0.275309 6.86944 0.380864 6.83333 0.503086 6.83333H2.66975L3.41975 3.83333H1.16975C1.0142 3.83333 0.883642 3.76944 0.778087 3.64167C0.672531 3.51389 0.641975 3.37222 0.68642 3.21667C0.708642 3.10556 0.764197 3.01389 0.853086 2.94167C0.941975 2.86944 1.04753 2.83333 1.16975 2.83333H3.66975L4.28642 0.366667C4.30864 0.255556 4.36142 0.166667 4.44475 0.1C4.52809 0.0333334 4.62531 0 4.73642 0C4.89198 0 5.01698 0.0611112 5.11142 0.183333C5.20586 0.305556 5.23642 0.444445 5.20309 0.6L4.65309 2.83333H7.66975L8.28642 0.366667C8.30864 0.255556 8.36142 0.166667 8.44475 0.1C8.52809 0.0333334 8.62531 0 8.73642 0C8.89197 0 9.01697 0.0611112 9.11142 0.183333C9.20586 0.305556 9.23642 0.444445 9.20309 0.6L8.65309 2.83333H10.5698C10.7253 2.83333 10.8559 2.89722 10.9614 3.025C11.067 3.15278 11.0975 3.29444 11.0531 3.45C11.0309 3.56111 10.9753 3.65278 10.8864 3.725C10.7975 3.79722 10.692 3.83333 10.5698 3.83333H8.40309L7.65309 6.83333H9.90309C10.0586 6.83333 10.1892 6.89722 10.2948 7.025C10.4003 7.15278 10.4309 7.29444 10.3864 7.45C10.3642 7.56111 10.3086 7.65278 10.2198 7.725C10.1309 7.79722 10.0253 7.83333 9.90309 7.83333H7.40309L6.78642 10.3C6.7642 10.3889 6.71697 10.4722 6.64475 10.55C6.57253 10.6278 6.4642 10.6667 6.31975 10.6667C6.1642 10.6667 6.03642 10.6056 5.93642 10.4833C5.83642 10.3611 5.80864 10.2222 5.85309 10.0667L6.41975 7.83333H3.40309L2.78642 10.3C2.7642 10.3889 2.71698 10.4722 2.64475 10.55C2.57253 10.6278 2.4642 10.6667 2.31975 10.6667ZM3.65309 6.83333H6.66975L7.41975 3.83333H4.40309L3.65309 6.83333Z" fill="#DC0A2D"/>
            </svg>
        `;
        sortByNum = true
        loadMore()
    }
})

loadMore();
