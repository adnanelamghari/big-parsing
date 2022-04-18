import { parseFile } from '../file-parsing/parser.controller';


/**
 * Initialize the app
 */
export async function initApp(): Promise<void> {
    console.log('Starting server ..');
    await parseFile();
}
