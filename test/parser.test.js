const assert = require("assert");
const Parser = require("../src/parser");

describe('Parser', () => {
    const fileURL = 'data/input.json';

    it('should be truthy', () => {
        const parser = new Parser(fileURL);
        assert(parser);
    });

    describe('getRecordById', () => {
        describe('Given a non existing record id (8206466666666)', () => {
            it('should return undefined', async () => {
                const parser = new Parser(fileURL);
                const record = await parser.getRecordById(8206466666666);
                assert.equal(record, undefined);
            });
        });

        describe('Given an existing record id (82064)', () => {
            it('should return Alec Mills', async () => {
                const parser = new Parser(fileURL);
                const record = await parser.getRecordById(82064);
                assert.strictEqual(record.name, 'Alec Mills');
            });
        });
    })
});
