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
                callback(xhr.responseText);
            else {
                var failed = {
                    error: {
                        code: 0,
                        message: "Unable to process request"
                    }
                };
                
                callback(JSON.stringify(failed));
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send(null);
}

function validQuery(query) {
    return query.length > 0;
}