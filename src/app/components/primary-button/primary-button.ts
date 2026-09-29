
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideLoader } from '@lucide/angular';

@Component({
  selector: 'app-primary-button',
  imports: [LucideLoader],
  templateUrl: './primary-button.html',
})
export class PrimaryButton {
  @Input() isLoading = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label!: string;
  @Input() customClasses = 'btn-primary w-full';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.disabled && !this.isLoading) {
      this.clicked.emit();
    }
  }
}
