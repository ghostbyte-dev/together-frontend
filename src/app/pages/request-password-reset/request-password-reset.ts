import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-request-password-reset',
  imports: [ReactiveFormsModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './request-password-reset.html',
})
export class RequestPasswordReset {
  private authService = inject(AuthService);

  emailForm: FormGroup;

  sent = false;
  error = '';

  constructor() {
    this.emailForm = new FormGroup({
      email: new FormControl<string | null>('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  get email() {
    return this.emailForm.get('email');
  }

  onSubmit() {
    if (this.emailForm.valid) {
      this.authService
        .requestPasswordReset(this.email.value)
        .subscribe((res) => {
          if (res.success) {
            this.sent = true;
          } else {
            this.error = 'Ein Fehler ist aufgetreten';
          }
        });
    }
  }
}
