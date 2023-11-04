const routes = {
    404: "/pages/404.html",
    "/": "/pages/index.html",
    "/about": "/pages/about.html",
    "/shelter": "/pages/shelter.html",
};

function route(event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    load();
}

async function load() {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route);

    document.getElementById("main").innerHTML = await html.text();

    if (path == "/shelter") {
        await loadShelters();
    }
}

async function loadShelters() {
    const shelters = await fetch("data/shelters.json").then(r => r.json());
    const sheltersContainer = document.getElementById("shelters");

    for (let i = 0; i < shelters.length; i++) {
        const shelter = shelters[i];
        const element = document.createElement("a");

        element.href = shelter.link;
        element.target = "_blank";
        element.innerHTML = `<h2>${shelter.name}</h2>
<div>${shelter.address}</div>`;
        sheltersContainer.appendChild(element);
    }
}

window.onpopstate = load;
window.route = route;

load();
