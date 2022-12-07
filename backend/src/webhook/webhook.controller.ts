import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { WebHookService } from './webhook.service';
import { Public } from 'nest-keycloak-connect';

import { SseService } from './sse.service';
import { AgentEventService } from 'src/agent/agent-event.service';
import { AgentEvent } from 'src/model/agent-event.entity';
import { AgentService } from 'src/agent/agent.service';

@Controller('/api/v1')
export class WebHookController {


    constructor(private service: WebHookService, 
                private readonly sseService: SseService, 
                private readonly agentService: AgentService, 
                private readonly agentEventService: AgentEventService) { 
    }

    @Get('/webhooks/:agent')
    @Public()
    async get(@Param('agent') agent) {
      this.sseService.addEvent('Bonjour');
      return await this.service.get(agent);
    }

    @Sse('/sse')
    @Public()
    sse() {
      return this.sseService.sendEvents();
    }

    @Post(`/webhooks/:agent/topic/:topic`)
    @Public()
    async create(@Param('agent') agentSlug, @Param('topic') topic, @Body() payload: any) {
       console.log('Agent: ' + agentSlug);
       console.log('Topic: ' + topic);
       console.log('Payload: ' + payload);
       const data = {
        agent: agentSlug,
        topic: topic,
        payload: payload
       }
       this.sseService.addEvent({ data: data });
       let agentEvent = new AgentEvent();
       agentEvent.agentSlug = agentSlug;
       agentEvent.topic = topic;
       agentEvent.payload = payload;
       agentEvent.state = payload['rfc23_state'] ? payload['rfc23_state'] : payload['state'];
       agentEvent.connectionId = payload['connection_id'];
       agentEvent.createdBy = 'webhook';
       agentEvent.lastChangedBy = 'webhook'
       const agent = await this.agentService.getBySlug(agentSlug);
       if (agent) {
        this.agentEventService.create(agentEvent);
       }
    }
}
