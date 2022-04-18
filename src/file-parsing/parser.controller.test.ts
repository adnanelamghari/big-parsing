import assert from 'assert';
import { parseFile } from './parser.controller';

describe('ParserController', () => {

    describe('start', () => {
        describe('Given no record id', () => {
            it('should throw an exception', async () => {
                await assert.rejects(parseFile, Error);
            }).timeout(20000);
        });

        describe('Given a record id (82064)', () => {
            it('should not throw an exception', async () => {
                process.argv.push('id=82064');
                assert.doesNotThrow(await parseFile);
            });
        });
    })
});
