import * as _ from 'lodash';

export class AgentTemplate {

    id: string;
    name: string;
    organizationId: string;
    url: string;
    apiKey: string | null;

    constructor() {
        this.id = '';
        this.name = '';
        this.organizationId = '';
        this.url = '';
        this.apiKey = null;
    }

    clone(): AgentTemplate {
        return _.cloneDeep(this);
    }

    static fromDto(dto: any): AgentTemplate {
        const template = new AgentTemplate();
        
        template.id = dto.id;
        template.name = dto.name;
        template.organizationId = dto.organizationId;
        template.url = dto.url;
        template.apiKey = dto.apiKey;
        
        return template;
    }
}