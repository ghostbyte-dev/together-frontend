
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { Routine } from 'src/app/models/routine.model';

@Component({
    selector: 'app-routine-card',
    templateUrl: './routine-card.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    TranslocoModule
]
})
export class RoutineCardComponent implements OnInit {

  @Input() routine: Routine;

  constructor() { }

  ngOnInit() {}

}
