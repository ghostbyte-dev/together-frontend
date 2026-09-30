import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './alert.html',
})
export class AlertComponent {
  // Fix: Explicitly type as 'any' (or an interface) to avoid strict mode type errors
  alert: any = null;

  private alertService = inject(AlertService);

  constructor() {
    // Automatically manages subscription cleanup on component destroy
    this.alertService.alert.pipe(takeUntilDestroyed()).subscribe((alert) => {
      this.alert = alert;
    });
  }

  onSubmit() {
    if (this.alert?.submitButtonCallback) {
      this.alert.submitButtonCallback();
    }
    this.alertService.closeAlert();
  }

  onCancel() {
    if (this.alert?.cancelButtonCallback) {
      this.alert.cancelButtonCallback();
    }
    this.alertService.closeAlert();
  }
}
