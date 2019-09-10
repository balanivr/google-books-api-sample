describe('First test case', ()=> {
    let test;

    beforeEach(() => test = true);

    it('Should return true', ()=> {
        test = test;

        expect(test).toBe(true);
    });
    it('Should return false', ()=> {
        test = !test;

        expect(test).toBe(false);
    });
});