import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api/selectitem";
import { AgentTemplate } from "../models/agent-template";

@Component({
  selector: 'agent-selector',
  templateUrl: './agent-selector.component.html',
  styleUrls: ['./agent-selector.component.css']
})

export class AgentSelectorComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
/*
    seasons: SelectItem[] = [];

    currentAgentTemplate: AgentTemplate;

    constructor(private readonly route: ActivatedRoute,
                private readonly seasonService: SeasonService, 
                private readonly userContextService: UserContextService) { 
    }

    ngOnInit() {
        if (this.userContextService.isInitialized) {
            this.initAgentTemplates();
        }
    }

    private initAgentTemplates() {
        this.seasons = [];
        let organizationId = parseInt(this.route.parent.snapshot.params['id']);
        this.seasonService.getByOrganizationId(organizationId).subscribe(seasons => {
            for (let i = 0; i < seasons.length; i++) {
                this.seasons.push({ label: seasons[i].name, value: seasons[i] });
                if (seasons[i].id === this.userContextService.currentUserContext.currentSeasonId) {
                    this.currentAgentTemplate = seasons[i];
                }
            }
            if (!this.userContextService.currentUserContext.currentSeasonId && seasons.length === 1) {
                this.currentAgentTemplate = seasons[0];
                this.userContextService.currentUserContext.currentSeasonId = this.currentAgentTemplate.id;
            }
        });
    }

    changeCurrentSeason(season: AgentTemplate): void {
        this.userContextService.currentUserContext.currentSeasonId = season.id;
        this.userContextService.update(this.userContextService.currentUserContext);
    }
    */
}