import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunityService } from 'src/app/services/community.service';
import { UserService } from 'src/app/services/user.service';
import { PrimaryButton } from '../primary-button/primary-button';
import { TranslocoModule } from '@jsverse/transloco';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ReactiveFormsModule, PrimaryButton, TranslocoModule],
})
export class CreateCommunityComponent implements OnInit {
  private userService = inject(UserService);
  private communityService = inject(CommunityService);
  private router = inject(Router);
  private toastr = inject(ToastService);

  subscriptions: Subscription[] = [];

  communityForm: FormGroup;

  isLoadingCreateCommunity = false;

  constructor() {
    this.communityForm = new FormGroup({
      name: new FormControl<string | null>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit() {}

  get name() {
    return this.communityForm.get('name');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  createCommunity() {
    if (this.communityForm.valid) {
      this.isLoadingCreateCommunity = true;
      this.subscriptions.push(
        this.communityService
          .createCommunity(this.name.value)
          .subscribe((res) => {
            this.isLoadingCreateCommunity = false;
            if (res.success) {
              this.toastr.success(
                'Gemeinschaft ' + res.data.name + ' wurde erstellt'
              );
              this.userService.fetchUserFromApi();
              this.router.navigate(['profile']);
            } else {
              this.toastr.error(res.error);
            }
          })
      );
    }
  }
}
