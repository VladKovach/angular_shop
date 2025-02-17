import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importing Material Snackbar

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  // Show notification with dynamic type classes
  showNotification(
    message: { text: string; type?: string },
    action: string = 'Close'
  ) {
    let panelClasses = [];

    // Dynamically assign panelClass based on type
    switch (message.type) {
      case 'success':
        panelClasses = ['success-snackbar'];
        break;
      case 'error':
        panelClasses = ['error-snackbar'];
        break;
      case 'warning':
        panelClasses = ['warning-snackbar'];
        break;
      default:
        panelClasses = ['default-snackbar'];
        break;
    }

    // Displaying the toast notification with dynamic classes
    this.snackBar.open(message.text, action, {
      duration: 3000, // Notification will disappear after 3 seconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: panelClasses, // Applying the dynamic classes
    });
  }
}
