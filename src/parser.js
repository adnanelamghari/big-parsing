const Readline = require('readline');
const fs = require('fs');
const stream = require('stream');
const Record = require('./record.model')

/**
 * The file parser
 * @property readline {readline.Interface} instance
 * @property readStream {createReadStream} instance
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
            let record = undefined;
            this.readline
                .on('line', (line) => {
                    const parsedLine = this.parseLine(line);
                    parsedLine.forEach((chunk) => {
                        if (!chunk.startsWith('{') && !object.endsWith('{') && !chunk.startsWith('}')) {
                            chunk = ',' + chunk;
                        }
                        object += chunk;
                        if (chunk.includes('}') && this.isJsonString(object)) { // end of an object
                            record = new Record(JSON.parse(object));
                            if (record.id === id) {
                                this.readStream.destroy();
                                resolve(record);
                            } else {
                                record = undefined;
                            }
                            object = '';
                        }
                    })
                })
                .on('close', () => {
                    this.readStream.destroy();
                    resolve(record);
                })
                .on('error', (error) => {
                    this.readStream.destroy();
                    reject(error);
                })
        });
    }

    /**
     * Removes start and of objects and return line content split by commas
     * @param line {string}
     * @returns {string[]}
     */
    parseLine(line) {
        return line
            .trim()
            .replace('[', '') // remove start of list
            .replace(']', '') // remove end of list
            .split(',')
            .filter((chunk) => !!chunk.length); // remove empty chunks
    }

    /**
     * checks if a given string contain a valid json
     * @param string
     * @returns {boolean}
     */
    isJsonString(string) {
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    }
}

module.exports = Parser;
