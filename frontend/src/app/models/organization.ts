export class Organization {

    public id: string;
    public name: string;
    public description: string;

    constructor() {
        this.id = '';
        this.name = '';
        this.description = '';
    }

    static fromDto(dto: any): Organization {
        let organization = new Organization();
        organization.id = dto.id;
        organization.name = dto.name;
        organization.description = dto.description;
        return organization;
    }
}