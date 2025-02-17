import { NotificationService } from './../services/notification.service';
import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [FormComponent],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  handleRegister(data: any) {
    console.log('data = ', data);

    const { email, password } = data;
    this.authService.register(email, password).subscribe({
      next: (response) => {
        console.log('Register successful:', response);
      },
      error: (error) => {
        console.error('Register failed:', error);
        this.notificationService.showNotification({
          text: error.error.message,
        });
      },
      complete: () => {
        console.log('Register complete');
      },
    });
  }
}
