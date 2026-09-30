import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import {
  LucideArrowDown,
  LucideArrowLeft,
  LucideTrendingDown,
  LucideTrendingUp,
} from '@lucide/angular';
import { Subscription } from 'rxjs';
import { Navbar } from 'src/app/components/navbar/navbar';
import { Debt } from 'src/app/models/debt.model';
import { User } from 'src/app/models/user.model';
import { DebtService } from 'src/app/services/debt.service';

@Component({
  selector: 'app-debts-history',
  templateUrl: './debts-history.page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    RouterModule,
    Navbar,
    TranslocoModule,
    LucideArrowLeft,
    LucideTrendingUp,
    LucideTrendingDown,
    LucideArrowDown,
  ],
})
export class DebtsHistoryPage implements OnInit {
  subscriptions: Subscription[] = [];

  debts: Debt[] = [];

  currentUser: User;

  constructor(private debtService: DebtService) {}

  ngOnInit() {
    this.getItems();

    this.subscriptions.push(
      this.debtService.getMyDebts().subscribe((debts) => {
        this.debts = debts;
      }),
    );
  }

  getItems() {
    this.debtService.fetchDebtsAndBalanceFromApi();
  }
}
