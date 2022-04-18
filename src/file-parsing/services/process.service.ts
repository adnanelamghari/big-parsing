/**
 * Reads returns an arg from process
 * @param key {string}
 */
export function getArgFromProcessArgs(key: string): string {
    const value = process.argv.find(element => element.startsWith(`${key}=`));
    if (!value) {
        return null;
    }
    return value.replace(`${key}=`, '');
}
