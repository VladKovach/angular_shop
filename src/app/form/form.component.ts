import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [NgIf, ReactiveFormsModule],
})
export class FormComponent {
  @Input() isLogin = true; // Determines if it's a login or registration form
  @Output() formSubmit = new EventEmitter<FormGroup>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private navService: NavigationService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''], // Only used for registration
    });
  }

  ngOnChanges() {
    if (this.isLogin) {
      this.form.removeControl('confirmPassword');
    } else {
      this.form.addControl(
        'confirmPassword',
        this.fb.control('', [Validators.required])
      );
    }
  }
  navigate() {
    this.isLogin ? this.navService.goToRegister() : this.navService.goToLogin();
  }
  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
}
