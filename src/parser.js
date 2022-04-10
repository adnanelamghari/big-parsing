const Readline = require('readline');
const fs = require('fs');
const stream = require('stream');
const Record = require('./record.model')

/**
 * The file parser
 * @property readline {readline.Interface} instance
 * @property readStream {createReadStream} inctance
 */
class Parser {
    readStream;
    readline;

    constructor(fileURL) {
        this.readStream = fs.createReadStream(fileURL, {flags: 'r', encoding: 'utf-8'});
        this.readline = Readline.createInterface(this.readStream, new stream());
    }

    /**
     * returns the record with the given id
     * @param id {number} of the record we search for
     * @returns {Promise<Record>}
     */
    async getRecordById(id) {
        return new Promise((resolve, reject) => {
            let object = ''; // to store objects as string
            let result = undefined;
            this.readline
                .on('line', (line) => {
                    let parsedLine = this.parseLine(line);
                    object += parsedLine;
                    if (parsedLine.includes('}')) { // end of an object
                        result = new Record(JSON.parse(object));
                        if (result.id === id) {
                            this.readStream.destroy();
                            resolve(result);
                        } else {
                            result = undefined;
                        }
                        object = '';
                    }
                })
                .on('close', () => {
                    this.readStream.destroy();
                    resolve(result);
                })
                .on('error', (error) => {
                    this.readStream.destroy();
                    reject(error);
                })
        });
    }

    /**
     * Removes start and of objects and return line without comma
     * @param line {string}
     * @returns {string}
     */
    parseLine(line) {
        let parsedLine = line
            .trim()
            .replace('[', '') // remove start of list
            .replace(']', '') // remove end of list
            .split('},')[0];
        parsedLine = (line.includes('}') && parsedLine === '') ? '}' : parsedLine;
        return parsedLine;
    }
}

module.exports = Parser;
