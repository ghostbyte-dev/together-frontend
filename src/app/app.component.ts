import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './components/alert/alert';
import { ToastContainer } from './components/toast-container/toast-container';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    RouterOutlet,
    ToastContainer,
    AlertComponent
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class AppComponent {
  private authService = inject(AuthService);
}
