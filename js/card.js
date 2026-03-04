import { useFetch } from "./useFetch.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");
const page = params.get("page");

const data = await useFetch(`https://swapi.dev/api/${page}/${id}/?format=json`)
console.log(data)
let filmData = await Promise.all(data.films.map(film => useFetch(film)))
let shipData = await Promise.all(data.starships.map(ship => useFetch(ship)))
console.log(shipData)
let vehicleData = await Promise.all(data.vehicles.map(vehicle => useFetch(vehicle)))
console.log(vehicleData)

const mainDOM = document.querySelector("#main");


const card = document.createElement("div");
card.classList.add("__card")
const pokeNav = document.createElement("nav");
pokeNav.classList.add("__pokeNav", "--flex")

mainDOM.innerHTML = `
    <section class="__header">
        <a href="index.html">
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_1043_72)">
                    <path d="M13.5667 23.2333L4.3 13.9667C4.18889 13.8556 4.11111 13.7444 4.06667 13.6333C4.02222 13.5222 4 13.4 4 13.2667C4 13.1333 4.02222 13.0111 4.06667 12.9C4.11111 12.7889 4.18889 12.6778 4.3 12.5667L13.6 3.26667C13.7778 3.08889 14 3 14.2667 3C14.5333 3 14.7667 3.1 14.9667 3.3C15.1667 3.5 15.2667 3.73333 15.2667 4C15.2667 4.26667 15.1667 4.5 14.9667 4.7L7.4 12.2667H23.9333C24.2222 12.2667 24.4611 12.3611 24.65 12.55C24.8389 12.7389 24.9333 12.9778 24.9333 13.2667C24.9333 13.5556 24.8389 13.7944 24.65 13.9833C24.4611 14.1722 24.2222 14.2667 23.9333 14.2667H7.4L15 21.8667C15.1778 22.0444 15.2667 22.2667 15.2667 22.5333C15.2667 22.8 15.1667 23.0333 14.9667 23.2333C14.7667 23.4333 14.5333 23.5333 14.2667 23.5333C14 23.5333 13.7667 23.4333 13.5667 23.2333V23.2333Z" fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_1043_72" x="0" y="0" width="28.9333" height="28.5333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1043_72"/>
                        <feOffset dy="1"/>
                        <feGaussianBlur stdDeviation="1.5"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1043_72"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1043_72" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </a>
        <h1 class="--capatalize">${data.name}</h1>
    </section>
    <img class="__img" src="../assets/img/${id}.jpg" alt="${data.name}">
`;


card.innerHTML += `
    <h2 class="--colored --center">About</h2>
    <ul class="__attributes">
        <li>
            <div>
                <svg width="22" height="20" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.995737 11.3333H9.7624L8.7124 4H2.04574L0.995737 11.3333ZM5.37907 3C5.66796 3 5.90685 2.90278 6.09574 2.70833C6.28463 2.51389 6.37907 2.27778 6.37907 2C6.37907 1.71111 6.28463 1.47222 6.09574 1.28333C5.90685 1.09444 5.66796 1 5.37907 1C5.10129 1 4.86518 1.09444 4.67074 1.28333C4.47629 1.47222 4.37907 1.71111 4.37907 2C4.37907 2.27778 4.47629 2.51389 4.67074 2.70833C4.86518 2.90278 5.10129 3 5.37907 3ZM7.1124 3H8.7124C8.96796 3 9.19018 3.08056 9.37907 3.24167C9.56796 3.40278 9.67907 3.61111 9.7124 3.86667L10.7457 11.2C10.7902 11.5 10.7152 11.7639 10.5207 11.9917C10.3263 12.2194 10.0735 12.3333 9.7624 12.3333H0.995737C0.684625 12.3333 0.431847 12.2194 0.237403 11.9917C0.0429586 11.7639 -0.0320413 11.5 0.0124031 11.2L1.04574 3.86667C1.07907 3.61111 1.19018 3.40278 1.37907 3.24167C1.56796 3.08056 1.79018 3 2.04574 3H3.64574C3.55685 2.84444 3.49018 2.68611 3.44574 2.525C3.40129 2.36389 3.37907 2.18889 3.37907 2C3.37907 1.44444 3.57351 0.972222 3.9624 0.583333C4.35129 0.194444 4.82351 0 5.37907 0C5.93463 0 6.40685 0.194444 6.79574 0.583333C7.18463 0.972222 7.37907 1.44444 7.37907 2C7.37907 2.18889 7.35685 2.36389 7.3124 2.525C7.26796 2.68611 7.20129 2.84444 7.1124 3ZM0.995737 11.3333H9.7624H0.995737Z" fill="#1D1D1D"/>
                </svg>
                <span>${data.mass} kg</span>
            </div>
            <h3 class="--light --center">Weight</h3>
        </li>
        <li>
            <div>
                <svg width="16" height="20" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-2.38419e-07 1C-2.38419e-07 0.733333 0.1 0.5 0.3 0.3C0.5 0.1 0.733333 0 1 0L7 0C7.25556 0 7.48611 0.1 7.69167 0.3C7.89722 0.5 8 0.733333 8 1V12.3333C8 12.6 7.89722 12.8333 7.69167 13.0333C7.48611 13.2333 7.25556 13.3333 7 13.3333H1C0.733333 13.3333 0.5 13.2333 0.3 13.0333C0.1 12.8333 -2.38419e-07 12.6 -2.38419e-07 12.3333V1ZM1 1L1 12.3333H7V10.1667H4V9.16667H7L7 7.16667H4V6.16667H7V4.16667H4V3.16667L7 3.16667V1L1 1ZM4 3.16667V4.16667V3.16667ZM4 6.16667V7.16667V6.16667ZM4 9.16667V10.1667V9.16667Z" fill="#1D1D1D"/>
                </svg>
                <span>${data.height} cm</span>
            </div>
            <h3 class="--light --center">Height</h3>
        </li>
        <li>
            <div>
                <svg fill="#000000" width="22px" height="22px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6,22H18a3,3,0,0,0,3-3V7a2,2,0,0,0-2-2H17V3a1,1,0,0,0-2,0V5H9V3A1,1,0,0,0,7,3V5H5A2,2,0,0,0,3,7V19A3,3,0,0,0,6,22ZM5,12.5a.5.5,0,0,1,.5-.5h13a.5.5,0,0,1,.5.5V19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1Z"/>
                </svg>
                <span>${data.birth_year}</span>
            </div>
            <h3 class="--light --center">Birth</h3>
        </li>
    </ul>
    <ul>
        ${filmData.map(film => {
            return `<li>${film.title} :: ep. ${film.episode_id}</li>`
        }).join("")}
    </ul>
    <ul>
        ${shipData.map(ship => {
            return `<li>${ship.model} :: ${ship.starship_class}</li>`
        }).join("")}
    </ul>
    <ul>
        ${vehicleData.map(vehicle => {
            return `<li>${vehicle.model} :: ${vehicle.vehicle_class}</li>`
        }).join("")}
    </ul>
`;

mainDOM.append(card)








