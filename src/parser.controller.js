const Parser = require('./parser');

class ParserController {
    parser;
    fileURL;

    constructor() {
        this.fileURL = 'data/input.json' // 'data/input.uglified.json'
        this.parser = new Parser(this.fileURL);
    }

    /**
     *
     */
    async start() {
        const id = process.argv[2];
        if (!id || !id.toString().length) {
            throw new Error('The Id of the record is missing');
        }
        console.log(`> Reading from ${this.fileURL} ..\n`);

        const result = await this.parser.getRecordById(+id);
        if (result) {
            console.log(result.name)
        } else {
            console.log('No record found')
        }
    }
}

module.exports = ParserController;
