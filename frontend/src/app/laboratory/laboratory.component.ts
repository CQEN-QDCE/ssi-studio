import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Laboratory } from '../models/laboratory';
import { Routes } from '../routes';
import { LaboratoryService } from '../services/laboratory.service';

@Component({
  selector: 'laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})

export class LaboratoryComponent implements OnInit, OnDestroy {

    menuItems: MenuItem[] = [];

    laboratory: Laboratory = new Laboratory();

    private ngUnsubscribe: Subject<void> = new Subject<void>();
  
    constructor(private readonly route: ActivatedRoute, 
                private readonly router: Router,
                private readonly laboratoryService: LaboratoryService,
                private readonly translate: TranslateService) {
    }

    async ngOnInit(): Promise<void> {
        this.route.paramMap.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
            const laboratoryId = params.get('id');
            if (laboratoryId) {
                this.laboratoryService.get(laboratoryId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(laboratory => {
                    this.laboratory = laboratory;
                });
            }
        });

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) this.activeMenuItemByUrl(event.url);
        });

        this.initMenuItems();
        
        this.activeMenuItemByUrl(this.router.url);
    }

    private initMenuItems(): void {
        this.menuItems = [
            {
                label: this.translate.instant('AgentsLabel'),
                icon: 'fa fa-server',
                styleClass: '',
                command: () => this.navigateToAgents()               
            },
            {
                label: this.translate.instant('CredentialsLabel'),
                icon: 'fa fa-credit-card',
                styleClass: '',
                command: () => this.navigateToCredentials()
            },
            {
                label: this.translate.instant('VerificationsLabel'),
                icon: 'fa fa-check',
                styleClass: '',
                command: () => this.navigateToVerifications()
            }
        ];
    }

    private activeMenuItemByUrl(url: string): void {
        if (url.indexOf(Routes.LABORATORY) >= 0 && url.indexOf(Routes.AGENT) >= 0) {
            this.activeMenuItemByLabel(this.translate.instant('AgentsLabel'));
        } else if (url.indexOf(Routes.LABORATORY) >= 0 && url.indexOf(Routes.CREDENTIAL) >= 0) {
            this.activeMenuItemByLabel(this.translate.instant('CredentialsLabel'));
        } else if (url.indexOf(Routes.LABORATORY) >= 0 && url.indexOf(Routes.VERIFICATION) >= 0) {
            this.activeMenuItemByLabel(this.translate.instant('VerificationsLabel'));
        }
    }

    private inactiveAllMenuItem(): void {
        for (const menuItem of this.menuItems) menuItem.styleClass = '';
    }

    private activeMenuItemByLabel(label: string): void {
        this.inactiveAllMenuItem();
        for (const menuItem of this.menuItems) {
            if (menuItem.label === label) menuItem.styleClass = 'active';
        }
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


