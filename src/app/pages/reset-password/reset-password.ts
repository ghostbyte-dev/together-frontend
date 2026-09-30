import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './reset-password.html',
})
export class ResetPassword implements OnInit {
  private authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);

  resetForm: FormGroup;

  code: string | null = '';


  constructor() {
    this.resetForm = new FormGroup({
      password: new FormControl<string | null>('', [Validators.required]),
    });
  }

  get password() {
    return this.resetForm.get('password');
  }

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.paramMap.get('code');
    //this.authService.verify(this.code);
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.authService
        .resetPassword(this.password.value, this.code)
        .subscribe((res) => {
          if (res.success) {
          }
        });
    }
  }
}
