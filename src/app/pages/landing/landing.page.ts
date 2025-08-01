import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ArrowLeftRightIcon, CheckIcon, LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      LucideAngularModule
    ]
})
export class LandingPage implements OnInit {
  readonly switchIcon = ArrowLeftRightIcon;
  readonly checkIcon = CheckIcon;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }

  gotoRegister() {
    this.router.navigate(['register']);
  }

  openExternalLink(url: string) {
    window.open(url, '_blank');
  }
}
