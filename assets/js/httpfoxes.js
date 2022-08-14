


async function getFoxes() {
    const response = await fetch('https://http-foxes-api.herokuapp.com/foxes');
    const data = await response.json();
    return data;
}

getFoxes().then(data => {
    const foxes = data;
    loadWebSite(foxes);
});


function loadWebSite(foxes) {
    const foxesContainer = document.getElementById('foxes-container');
    foxes.forEach(fox => {
        const foxElement = document.createElement('div');
        foxElement.className = 'fox';
        foxElement.innerHTML = `
            <li>
                <img src="${fox.url}" alt="${fox.description}" class="thumb-image" >
                <h2>${fox.code}</h2>
                <p>${fox.description}</p>
            </li>
        `;
        foxesContainer.appendChild(foxElement);
    } );
}

