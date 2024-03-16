import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, input } from '@angular/core';
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

  typeOfMedia = input('')
  #currentFileName?: string

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
    date: ['', {
      validators: [Validators.required]
    }],
    time: ['', {
      validators: [Validators.required]
    }],
    location: ['', {
      validators: [Validators.required]
    }],
    description: ['', {
      validators: [Validators.required]
    }]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('onSubmit', this.form.value)
  }

  resetForm() {
    console.log('resetando form...')
  }

  setFile($event: Event, el: HTMLInputElement) {
    $event.preventDefault()
    el.click()
    const file = el.files?.item(0)
    this.currentFileName = file?.name
  }

  get currentFileName() { return this.#currentFileName }
  set currentFileName(value: string | undefined) { this.#currentFileName = value }
}