const assert = require("assert");
const Parser = require("../src/parser");

describe('Parser', () => {
    it('should be truthy', () => {
        const parser = new Parser();
        assert(parser);
    });

    describe('Given a non existing record id (8206466666666)', () => {
        it('should return null', () => {
            const parser = new Parser('data/input.json');
            const record = parser.getRecordById(8206466666666);
            assert.IsNull(record);
        });
    });

    describe('Given an existing record id (82064)', () => {
        it('should return Alec Mills', () => {
            const parser = new Parser('data/input.json');
            const record = parser.getRecordById(82064);
            assert.strictEqual(record.name, 'Alec Mills');
        });
    });
});
