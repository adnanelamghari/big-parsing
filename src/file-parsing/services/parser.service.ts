import fs from 'fs';
import Readline from 'readline';
import { RecordModel } from '../../shared/models/record.model';

/**
 * returns the record with the given id
 * @param id {number} of the record we search for
 * @param fileURL {string} of the record we search for
 * @returns {Promise<RecordModel>}
 */
export async function getRecordById(id: number, fileURL: string): Promise<RecordModel> {
    const readStream = fs.createReadStream(fileURL, {flags: 'r', encoding: 'utf-8'});
    const readline = Readline.createInterface(readStream); // , new stream()
    return new Promise((resolve, reject) => {
        let object: string = ''; // to store objects as string
        let record: RecordModel = undefined;
        readline
            .on('line', (line: string) => {

                const parsedLine: string[] = parseLine(line);
                parsedLine.forEach((chunk) => {
                    if (!chunk.startsWith('{') && !object.endsWith('{') && !chunk.startsWith('}')) {
                        chunk = ',' + chunk;
                    }
                    object += chunk;
                    if (chunk.includes('}') && isJsonString(object)) { // end of an object
                        record = JSON.parse(object) as RecordModel;
                        if (record.id === id) {
                            readStream.destroy();
                            resolve(record);
                        } else {
                            record = undefined;
                        }
                        object = '';
                    }
                });

            })
            .on('close', () => {
                readStream.destroy();
                resolve(record);
            })
            .on('error', (error) => {
                readStream.destroy();
                reject(error);
            });
    });
}

/**
 * Removes start and of objects and return line content split by commas
 * @param line {string}
 * @returns {string[]}
 */
export function parseLine(line: string): string[] {
    return line
        .trim()
        .replace('[', '') // remove start of list
        .replace(']', '') // remove end of list
        .split(',')
        .filter((chunk) => !!chunk.length); // remove empty chunks
}

/**
 * checks if a given string contain a valid json
 * @param str
 * @returns {boolean}
 */
export function isJsonString(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
