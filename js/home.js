const query_container = document.getElementById("query-container");
const error_container = document.getElementById("error-container");

function init() {
    query_container.addEventListener('keyup', function(e) {
        if (e.keyCode == 13) 
            search(query_container.value);
    });
}

function search(query) {
    if (!query) 
        query = query_container.value;

    if (!validQuery(query)) {
        error_container.classList.remove('hidden');
        return;
    }

    query = formatQuery(query);
    location.href = `./search.html?query=${query}`;
}