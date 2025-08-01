import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskCardComponent } from 'src/app/components/task-card/task-card.component';
import { Day } from 'src/app/models/day';
import { TaskService } from 'src/app/services/task.service';
import {
  LucideAngularModule,
  InfinityIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusIcon,
} from 'lucide-angular';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { Navbar } from 'src/app/components/navbar/navbar';
import { CalendarEntry } from 'src/app/models/calendarEntry';
import { CalendarEntryEditor } from 'src/app/components/calendar-entry-editor/calendar-entry-editor';

@Component({
  selector: 'app-tasks',
  templateUrl: './calendar.page.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TaskCardComponent,
    LucideAngularModule,
    PopupComponent,
    CalendarEntryEditor,
    Navbar,
  ],
})
export class CalendarPage implements OnInit, OnDestroy {
  readonly InfinityIcon = InfinityIcon;
  readonly ChevronRightIcon = ChevronRightIcon;
  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly plusIcon = PlusIcon;

  subscriptions: Subscription[] = [];

  numberOfColumns = 3;

  days: Day[] = [];

  dayToday: Date;

  startDate: Date;
  endDate: Date;

  entryToEdit: CalendarEntry = null;
  dateForNewEntry: Date = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.dayToday = new Date();

    if (this.numberOfColumns === 7) {
      this.startDate = this.getMondayOfCurrentWeek();
      this.endDate = this.addDate(this.startDate, this.numberOfColumns - 1);
    } else {
      this.startDate = new Date();
      this.endDate = this.addDate(this.startDate, this.numberOfColumns - 1);
    }

    this.getTasks();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getTasks(event?) {
    this.subscriptions.push(
      this.taskService
        .getTasks(this.startDate, this.endDate)
        .subscribe((tasks) => {
          this.days = [];

          for (let i = 0; i < this.numberOfColumns; i++) {
            const currentDate = this.addDate(this.startDate, i);
            const currentDateString = this.formatDate(currentDate);

            const openTasks: CalendarEntry[] = [];
            const doneTasks: CalendarEntry[] = [];

            tasks.forEach((task) => {
              if (this.formatDate(task.date) === currentDateString) {
                if (task.done) {
                  doneTasks.push(task);
                } else {
                  openTasks.push(task);
                }
              }
            });

            this.days.push(
              new Day(i.toString(), openTasks, doneTasks, new Date(currentDate))
            );
          }

          if (event) {
            event.target.complete();
          }
        })
    );
  }

  addDate(date: Date, daysToAdd: number) {
    const result = new Date(Number(date));
    result.setDate(date.getDate() + daysToAdd);
    return result;
  }

  getMondayOfCurrentWeek(): Date {
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;

    const monday: Date = new Date(today.setDate(first));
    return monday;
  }

  formatDate(date: Date): string {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
  }

  changeSelectedDays(direction: 'previous' | 'next') {
    if (direction === 'next') {
      this.startDate = this.addDate(this.startDate, this.numberOfColumns);
      this.endDate = this.addDate(this.endDate, this.numberOfColumns);
      this.getTasks();
    } else if (direction === 'previous') {
      this.startDate = this.addDate(this.startDate, -this.numberOfColumns);
      this.endDate = this.addDate(this.endDate, this.numberOfColumns);
      this.getTasks();
    }
  }

  isTodayDate(date: Date, offset: number): boolean {
    return (
      date.toDateString() === this.addDate(new Date(), offset).toDateString()
    );
  }
}
