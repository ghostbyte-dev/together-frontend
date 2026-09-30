import { Component, inject } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast-container',
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]" aria-live="polite">
      @for (toast of toastService.toasts(); track toast.id) {
        <button
          type="button"
          role="status"
          (click)="toastService.dismiss(toast.id)"
          class="text-left text-white text-sm rounded-lg px-4 py-3 shadow-lg cursor-pointer"
          [class.bg-green-600]="toast.type === 'success'"
          [class.bg-red-600]="toast.type === 'error'">
          {{ toast.message }}
        </button>
      }
    </div>
  `,
})
export class ToastContainer {
  protected readonly toastService = inject(ToastService);
}
