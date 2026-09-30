import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-request-password-reset',
  imports: [ReactiveFormsModule, TranslocoDirective],
  templateUrl: './request-password-reset.html',
})
export class RequestPasswordReset {
  private readonly authService = inject(AuthService);

  protected readonly emailForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  protected readonly sent = signal(false);
  protected readonly loading = signal(false);
  protected readonly hasError = signal(false);

  onSubmit() {
    if (this.emailForm.invalid || this.loading()) return;

    this.loading.set(true);
    this.hasError.set(false);

    this.authService
      .requestPasswordReset(this.emailForm.controls.email.value)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) =>
          res.success ? this.sent.set(true) : this.hasError.set(true),
        error: () => this.hasError.set(true),
      });
  }
}
