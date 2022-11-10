export class Schema {

    public id: string = '';
    public name: string = '';
    public version: string = '';
    public sequenceNumber: number = 0;
    public attributeNames: string[]  = [];

    constructor() {
    }

    public toString(): string {
        return `${this.id}:2:${this.name}:${this.version}`
    } 

    public clone(): Schema {
        const clone = new Schema();
        clone.id = this.id;
        clone.name = this.name;
        clone.version = this.version;
        clone.sequenceNumber = this.sequenceNumber;
        for (const attributeName of this.attributeNames) {
            clone.attributeNames.push(attributeName);
        }
        return clone;
    }

    static fromDto(dto: any): Schema {
        let schema = new Schema();
        schema.id = dto.id;
        schema.name = dto.name;
        schema.version = dto.version;
        schema.sequenceNumber = dto.sequenceNumber;
        for (const attr of dto.attributeNames) schema.attributeNames.push(attr);
        return schema;
    }
}