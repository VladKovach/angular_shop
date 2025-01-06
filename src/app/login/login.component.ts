import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[FormComponent]
})
export class LoginComponent {
  handleLogin(data: any) {
    console.log('Login data:', data);
    // Add login logic here
  }
}
