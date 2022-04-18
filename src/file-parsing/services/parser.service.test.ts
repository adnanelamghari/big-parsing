import assert from 'assert';
import { getRecordById } from './parser.service';

describe('Parser', () => {
    const fileURL = 'data/input.json';


    describe('getRecordById', () => {
        describe('Given a non existing record id (8206466666666)', () => {
            it('should return undefined', async () => {
                const record = await getRecordById(8206466666666, fileURL);
                assert.equal(record, undefined);
            }).timeout(20000);
        });

        describe('Given an existing record id (82064)', () => {
            it('should return Alec Mills', async () => {
                const record = await getRecordById(82064, fileURL);
                assert.strictEqual(record.name, 'Alec Mills');
            });
        });
    });
});
