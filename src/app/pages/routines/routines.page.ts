
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LucideArrowLeft, LucidePlus } from '@lucide/angular';
import { Subscription } from 'rxjs';
import { Navbar } from 'src/app/components/navbar/navbar';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { RoutineCardComponent } from 'src/app/components/routine-card/routine-card.component';
import { RoutineEditorComponent } from 'src/app/components/routine-editor/routine-editor.component';
import { Routine } from 'src/app/models/routine.model';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    RouterModule,
    RoutineEditorComponent,
    RoutineCardComponent,
    PopupComponent,
    Navbar,
    TranslocoModule,
    LucidePlus,
    LucideArrowLeft
],
})
export class RoutinesPage implements OnInit, OnDestroy {
  private calendarService = inject(CalendarService);


  subscriptions: Subscription[] = [];

  enabledRoutines: Routine[] = [];
  disabledRoutines: Routine[] = [];

  completedFirstLoad = false;

  newRoutineEditorIsOpen = false;

  openRoutineEditor: Routine = null;

  ngOnInit() {
    this.subscriptions.push(
      this.calendarService.getRoutines().subscribe((routines) => {
        this.enabledRoutines = [];
        this.disabledRoutines = [];

        this.completedFirstLoad = true;

        routines.map((routine) => {
          if (routine.active) {
            this.enabledRoutines.push(routine);
          } else {
            this.disabledRoutines.push(routine);
          }
        });
      })
    );

    this.getRoutines();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getRoutines() {
    this.calendarService.fetchRoutinesFromApi();
  }

  openNewRoutineEditor(state: boolean) {
    this.newRoutineEditorIsOpen = state;
  }

  openUpdateEditor(routine: Routine) {
    this.openRoutineEditor = routine;
  }
}
