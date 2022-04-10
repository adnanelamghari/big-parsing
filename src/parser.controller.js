const Parser = require('./parser');

class ParserController {
    parser;
    fileURL;

    constructor() {
        this.fileURL = 'data/input.json' // 'data/input.uglified.json'
        this.parser = new Parser();
    }

    /**
     *
     */
    start() {
        const id = process.argv[2];
        if (!id) {
            throw new Error('The Id of the record is missing');
        }

    }
}

module.exports = ParserController;
