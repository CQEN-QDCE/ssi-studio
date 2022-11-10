import { Schema } from "./schema";

export class CreateSchemaResponse {

    public schemaId: string = '';
    public schema: Schema = new Schema();

    constructor() {
    }
}