import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { Laboratory } from '../models/laboratory';
import { Routes } from '../routes';
import { LaboratoryService } from '../services/laboratory.service';

@Component({
  selector: 'laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})
export class LaboratoryComponent implements OnInit, OnDestroy {

    items: MenuItem[] = [];

    laboratory: Laboratory = new Laboratory();

    private ngUnsubscribe: Subject<void> = new Subject<void>();
  
    constructor(private readonly route: ActivatedRoute, 
                private readonly router: Router,
                private readonly laboratoryService: LaboratoryService,
                private readonly translate: TranslateService) {
    }

    async ngOnInit(): Promise<void> {
        this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
            let laboratoryId = params.get('id');
            if (laboratoryId) {
                this.laboratoryService.get(laboratoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(laboratory => {
                    this.laboratory = laboratory;
                });
            }
        });
        await lastValueFrom(this.translate.get('Translation'));
        this.items = [/*{
            label: 'Dashboard',
            icon: 'fa fa-home',
            command: (event) => {
                this.navigateToDashboard();
            }
        },
        {
            label: 'Connections',
            icon: 'fa fa-users',
            command: (event) => {
                this.navigateToConnections();
            }
        },*/
        {
            label: this.translate.instant('AgentsLabel'),
            icon: 'fa fa-server',
            command: (event) => {
                this.navigateToAgents();
            }
        },
        {
            label: this.translate.instant('CredentialsLabel'),
            icon: 'fa fa-credit-card',
            command: (event) => {
                this.navigateToCredentials();
            }
        },
        {
            label: this.translate.instant('VerificationsLabel'),
            icon: 'fa fa-check',
            command: (event) => {
                this.navigateToVerifications();
            }
        }]
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    navigateToDashboard(): void {
        this.router.navigateByUrl('/home');
    }
    
    navigateToConnections(): void {
        this.router.navigateByUrl(`/${Routes.LABORATORY}/${this.laboratory.id}/${Routes.CONNECTION}`);
    }
    
    navigateToCredentials(): void {
        this.router.navigateByUrl(`/${Routes.LABORATORY}/${this.laboratory.id}/${Routes.CREDENTIAL}`);
    }

    navigateToVerifications(): void {
        this.router.navigateByUrl(`/${Routes.LABORATORY}/${this.laboratory.id}/${Routes.VERIFICATION}`);
    }

    navigateToAgents(): void {
        this.router.navigateByUrl(`/${Routes.LABORATORY}/${this.laboratory.id}/${Routes.AGENT}`);
    }
}


