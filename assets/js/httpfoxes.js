

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
    const loadingContainer = document.getElementById('loading-foxes');
    foxes.forEach(fox => {
        const foxElement = document.createElement('div');
        foxElement.className = 'fox';
        foxElement.innerHTML = `
            <li class="thumb-li">
                <img src="${fox.url}" alt="${fox.description}" class="thumb-image" draggable="false">
                <div class="infoContainer">
                    <h2>${fox.code}</h2>
                    <p>${fox.description}</p>
                </div>
            </li>
        `;
        foxesContainer.appendChild(foxElement);
    } );
    loadingContainer.style.display = 'none';
}

function copyToClipboard(l, i) {
    let last = Date.now();
    let link = document.getElementById(l.toString()).innerText;

    //Copy link to clipboard
    navigator.clipboard.writeText(link);

    //Remove current div with 'p_active' class
    let tags = document.getElementsByClassName('p_active');
    if (tags.length > 0) {
        for (t = 0; t < tags.length; t++) {
            tags[t].classList.remove('p_active');
        }
        document.getElementById(i).classList.add('p_active');
    }

    document.getElementById(i).classList.add('p_active');

    //Remove class after 1500ms
    setTimeout(() => {
        document.getElementById(i).classList.remove('p_active');
    }, 1500);
}

function toggleList() {
    //Toggle 'tableActive' class to display the Return Values
    document.getElementById('valueList').classList.toggle('tableActive');
}