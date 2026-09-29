import { Component, Input } from '@angular/core';
import { LucideDynamicIcon, LucideIconInput } from '@lucide/angular';

@Component({
  selector: 'app-feature-card',
  imports: [LucideDynamicIcon],
  templateUrl: './feature-card.html',
})
export class FeatureCard {
  @Input() title!: string;
  @Input() description!: string;
  @Input() borderColor!: string;
  @Input() backgroundColor!: string;
  @Input() icon!: LucideIconInput;
}
