describe('Parse query from URL', () => {
    let query;
    let parsed;

    it('Fetches query', () => {
        query = getFromURL('query');

        expect(query).not.toBe(null);
    });

    it('Parses query', () => {
        parsed = query.split('+').join(' ');

        expect(parsed.indexOf('+')).toBe(-1);
    });
    
    it('Sets search box with query', () => {
        const search_container = document.createElement('input');
        search_container.value = query.split('+').join(' ');

        expect(search_container.value === parsed).toBe(true);
    });
});