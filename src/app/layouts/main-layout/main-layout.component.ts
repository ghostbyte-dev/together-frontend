import { Component, effect, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LucideCalendar, LucideCheckCheck, LucideCircleUserRound, LucideShoppingCart, LucideWallet } from '@lucide/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, TranslocoModule, LucideCalendar, LucideCheckCheck, LucideShoppingCart, LucideWallet, LucideCircleUserRound],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  private authService = inject(AuthService);
  private shoppingService = inject(ShoppingService);
  private todosService = inject(TodosService);
  private calendarService = inject(CalendarService);


  subscriptions: Subscription[] = [];

  numberOfOpenShoppingItems = 0;
  numberOfOpenTodos = 0;
  tasksForTodayExists = false;

  constructor() {
    effect(() => {
      this.numberOfOpenShoppingItems = this.shoppingService.openShoppingItems().length;
    });

    effect(() => {
      this.numberOfOpenTodos = this.todosService.openTodos().length;
    });
  }
}
