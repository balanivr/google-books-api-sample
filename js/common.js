try {
    window.addEventListener('load', init);
} catch (e) {
    console.log("Failed to load the init() function.\nMake sure common.js is loaded last");
}

function httpGet(url, callback)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4) {
            if (xhr.status) 
                callback(xhr.responseText, xhr.status);
            else {
                var failed = {
                    error: {
                        code: 0,
                        message: "Unable to process request"
                    }
                };
                
                callback(JSON.stringify(failed), 0);
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send(null);
}

function validQuery(query) {
    return query.length > 0 && query.length < 1024;
}

function formatQuery(query) {
    return query ? query.split(' ').join('+') : '';
}

function parseQuery(query) {
    return query ? query.split('+').join(' ') : '';
}

function getFromURL(parameter) {
    let urlParams = new URLSearchParams(location.search);
    parsed = urlParams.has(parameter) ? urlParams.get(parameter) : '';

    return parsed;
}