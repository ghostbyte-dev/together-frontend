import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { LucideCheckCheck, LucideHistory, LucidePlus, LucideScale } from '@lucide/angular';
import { finalize } from 'rxjs';
import { Navbar } from 'src/app/components/navbar/navbar';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { Balance } from 'src/app/models/balance.model';
import { Debt } from 'src/app/models/debt.model';
import { User } from 'src/app/models/user.model';
import { CommunityService } from 'src/app/services/community.service';
import { DebtService } from 'src/app/services/debt.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

const CLEAR_OFF_NAME = 'debt ausgeglichen'; // stored in the DB, so keep it language-independent

@Component({
  selector: 'app-debts',
  templateUrl: './debts.page.html',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CurrencyPipe,
    TranslocoDirective,
    LucidePlus,
    LucideHistory,
    LucideScale,
    LucideCheckCheck,
    PopupComponent,
    Navbar,
  ],
})
export class DebtsPage implements OnInit {
  private readonly debtService = inject(DebtService);
  private readonly userService = inject(UserService);
  private readonly communityService = inject(CommunityService);
  private readonly toast = inject(ToastService);
  private readonly transloco = inject(TranslocoService);

  protected readonly currentUser = this.userService.user;
  protected readonly balances = toSignal(this.debtService.getBalance(), {
    initialValue: [] as Balance[],
  });
  protected readonly otherUsers = computed(() =>
    this.communityService.usersInActiveCommunity().filter((u) => u.id !== this.currentUser()?.id),
  );

  protected readonly editorIsOpen = signal(false);
  protected readonly clearOffTarget = signal<Balance | null>(null);
  protected readonly iOwe = signal(false);
  protected readonly saving = signal(false);

  protected readonly debtForm = new FormGroup({
    debitor: new FormControl<User | null>(null, Validators.required),
    amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  protected readonly clearOffForm = new FormGroup({
    amount: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
  });

  ngOnInit() {
    this.refresh();
  }

  protected openClearOffEditor(balance: Balance) {
    this.clearOffForm.setValue({ amount: Math.abs(balance.amount) });
    this.clearOffTarget.set(balance);
  }

  protected saveDebt() {
    const me = this.currentUser();
    const { debitor, amount, name } = this.debtForm.getRawValue();
    if (this.debtForm.invalid || this.saving() || !me || !debitor || amount === null) return;

    this.submit(this.createDebt(name, amount, debitor, me, this.iOwe()), () => {
      this.debtForm.reset();
      this.editorIsOpen.set(false);
    });
  }

  protected clearOff() {
    const me = this.currentUser();
    const balance = this.clearOffTarget();
    const { amount } = this.clearOffForm.getRawValue();
    if (this.clearOffForm.invalid || this.saving() || !me || !balance || amount === null) return;

    this.submit(
      this.createDebt(CLEAR_OFF_NAME, amount, balance.debitor, me, balance.amount < 0),
      () => this.clearOffTarget.set(null),
    );
  }

  private createDebt(name: string, amount: number, other: User, me: User, currentUserIsCreditor: boolean) {
    return new Debt({
      id: undefined,
      name,
      amount,
      debitor: currentUserIsCreditor ? other : me,
      creditor: currentUserIsCreditor ? me : other,
    });
  }

  private submit(debt: Debt, onSuccess: () => void) {
    this.saving.set(true);
    this.debtService
      .addDebt(debt)
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: () => {
          onSuccess();
          this.refresh();
        },
        error: () => this.toast.error(this.transloco.translate('debts.saveError')),
      });
  }

  private refresh() {
    this.debtService.fetchDebtsAndBalanceFromApi();
  }
}
