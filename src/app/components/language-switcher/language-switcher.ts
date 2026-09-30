import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  private translocoService = inject(TranslocoService);

  activeLang: string;

  constructor() {
    const translocoService = this.translocoService;

    this.activeLang = translocoService.getActiveLang();

    translocoService.langChanges$.subscribe(lang => {
      console.log(`Language changed to: ${lang}`);
      this.activeLang = lang;
    });
  }

  toggleLang() {
    if (this.activeLang == "en") {
      this.translocoService.setActiveLang("de");
      this.activeLang = "de";
    } else {
      this.translocoService.setActiveLang("en");
      this.activeLang = "en";
    }
  }
}
