import * as _ from 'lodash';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AgentTemplate } from '../models/agent-template';
import { AgentTemplateService } from '../services/agent-template.service';
import { ServerService } from '../services/server.service';
import { AgentConfig } from '../models/agent-config';

@Component({
  selector: 'agent-template-details',
  templateUrl: './agent-template-details.component.html',
  styleUrls: ['./agent-template-details.component.css']
})
export class AgentTemplateDetailsComponent implements OnInit, OnDestroy {

  agentTemplate: AgentTemplate = new AgentTemplate();

  agentConfig: AgentConfig = new AgentConfig();

  private ngUnsubscribe: Subject<void> = new Subject<void>();
   
  constructor(private readonly route: ActivatedRoute, 
              private readonly serverService: ServerService,
              private readonly agentTemplateService: AgentTemplateService) { 
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      let agentId = params.get('agentId');
      if (agentId) {
        this.agentTemplateService.get(agentId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentTemplate => {
          this.agentTemplate = agentTemplate;
          this.serverService.fetchConfig(this.agentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentConfig => {
            this.agentConfig = agentConfig;
          });
        });
      }
    });
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}