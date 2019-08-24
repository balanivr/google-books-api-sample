const search_container = document.getElementById('search-container');
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

            addBook(title, author, publisher, image);
        });
    });
}

function addBook(title, author, publisher, image) {
    console.log(title);
    console.log(author);
    console.log(publisher);
    console.log(image);
}