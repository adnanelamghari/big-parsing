const assert = require("assert");
const ParserController = require("../src/parser.controller");

describe('ParserController', () => {
    it('should be truthy', () => {
        const parserController = new ParserController();
        assert(parserController);
    });

    describe('Given no record id', () => {
        it('should throw an exception', () => {
            const parserController = new ParserController();
            assert.throws(parserController.start, Error);
        });
    });

    describe('Given a record id (82064)', () => {
        it('should not throw an exception', () => {
            const parserController = new ParserController();
            process.argv.push(82064);
            assert.doesNotThrow(parserController.start);
        });
    });
});
