import { RecordModel } from '../shared/models/record.model';
import { getRecordById } from './services/parser.service';
import { getArgFromProcessArgs } from './services/process.service';


/**
 *
 */
export async function parseFile(): Promise<void> {
    const fileURL = 'data/input.json';
    const id = getArgFromProcessArgs('id');
    if (!id || !id.toString().length) {
        throw new Error('The Id of the record is missing');
    }
    console.log(`             > Reading from ${fileURL} ..`);
    try {
        const result: RecordModel = await getRecordById(+id, fileURL);
        if (result) {
            console.log(`             > Result : ${result.name}`);
        } else {
            console.log('             > No record found');
        }
    } catch (e) {
        console.log(e);
    }
}
