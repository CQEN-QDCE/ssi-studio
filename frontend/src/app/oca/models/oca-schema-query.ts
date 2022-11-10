export class OcaSchemaQuery {
    
    public namespace: string | null = null; // Filter search to given namespace.
    public suggest: string | null = null; // List all schemas which namespace or name starts with given string (when provided rest of params are ignored).
    public q: string | null = null; // Search given string in all schema fields.
    public type: string | null = null; // Search in selected type (ex. 'capture_base' / 'overlay' / 'label' / 'entry' / ...).
    public limit: number = 1000; // Max number of results (default 1000).

    constructor() {
    }
}