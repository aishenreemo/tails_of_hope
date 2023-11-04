const routes = {
    404: "/pages/404.html",
    "/": "/pages/index.html",
    "/about": "/pages/about.html",
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
}

window.onpopstate = load;
window.route = route;

load();
