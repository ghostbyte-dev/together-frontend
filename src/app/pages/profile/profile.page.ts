import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CommunityService } from 'src/app/services/community.service';
import { RouterModule } from '@angular/router';

import { OpenRequestsComponent } from 'src/app/components/open-requests/open-requests.component';
import { Navbar } from 'src/app/components/navbar/navbar';
import { AlertService } from 'src/app/services/alert.service';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimaryButton } from 'src/app/components/primary-button/primary-button';
import { LucideArrowLeftRight, LucideLogOut, LucideUserPen } from '@lucide/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  imports: [
    RouterModule,
    OpenRequestsComponent,
    ReactiveFormsModule,
    PrimaryButton,
    Navbar,
    PopupComponent,
    LucideUserPen,
    LucideArrowLeftRight,
    LucideLogOut
],
})
export class ProfilePage {
  private readonly authService = inject(AuthService);
  private readonly alertService = inject(AlertService);
  private readonly userService = inject(UserService);
  private readonly communityService = inject(CommunityService);
  private readonly toast = inject(ToastService);

  feedbackForm = new FormGroup({
    feedback: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(1000),
    ]),
  });

  feedbackPopupIsOpen = signal(false);
  isSendingFeedback = signal(false);

  user = this.userService.user;
  community = this.communityService.activeCommunity;
  usersInCommunity = this.communityService.usersInActiveCommunity;

  logout() {
    this.alertService.showAlert(
      'Abmelden?',
      'Sicher dass du dich abmelden willst?',
      'Abmelden',
      () => {
        this.authService.logout();
      },
      'Cancel'
    );
  }

  openFeedbackPopup() {
    this.feedbackForm.controls.feedback.reset();
    this.feedbackPopupIsOpen.set(true);
  }

  sendFeedback() {
    this.isSendingFeedback.set(true);
    this.userService
      .sendFeedback(this.feedbackForm.controls.feedback.value)
      .subscribe((res) => {
        this.isSendingFeedback.set(false);
        if (res.success) {
          this.toast.success('Feedback gesendet!');
          this.feedbackPopupIsOpen.set(false);
        } else {
          this.toast.error(res.error);
        }
      });
  }
}
