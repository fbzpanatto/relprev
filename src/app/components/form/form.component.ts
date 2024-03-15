import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss', '../../../styles/general.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {

  form = this.fb.group({
    firstName: ['', {
      validators: [Validators.maxLength(60)]
    }],
    lastName: ['', {
      validators: [Validators.maxLength(60)]
    }],
    phoneNumber: ['', {
      validators: []
    }],
    cellPhone: ['', {
      validators: []
    }],
    email: ['', {
      validators: [Validators.email]
    }],
    reporterActivityArea: ['', {
      validators: [Validators.required]
    }],
    date: ['', {}],
    time: ['', {}],
    location: ['', {}],
    description: ['', {
      validators: [Validators.required]
    }]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  onSubmit() {
    console.log('onSubmit', this.form.value)
  }

  resetForm() {
    console.log('resetando form...')
  }

  setFile($event: Event, el: HTMLElement) {
    el.click()
    console.log(el)
  }
}