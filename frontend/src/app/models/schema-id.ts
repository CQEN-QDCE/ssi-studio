export class SchemaId {

    public did: string = '';
    public marker: number = 2;
    public name: string = '';
    public version: string = '';

    constructor() {
    }

    public static parse(value: string): SchemaId {
        const parts: string[] = value.split(':');
        const schemaId = new SchemaId();
        schemaId.did = parts[0];
        schemaId.marker = parseInt(parts[1]);
        schemaId.name = parts[2];
        schemaId.version = parts[3];
        return schemaId;
    }

    public toString(): string {
        return `${this.did}:${this.marker}:${this.name}:${this.version}`
    }
}
