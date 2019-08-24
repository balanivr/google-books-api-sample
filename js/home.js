const query_container = document.getElementById("query-container");

function init() {
    query_container.addEventListener('keyup', function(e) {
        if (e.keyCode == 13) 
            search(query_container.value);
    });
}

function search(query) {
    if (!query) 
        query = query_container.value;

    query = query.split(' ').join('+');
    location.href = "./search.html?query=" + query;
}