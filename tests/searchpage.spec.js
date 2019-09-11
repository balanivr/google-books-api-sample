try {
    let test = loaded;
    test = RESULTS;
    test = query;
    test = getFromURL;
    test = formatQuery;
    test = parseQuery;
    test = httpGet;
    test = null;
} catch (e) {
    console.log("This spec is expected to be loaded after searchpage.js and common.js");
}

describe('Parse query from URL', () => {
    let query;
    let parsed;
    let search_container;

    beforeAll(() => search_container = document.createElement('input'));

    it('Fetches query', () => {
        query = getFromURL('query');

        expect(query).not.toBe(undefined);
        expect(typeof query).toBe("string");
    });

    it('Parses query', () => {
        parsed = parseQuery(query);

        expect(parsed).not.toBe(undefined);
        expect(typeof parsed).toBe("string");
        expect(parsed.indexOf('+')).toBe(-1);
    });
    
    it('Sets search box with query', () => {
        search_container.value = parseQuery(query);

        expect(search_container.value === parsed).toBe(true);
    });

    afterAll(() => search_container.remove());
});

describe('Hitting the Google Books API', () => {
    let url;
    let testApi;
    let json_response;
    let books;

    beforeAll(() => {
        url = `https://www.googleapis.com/books/v1/volumes?country=US&startIndex=${loaded}&maxResults=${RESULTS}&q=${query}`;
        testApi = action => {
            return new Promise(resolve => {
                httpGet(url, function(data, status) {
                    resolve(action(data, status));
                });
            });
        }; 
    });

    it('Resolves the URL without error', async () => {        
        var result = await testApi((response, status) => status);
        expect(result).not.toBe(null);
        expect(result).toBe(200);
    });

    it('Receives JSON response', async () => {
        var result = await testApi((response, status) => response);
        expect(result).not.toBe(null);
        expect(typeof result).toBe("string");
        expect(function() {
            try {
                json_response = JSON.parse(result);
            } catch (e) {
                return false;
            }
            return true;
        }()).toBe(true);
        expect(json_response).not.toBe(undefined);
    });

    it('Does not contain an error in response', () => {
        expect(json_response.error).toBe(undefined);
    });

    it('Responds with books under the key `items`', () => {
        books = json_response.items;
        expect(books).not.toBe(undefined);
    });

    it('Expected number of results are returned', () => {
        expect(books.length).toBeLessThanOrEqual(RESULTS);
    });
});