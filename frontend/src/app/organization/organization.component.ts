import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { Organization } from '../models/organization';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy {

    items: MenuItem[] = [];

    organization: Organization = new Organization();

    private ngUnsubscribe: Subject<void> = new Subject<void>();
  
    constructor(private readonly route: ActivatedRoute, 
                private readonly router: Router,
                private readonly organizationService: OrganizationService,
                private readonly translate: TranslateService) {
    }

    async ngOnInit(): Promise<void> {
        this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
            let organizationId = params.get('id');
            if (organizationId) {
                this.organizationService.get(organizationId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(organization => {
                    this.organization = organization;
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
        this.router.navigateByUrl('/organizations/' + this.organization.id + '/connections');
    }
    
    navigateToCredentials(): void {
        this.router.navigateByUrl('/organizations/' + this.organization.id + '/credentials');
    }

    navigateToVerifications(): void {
        this.router.navigateByUrl('/organizations/' + this.organization.id + '/verifications');
    }

    navigateToAgents(): void {
        this.router.navigateByUrl('/organizations/' + this.organization.id + '/agents');
    }
}

