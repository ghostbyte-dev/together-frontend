import { Component, OnDestroy, OnInit } from '@angular/core';
import { Community } from 'src/app/models/community';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { CommunityService } from 'src/app/services/community.service';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ColorEditorComponent } from 'src/app/components/color-editor/color-editor.component';
import { OpenRequestsComponent } from 'src/app/components/open-requests/open-requests.component';
import {
  ArrowLeftRightIcon,
  LogOutIcon,
  LucideAngularModule,
  PaletteIcon,
  UserPenIcon,
} from 'lucide-angular';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { Navbar } from 'src/app/components/navbar/navbar';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ColorEditorComponent,
    OpenRequestsComponent,
    LucideAngularModule,
    PopupComponent,
    Navbar
  ],
})
export class ProfilePage implements OnInit, OnDestroy {
  readonly paletteIcon = PaletteIcon;
  readonly userPen = UserPenIcon;
  readonly switchIcon = ArrowLeftRightIcon;
  readonly logoutIcon = LogOutIcon;

  subscriptions: Subscription[] = [];

  user: User;
  community: Community;
  usersInCommunity: User[];

  editingColor = false;
  editingName = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private userService: UserService,
    private communityService: CommunityService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.getCurrentUser().subscribe((user) => {
        this.user = user;
      })
    );

    this.subscriptions.push(
      this.communityService.getCurrentCommunity().subscribe((community) => {
        this.community = community;
      })
    );

    this.subscriptions.push(
      this.communityService.getUsersInCurrentCommunity().subscribe((users) => {
        this.usersInCommunity = users;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  updateUser(data: any) {
    this.subscriptions.push(
      this.userService.updateUser(data).subscribe((wasSuccessful) => {
        if (wasSuccessful) {
          this.userService.fetchUserFromApi();
        }
      })
    );
  }

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

  editColor(state: boolean) {
    this.editingColor = state;
  }

  gotoCreateCommunity() {
    this.router.navigate(['create-community']);
  }

  gotoFindCommunity() {
    this.router.navigate(['find-community']);
  }

  gotoOnboarding() {
    this.router.navigate(['onboarding']);
  }
}
