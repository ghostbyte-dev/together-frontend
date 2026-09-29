import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Footer } from 'src/app/components/footer/footer';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageSwitcher } from "src/app/components/language-switcher/language-switcher";
import { LucideArrowRight } from '@lucide/angular';

@Component({
  selector: 'app-landing-layout',
  imports: [RouterModule, LucideArrowRight, Footer, TranslocoModule, LanguageSwitcher],
  templateUrl: './landing-layout.component.html',
})
export class LandingLayoutComponent {

  private authService = inject(AuthService);

  isLoggedIn = computed(() => this.authService.activeUserId() != null);
}
