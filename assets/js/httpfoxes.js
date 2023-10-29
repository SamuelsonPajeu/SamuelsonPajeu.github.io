
const foxesContainer = document.getElementById('foxes-container');
const loadingContainer = document.getElementById('loading-foxes');

let foxes;

console.log(loadingContainer.style.innerText);

async function getFoxes() {
    const response = await fetch('https://http-foxes-api.onrender.com/foxes');
    const data = await response.json();
    return data;
}

function loadWebSite(foxes) {    
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

getFoxes().then(data => {
    foxes = data;
    loadWebSite(foxes);
}).catch(error => {
    loadingContainer.querySelector("#loading-foxes > h2").innerText = "ERROR ON LOADING";
    loadingContainer.querySelector("#fox-img-1").style.display = 'none';
    loadingContainer.querySelector("#fox-img-2").style.display = 'block';
    throw(error);
});