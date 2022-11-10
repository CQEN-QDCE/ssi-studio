import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { VerificationTemplate } from '../models/verification-template';
import { VerificationTemplateService } from '../services/verification-template.service';

@Component({
  selector: 'verification-template-view',
  templateUrl: './verification-template-view.component.html',
  styleUrls: ['./verification-template-view.component.css']
})
export class VerificationTemplateViewComponent implements OnInit, OnDestroy {

    verificationTemplate: VerificationTemplate = new VerificationTemplate();

    private ngUnsubscribe: Subject<void> = new Subject<void>();
    
    constructor(private readonly route: ActivatedRoute, 
                private readonly verificationTemplateService: VerificationTemplateService) { 
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): any {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}