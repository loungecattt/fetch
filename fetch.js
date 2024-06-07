'use strict';

let formAction = text => { 
    let url = setUrl(text);
    document.getElementById('bodySection').innerHTML = '';
    results(url);
};

let header = document.createElement('div');
header.id = 'header';
header.className = 'header';
document.body.appendChild(header);

let search = document.createElement('input');
search.id = 'search';
search.type = 'text';
search.className = 'input';
header.appendChild(search);

let go = document.createElement('button');
go.id = 'button';
go.className = 'button';
go.innerHTML = 'go';
go.onclick = () => formAction(search.value);
header.appendChild(go);

let bodySection = document.createElement('div');
bodySection.id = 'bodySection';
bodySection.className = 'bodySection';
document.body.appendChild(bodySection);

// document.querySelector("#button").onclick = () => formAction(search.value);

let setUrl = searchText => {
    let api = "https://api.unsplash.com";
    let method = "/search/photos";
    let client = "?client_id=blEZijDXtI-6CKxlsAjcbAvJekqbnBKXZw6uZF2FZOc";
    let requestType = "&query=";
    let perPage = "&per_page=30"
    return api + method + client + requestType + searchText + perPage;
};

let create = (object) => { 
    let element = document.createElement('div');
    element.className = 'img_wrap';

    element.onclick = event => {
        let fullImage = document.createElement('div');
        
        let img = createImg(event.target.src);
        img.className = 'fullImg';
        fullImage.appendChild(img);
        fullImage.className = 'showFull';
        document.body.appendChild(fullImage);

        let cont = document.createElement('div');
        cont.className = 'cont';
        fullImage.appendChild(cont);

        let user = document.createElement('div');
        user.innerHTML = "author: " + object.user.name;
        cont.appendChild(user);
        
        fullImage.onclick = () => {
            fullImage.innerHTML = '';
        };
    };

    let img = createPhoto(object.urls.regular);
    element.appendChild(img);
    bodySection.appendChild(element);
};

let createImg = (url) => {
    let element = document.createElement('img');
    element.src = url;
    return element
}

let createPhoto = (url) => {
    let element = document.createElement('img');
    element.src = url;
    return element;
};

let show = object => { 
    create(object);
};

let results = url => fetch(url)
.then(result => result.json())
.then(object => object.results)
.then(items => items.forEach(element => {
    show(element);
}))
.catch(console.error);
