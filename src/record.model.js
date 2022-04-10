/**
 *
 * @typedef {Object} Record
 * @property {number} id - The id of the record
 * @property {string} name - The name of the record
 */
class Record {
    id;
    name;

    /**
     * @param  {Record} object
     */
    constructor(object) {
        this.id = object.id;
        this.name = object.name;
    }
}

module.exports = Record;
