import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from './components/alert/alert';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    RouterOutlet,
    AlertComponent
  ],
  standalone: true,
})
export class AppComponent {
  private authService = inject(AuthService);
}
