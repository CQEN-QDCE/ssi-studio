import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../models/question-base';
import { QuestionControlService } from '../services/question-control.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  questions: QuestionBase<string>[] | null = []

  @Input('questions') 
  set setQuestions(value: QuestionBase<string>[]) {
    this.questions = value;
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  };
  form!: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  } 

  isValid(): boolean {
    for (const key of Object.keys(this.form.controls)) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].markAsTouched();
    }
    if (this.questions) {
      for (const questions of this.questions) {
        if (questions.required && (!questions.value || questions.value === '')) return false;
      }
    }

    return true;
  }

  payload(): string {
    return JSON.stringify(this.form.getRawValue());
  }
}