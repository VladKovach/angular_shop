import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormComponent],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  handleLogin(data: any) {
    console.log('data = ', data);

    const { email, password } = data;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
      complete: () => {
        console.log('Login complete');
      },
    });
  }
}
