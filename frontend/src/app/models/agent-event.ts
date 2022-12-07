import * as _ from 'lodash';

export class AgentEvent {

    id: string;
    agentSlug: string;
    topic: string;
    state: string;
    connectionId: string;
    payload: string;
    createdAt: Date;

    constructor() {
        this.id = '';
        this.agentSlug = '';
        this.topic = '';
        this.state = '';
        this.connectionId = '';
        this.payload = '';
        this.createdAt = new Date();
    }

    clone(): AgentEvent {
        return _.cloneDeep(this);
    }

    static fromDto(dto: any): AgentEvent {
        const agentEvent = new AgentEvent();
        
        agentEvent.id = dto.id;
        agentEvent.agentSlug = dto.agentSlug;
        agentEvent.topic = dto.topic;
        agentEvent.state = dto.state;
        agentEvent.connectionId = dto.connectionId;
        agentEvent.payload = dto.payload;
        agentEvent.createdAt = new Date(dto.createDateTime);
        return agentEvent;
    }
}