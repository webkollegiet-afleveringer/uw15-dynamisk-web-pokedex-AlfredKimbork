import { useFetch } from "./useFetch.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = JSON.parse(params.get("id"));

const data = await useFetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)

console.log(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`)
data.types.forEach(type => console.log(type.type.name));
console.log(data.weight, "kg")
console.log(data.height, "m")
data.abilities.forEach(ability => console.log(ability.ability.name));
data.stats.forEach(stat => console.log(stat.base_stat, stat.stat.name));


if(id > 1 && id < 1025) {
    document.querySelector("#main").innerHTML = `<a href="card.html?id=${id+1}">next</a> <br><a href="card.html?id=${id-1}">prev</a>`;
} else if(id == 1) {
    document.querySelector("#main").innerHTML = `<a href="card.html?id=${id+1}">next</a> <br><a href="card.html?id=${1025}">prev</a>`;
} else if(id == 1025) {
    document.querySelector("#main").innerHTML = `<a href="card.html?id=${1}">next</a> <br><a href="card.html?id=${id-1}">prev</a>`;
} 



