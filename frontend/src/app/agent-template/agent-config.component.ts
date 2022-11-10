import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AgentConfig } from '../models/agent-config';

@Component({
  selector: 'agent-config',
  templateUrl: './agent-config.component.html',
  styleUrls: ['./agent-config.component.css']
})
export class AgentConfigComponent implements OnInit, OnDestroy {

  agentConfig: AgentConfig = new AgentConfig();

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  @Input('agentConfig')
  set setAgentConfig(value: AgentConfig | null) {
    this.agentConfig = value ? value : new AgentConfig();
  }
  
  constructor() { 
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}