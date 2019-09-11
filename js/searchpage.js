const back_button           = document.getElementById('back-btn');
const title_container       = document.getElementById('page-title-container');
const query_container       = document.getElementById('query-container');
const search_container      = document.getElementById('search-container');
const books_container       = document.getElementById('books');
const search_button         = document.getElementById('mobile-search-btn');
const cancel_search_button  = document.getElementById('mobile-cancel-search-btn');

const no_results            = document.getElementById('no-results');
const loading_container     = document.getElementById('fetching-results-container');
const load_more_container   = document.getElementById('load-more-container');
const loaded_count          = document.getElementById('loaded-count');

const RESULTS = 20;
var loaded = 0;
var query;

function init() {
    try {
        query = getFromURL('query');

        search_container.value = parseQuery(query);
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
    } catch (e) {
        console.log(e);
    }
}

function newQuery() {
    let readable_query = search_container.value;

    if (!validQuery(readable_query))
        return;

    query = formatQuery(readable_query);
    location.href = `./search.html?query=${query}`;
}

function getResults() {
    loading_container.classList.remove('hidden');
    load_more_container.classList.add('hidden');
    
    let url = `https://www.googleapis.com/books/v1/volumes?country=US&startIndex=${loaded}&maxResults=${RESULTS}&q=${query}`;
    httpGet(url, function(data) {
        var response = null;
        
        try {
            response = JSON.parse(data);
        } catch (e) {
            console.log('Unable to parse response');
        }

        if (!response) {
            showNoResults();
            return;
        }
        else if (response.error) {
            let code = response.error.code;
            let message = response.error.message;

            console.log(`Response Code: ${code}`);
            console.log(message);
            showNoResults();
            return;
        }

        var books = response.items;
        
        if (!books) {
            showNoResults();
            return;
        }
        
        loaded += books.length;

        books.forEach(book => {
            let info = book.volumeInfo;

            var title = info.title;
            var author = info.authors && info.authors.join(', ');
            var publisher = info.publisher;
            var image = info.imageLinks && info.imageLinks.thumbnail;
            var url = info.infoLink;

            books_container.appendChild(createBook(title, author, publisher, image, url));
        });

        loading_container.classList.add('hidden');
        load_more_container.classList.remove('hidden');

        loaded_count.innerText = loaded;
    });
}

function createBook(title, author, publisher, image, url) {
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
    book_title.classList.add('book-title');
    book_title.innerText = title;

    let book_author = document.createElement('p');
    book_author.classList.add('subtitle');
    book_author.classList.add('book-author');
    book_author.innerText = author !== undefined ? author : "Unknown Author";

    let book_publisher = document.createElement('p');
    book_publisher.classList.add('book-publisher');
    book_publisher.innerText = publisher !== undefined ? publisher : "Unknown Publisher";

    info_container.appendChild(book_title);
    info_container.appendChild(book_author);
    info_container.appendChild(book_publisher);

    card.appendChild(image_container);
    card.appendChild(info_container);

    return card;
}

function showNoResults() {
    loading_container.classList.add('hidden');
    no_results.classList.remove('hidden');
}