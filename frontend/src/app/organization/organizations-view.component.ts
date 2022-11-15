import * as _ from 'lodash';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { Organization } from '../models/organization';
import { OrganizationService } from '../services/organization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'organizations-view',
  templateUrl: './organizations-view.component.html',
  styleUrls: ['./organizations-view.component.css']
})
export class OrganizationsViewComponent implements OnInit, OnDestroy {

    organizations: Organization[] = [];

    organizationDialogVisible: boolean = false;

    organization: Organization = new Organization();

    editOrganizationIndex: number = 0;

    acceptLabel: string = 'Accept';

    private ngUnsubscribe: Subject<void> = new Subject<void>();
  
    constructor(private readonly organizationService: OrganizationService, 
                private readonly router: Router,
                private readonly translate: TranslateService) { 
    }

    async ngOnInit(): Promise<void> {
        this.organizationService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(organizations => {
            this.organizations = organizations;
        });
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    addOrganization(): void {
        this.organization = new Organization();
        this.acceptLabel = this.translate.instant('CreateLabel');
        this.organizationDialogVisible = true;
    }

    edit(index: number): void {
        this.editOrganizationIndex = index;
        this.organization = _.cloneDeep(this.organizations[index]);
        this.acceptLabel = this.translate.instant('SaveLabel');
        this.organizationDialogVisible = true;
      }

    cancel(): void {
        this.organization = new Organization();
        this.organizationDialogVisible = false;
    }

    accept(): void {
        if (this.organization.id === '') {
            this.organizationService.create(this.organization).pipe(takeUntil(this.ngUnsubscribe)).subscribe(organization => {
              this.organizations.push(organization);
              this.organizations = [...this.organizations];
              this.organizationDialogVisible = false;
            });
        } else {
            this.organizationService.update(this.organization).pipe(takeUntil(this.ngUnsubscribe)).subscribe(organization => {
              this.organizations[this.editOrganizationIndex] = organization;
              this.organizations = [...this.organizations];
              this.organizationDialogVisible = false;
            });
        }
    }

    select(index: number): void {
        this.router.navigateByUrl('/organizations/' + this.organizations[index].id + '/agents');
    }

    delete(index: number): void {
        this.organizationService.delete(this.organizations[index]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
            this.organizations.splice(index,1);
        });
    }
}