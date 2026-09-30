import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, TranslocoDirective],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly transloco = inject(TranslocoService);

  private readonly code = inject(ActivatedRoute).snapshot.paramMap.get('code');

  protected readonly resetForm = new FormGroup({
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  protected readonly loading = signal(false);
  protected readonly hasError = signal(false);
  protected readonly invalidLink = this.code === null;

  onSubmit() {
    if (this.resetForm.invalid || this.loading() || this.code === null) return;

    this.loading.set(true);
    this.hasError.set(false);

    this.authService
      .resetPassword(this.resetForm.controls.password.value, this.code)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success(
              this.transloco.translate('passwordReset.success'),
            );
            this.router.navigate(['/login']);
          } else {
            this.hasError.set(true);
          }
        },
        error: () => this.hasError.set(true),
      });
  }
}
