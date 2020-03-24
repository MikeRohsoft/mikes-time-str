const time = require('./time');
describe('Time Tests', () => {
    it('Date 9/11 time str', () => {
        const catastrophy = new Date(2011, 8, 11);
        const compare = new Date(2020, 2, 24);
        const result = compare.getTime() - catastrophy.getTime();
        const test = time.timeToStr(result);
        expect(test).toBe('8y 195d 59m 59s');
    });

    it('Date 9/11 time int', () => {
        const compare = new Date(2020, 2, 24);
        const t = time.strToTime('8y 195d 59m 59');
        const result = new Date(compare.getTime() - t);
        expect(result.getFullYear()).toBe(2011);
        expect(result.getMonth()).toBe(8);
        expect(result.getDate()).toBe(11);
    });

    it('play with 1 Minute', () => {
        const min = time.strToTime('60');
        const str = time.strToTime((min / 1000).toString());
        const t = time.timeToStr(str);
        expect(t).toBe('59s');
    });
});