const search_container = document.getElementById('search-container');
const books_container = document.getElementById('books');
const RESULTS = 20;
var query;

function init() {
    let urlParams = new URLSearchParams(location.search);
    query = urlParams.has('query') ? urlParams.get('query') : '';

    search_container.value = query.split('+').join(' ');
    search_container.addEventListener('keyup', function(e) {
        if (e.keyCode == 13) {
            newQuery();
        }
    });

    getResults();
}

function newQuery() {
    query = search_container.value.split(' ').join('+')
    location.href = `./search.html?query=${query}`;
}

function getResults() {
    let url = `https://www.googleapis.com/books/v1/volumes?country=US&maxResults=${RESULTS}&q=${query}`;
    httpGet(url, function(data) {
        let response = JSON.parse(data);
        
        var books = response.items;
        books.forEach(book => {
            let info = book.volumeInfo;

            var title = info.title;
            var author = info.authors && info.authors.join(', ');
            var publisher = info.publisher;
            var image = info.imageLinks && info.imageLinks.thumbnail;
            var url=info.infoLink;

            addBook(title, author, publisher, image, url);
        });
    });
}

function addBook(title, author, publisher, image, url) {
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = url;
    card.target = "_blank";

    let image_container = document.createElement('div');
    image_container.classList.add('book-image');

    let book_image = document.createElement('img');
    book_image.src = image;

    if (image !== undefined)
        image_container.appendChild(book_image);

    let info_container = document.createElement('div');
    info_container.classList.add('book-info');

    let book_title = document.createElement('h2');
    book_title.innerText = title;

    let book_author = document.createElement('p');
    book_author.innerText = author !== undefined ? author : "Unknown Author";

    let book_publisher = document.createElement('p');
    book_publisher.innerText = publisher !== undefined ? author : "Unknown Publisher";

    info_container.appendChild(book_title);
    info_container.appendChild(book_author);
    info_container.appendChild(book_publisher);

    card.appendChild(image_container);
    card.appendChild(info_container);

    books_container.appendChild(card);
}