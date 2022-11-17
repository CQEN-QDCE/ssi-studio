import * as _ from 'lodash';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Laboratory } from '../models/laboratory';
import { LaboratoryService } from '../services/laboratory.service';
import { TranslateService } from '@ngx-translate/core';
import { Routes } from '../routes';

@Component({
  selector: 'laboratories-view',
  templateUrl: './laboratories-view.component.html',
  styleUrls: ['./laboratories-view.component.css']
})
export class LaboratoriesViewComponent implements OnInit, OnDestroy {

    laboratories: Laboratory[] = [];

    laboratoryDialogVisible: boolean = false;

    laboratory: Laboratory = new Laboratory();

    editLaboratoryIndex: number = 0;

    acceptLabel: string = 'Accept';

    private ngUnsubscribe: Subject<void> = new Subject<void>();
  
    constructor(private readonly laboratoryService: LaboratoryService, 
                private readonly router: Router,
                private readonly translate: TranslateService) { 
    }

    async ngOnInit(): Promise<void> {
        this.laboratoryService.getAll().pipe(takeUntil(this.ngUnsubscribe)).subscribe(laboratories => {
            this.laboratories = laboratories;
        });
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    addLaboratory(): void {
        this.laboratory = new Laboratory();
        this.acceptLabel = this.translate.instant('CreateLabel');
        this.laboratoryDialogVisible = true;
    }

    edit(index: number): void {
        this.editLaboratoryIndex = index;
        this.laboratory = _.cloneDeep(this.laboratories[index]);
        this.acceptLabel = this.translate.instant('SaveLabel');
        this.laboratoryDialogVisible = true;
      }

    cancel(): void {
        this.laboratory = new Laboratory();
        this.laboratoryDialogVisible = false;
    }

    accept(): void {
        if (this.laboratory.id === '') {
            this.laboratoryService.create(this.laboratory).pipe(takeUntil(this.ngUnsubscribe)).subscribe(laboratory => {
              this.laboratories.push(laboratory);
              this.laboratories = [...this.laboratories];
              this.laboratoryDialogVisible = false;
            });
        } else {
            this.laboratoryService.update(this.laboratory).pipe(takeUntil(this.ngUnsubscribe)).subscribe(laboratory => {
              this.laboratories[this.editLaboratoryIndex] = laboratory;
              this.laboratories = [...this.laboratories];
              this.laboratoryDialogVisible = false;
            });
        }
    }

    select(index: number): void {
        this.router.navigateByUrl(`${Routes.LABORATORY}/${this.laboratories[index].id}/${Routes.AGENT}`);
    }

    delete(index: number): void {
        this.laboratoryService.delete(this.laboratories[index]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
            this.laboratories.splice(index,1);
        });
    }
}