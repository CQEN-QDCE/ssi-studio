export class Laboratory {

    public id: string;
    public name: string;
    public description: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
    }

    static fromDto(dto: any): Laboratory {
        let laboratory = new Laboratory();
        laboratory.id = dto.id;
        laboratory.name = dto.name;
        laboratory.description = dto.description;
        return laboratory;
    }
}