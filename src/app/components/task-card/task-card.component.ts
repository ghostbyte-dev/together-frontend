
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEntry } from 'src/app/models/calendarEntry.model';

@Component({
    selector: 'app-task-card',
    templateUrl: './task-card.component.html',
    imports: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true
})
export class TaskCardComponent implements OnInit {

  @Input() task: CalendarEntry;
  @Output() openModal: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  cardClicked() {
    this.openModal.emit();
  }

}
