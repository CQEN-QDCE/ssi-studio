import * as _ from 'lodash';
import { AgentEvent } from './agent-event';

export class AgentEventResult {

    total: number;
    agentEvents: AgentEvent[] = [];
    skip: number;
    take: number;

    constructor() {
        this.total = 0;
        this.skip = 0;
        this.take = 0;
    }

}