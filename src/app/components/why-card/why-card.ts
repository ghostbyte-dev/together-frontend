import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LucideDynamicIcon, LucideIconInput } from '@lucide/angular';

@Component({
  selector: 'app-why-card',
  imports: [LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './why-card.html',
})
export class WhyCard {
  @Input() title!: string;
  @Input() description!: string;
  @Input() borderColor!: string;
  @Input() backgroundColor!: string;
  @Input() icon!: LucideIconInput
}
