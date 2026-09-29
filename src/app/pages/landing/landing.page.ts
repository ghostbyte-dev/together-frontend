import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import {
  LucideArrowLeftRight,
  LucideArrowRight,
  LucideCalendar,
  LucideCircleCheckBig,
  LucideGift,
  LucideGlobe,
  LucideHeart,
  LucidePiggyBank,
  LucideShield,
  LucideShoppingCart,
  LucideSparkles,
  LucideSquareStack,
  LucideZap,
} from '@lucide/angular';
import { FeatureCard } from 'src/app/components/feature-card/feature-card';
import { WhyCard } from 'src/app/components/why-card/why-card';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  imports: [
    RouterModule,
    FeatureCard,
    WhyCard,
    TranslocoModule,
    LucideArrowLeftRight,
    LucideCircleCheckBig,
    LucideShoppingCart,
    LucideCalendar,
    LucideSparkles,
    LucideArrowRight,
    LucideHeart,
    LucideShield,
    LucideGlobe,
    LucideGift,
    LucideZap,
    LucidePiggyBank,
    LucideSquareStack
  ],
})
export class LandingPage {
  protected readonly checkIcon = LucideCircleCheckBig;
  protected readonly shoppingCartIcon = LucideShoppingCart;
  protected readonly calendarIcon = LucideCalendar;
  protected readonly piggyBankIcon = LucidePiggyBank;
  protected readonly multipleCommunitiesIcon = LucideSquareStack;

  // Why cards
  protected readonly globeIcon = LucideGlobe;
  protected readonly giftIcon = LucideGift;
  protected readonly zapIcon = LucideZap;

  private authService = inject(AuthService);

  isLoggedIn = computed(() => this.authService.activeUserId() != null);
}
