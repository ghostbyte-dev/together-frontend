
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageSwitcher } from "../language-switcher/language-switcher";

@Component({
  selector: 'app-footer',
  imports: [RouterModule, TranslocoModule, LanguageSwitcher],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './footer.html',
})
export class Footer {}
