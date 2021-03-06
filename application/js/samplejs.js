function fadeOut(event){
    //use set interval

}

function createPhotoCard(data, containerDiv){
    // return `<div id = "post-${data.id}" class = "card">
    // <a href="/post/${data.id}"><img class = "card-image" src = "${data.thumbnail}"></a>
    // <div class = "card-body">
    //     <p class = "card-title">${data.title}</p>
    //     <p class = "card-description">${data.description}</p>
    // </div>
    // </div>`;
}

let mainDiv = document.getElementById("container");

if(mainDiv){
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchURL)
    .then((data) => data.json())
    .then((photos) => {
        let innerHTML = "";
        photos.forEach((photo) => {
            createPhotoCard(photo, mainDiv);
        });
        document.getElementById('item-count').innerHTML= `There are ${photos.length} photo(s) being shown` ;
    })
}