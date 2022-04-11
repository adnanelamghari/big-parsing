const assert = require("assert");
const ParserController = require("../src/parser.controller");

describe('ParserController', () => {
    it('should be truthy', () => {
        const parserController = new ParserController();
        assert(parserController);
    });

    describe('start', () => {
        describe('Given no record id', () => {
            it('should throw an exception', async () => {
                const parserController = new ParserController();
                await assert.rejects(parserController.start);
            });
        });

        describe('Given a record id (82064)', () => {
            it('should not throw an exception', async () => {
                const parserController = new ParserController();
                process.argv.push(82064);
                assert.doesNotThrow(await parserController.start);
            });
        });
    })
});
