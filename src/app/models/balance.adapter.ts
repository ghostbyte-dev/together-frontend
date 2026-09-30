import { Injectable, inject } from '@angular/core';
import { Adapter } from './adapter';
import { ApiBalance, Balance } from './balance.model';
import { UserAdapter } from './user.adapter';

@Injectable({
  providedIn: 'root',
})
export class BalanceAdapter implements Adapter<ApiBalance, Balance> {
  private userAdapter = inject(UserAdapter);

  adapt(item: ApiBalance): Balance {
    return new Balance({
      amount: item.amount,
      debitor: this.userAdapter.adapt(item.otherUser),
    });
  }
}
