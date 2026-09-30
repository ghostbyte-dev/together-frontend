
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { PrimaryButton } from 'src/app/components/primary-button/primary-button';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ReactiveFormsModule, RouterModule, PrimaryButton, TranslocoModule],
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastService);
  private alertService = inject(AlertService);


  loginForm: FormGroup;

  isLoading = false;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl<string | null>('', Validators.required),
      password: new FormControl<string | null>('', Validators.required),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService
        .login(this.email.value, this.password.value)
        .subscribe((res) => {
          this.isLoading = false;
          if (res.success) {
            this.router.navigate(['/onboarding']);
            this.toastr.success('Willkommen zurück!');
          } else if (res.data?.verified === false) {
            this.alertService.showAlert(
              'Nicht verifiziert',
              res.error,
              'Erneut senden',
              () =>
                this.authService
                  .resendVerificationEmail(this.email.value)
                  .subscribe(async (res) => {
                    if (res.success) {
                      this.alertService.showAlert(
                        'Resent Verification Email',
                        'You Received an email with an link to verify your account',
                        'Okay'
                      );
                    } else {
                      this.alertService.showAlert('Ooops', res.error);
                    }
                  })
            );
          } else {
            this.alertService.showAlert('Oops', res.error);
          }
        });
    }
  }
}
