import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/clickOutside.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, ClickOutsideDirective
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss', '../../../styles/general.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {

  typeOfMedia = input('')
  showSelectOptions = signal(false)
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

  onSelectClick() {
    this.showSelectOptions.update(curr => curr = !curr)
  }

  onOutsideClick() {
    this.showSelectOptions.update(curr => curr = false)
  }

  onClickOption(option: { id: number, value: string }) {

    this.showSelectOptions.update(curr => curr = !curr)
    this.form.patchValue({ reporterActivityArea: option.value })
  }

  setFile($event: Event, el: HTMLInputElement) {
    $event.preventDefault()
    el.click()
    const file = el.files?.item(0)
    this.currentFileName = file?.name
  }

  get options() {
    return [
      { id: 1, value: 'Option 1' },
      { id: 2, value: 'Option 2' },
      { id: 3, value: 'Option 3' },
      { id: 4, value: 'Option 4' },
      { id: 5, value: 'Option 5' },
      { id: 6, value: 'Option 6' },
      { id: 7, value: 'Option 7' }
    ]
  }

  get currentFileName() { return this.#currentFileName }
  set currentFileName(value: string | undefined) { this.#currentFileName = value }
}