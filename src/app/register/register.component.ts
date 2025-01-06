import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormComponent],
})
export class RegisterComponent {
  handleRegister(data: any) {
    console.log('register data:', data);
    // Add register logic here
  }
}
