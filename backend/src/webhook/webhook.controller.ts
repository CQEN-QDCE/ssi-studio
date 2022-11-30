import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { WebHookService } from './webhook.service';
import { Public } from 'nest-keycloak-connect';

import { SseService } from './sse.service';

@Controller('/api/v1')
export class WebHookController {


    constructor(private service: WebHookService, private readonly sseService: SseService) { 
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
    async create(@Param('agent') agent, @Param('topic') topic, @Body() payload: any) {
       console.log('Agent: ' + agent);
       console.log('Topic: ' + topic);
       console.log('Payload: ' + payload);
       const data = {
        agent: agent,
        topic: topic,
        payload: payload
       }
       this.sseService.addEvent({data: data});
    }
}
