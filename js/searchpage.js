const back_button           = document.getElementById('back-btn');
const title_container       = document.getElementById('page-title-container');
const query_container       = document.getElementById('query-container');
const search_container      = document.getElementById('search-container');
const books_container       = document.getElementById('books');
const search_button         = document.getElementById('mobile-search-btn');
const cancel_search_button  = document.getElementById('mobile-cancel-search-btn');

const loading_container     = document.getElementById('fetching-results-container');
const load_more_container   = document.getElementById('load-more-container');
const loaded_count          = document.getElementById('loaded-count');

const RESULTS = 20;
var loaded = 0;
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

    back_button.addEventListener('click', function() {
        window.location.href = "./index.html";
    });

    search_button.addEventListener('click', function() {
        title_container.classList.add('hidden');
        search_button.classList.add('hidden');

        query_container.classList.add('force-show');
        cancel_search_button.classList.remove('hidden');
    });

    cancel_search_button.addEventListener('click', function() {
        title_container.classList.remove('hidden');
        search_button.classList.remove('hidden');

        query_container.classList.remove('force-show');
        cancel_search_button.classList.add('hidden');
    });

    getResults();
}

function newQuery() {
    query = search_container.value.split(' ').join('+')
    location.href = `./search.html?query=${query}`;
}

function getResults() {
    loading_container.classList.remove('hidden');
    load_more_container.classList.add('hidden');

    let url = `https://www.googleapis.com/books/v1/volumes?country=US&startIndex=${loaded}&maxResults=${RESULTS}&q=${query}`;
    httpGet(url, function(data) {
        let response = JSON.parse(data);
        let results = response.totalItems;

        var books = response.items;
        loaded += books.length;
        books.forEach(book => {
            let info = book.volumeInfo;

            var title = info.title;
            var author = info.authors && info.authors.join(', ');
            var publisher = info.publisher;
            var image = info.imageLinks && info.imageLinks.thumbnail;
            var url=info.infoLink;

            addBook(title, author, publisher, image, url);
        });

        loading_container.classList.add('hidden');
        load_more_container.classList.remove('hidden');

        loaded_count.innerText = loaded;
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
    book_author.classList.add('subtitle');
    book_author.innerText = author !== undefined ? author : "Unknown Author";

    let book_publisher = document.createElement('p');
    book_publisher.innerText = publisher !== undefined ? publisher : "Unknown Publisher";

    info_container.appendChild(book_title);
    info_container.appendChild(book_author);
    info_container.appendChild(book_publisher);

    card.appendChild(image_container);
    card.appendChild(info_container);

    books_container.appendChild(card);
}