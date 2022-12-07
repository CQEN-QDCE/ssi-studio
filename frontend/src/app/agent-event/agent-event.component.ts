import { Component, OnDestroy, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AgentEvent } from '../models/agent-event';
import { AgentEventService } from '../services/agent-event.service';
import { prettyPrintJson } from 'pretty-print-json';

@Component({
  selector: 'agent-event',
  templateUrl: './agent-event.component.html',
  styleUrls: ['./agent-event.component.css']
})
export class AgentEventComponent implements OnInit, OnDestroy {

  agentEvents: AgentEvent[] = [];

  agentEvent: AgentEvent = new AgentEvent();

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  totalRecords: number = 0;

  loading: boolean = false;

  eventDetails: string = '';

  agentEventDetailsDialogVisible: boolean = false;

  constructor(private readonly agentEventService: AgentEventService,) { 
  }

  viewDetails(index: number): void { 
    this.agentEvent = this.agentEvents[index]
    const html = prettyPrintJson.toHtml(JSON.parse(this.agentEvent.payload));
    this.eventDetails = html;
    this.agentEventDetailsDialogVisible = true;
  }

  cancel(): void {
    this.agentEventDetailsDialogVisible = false;
  }

  loadAgentEvents(event: LazyLoadEvent) {  
    this.loading = true;

    this.agentEventService.getByAgentSlug('bls2', event.first, event.rows).pipe(takeUntil(this.ngUnsubscribe)).subscribe(agentEventResult => {
      this.agentEvents = agentEventResult.agentEvents;
      this.totalRecords = agentEventResult.total;
      this.loading = false;
    });
    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}