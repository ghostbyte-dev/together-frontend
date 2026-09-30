// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';

import { environment } from 'src/environments/environment';
import { TranslocoRootModule } from './transloco-root.module';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Routing (replaces AppRoutingModule)
    provideRouter(routes),

    // HTTP Client (replaces HttpClientModule)
    provideHttpClient(withXhr(), withInterceptorsFromDi()),

    // Animations (replaces BrowserAnimationsModule)
    provideAnimations(),

    // Service Worker (replaces ServiceWorkerModule.register)
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),

    // Third-party modules that haven't shifted to pure standalone providers yet
    importProvidersFrom(TranslocoRootModule)
  ]
};
