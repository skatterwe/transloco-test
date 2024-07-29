import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode, NgModule } from '@angular/core';
import { provideTransloco, Translation, TranslocoLoader, TranslocoModule } from '@jsverse/transloco';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private readonly http: HttpClient) {}

  getTranslation(lang: string) {
    return forkJoin([
      this.http.get<Translation>(`./assets/i18n-core/${lang}.json?`),
      this.http.get(`./assets/i18n-shell/${lang}.json?`),
    ]).pipe(
      map(([translation, vendor]) => {
        return { ...translation, ...vendor };
      })
    );
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en', 'de'],
        defaultLang: 'en',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        flatten: {
          aot: !isDevMode(),
        },
      },
      loader: TranslocoHttpLoader,
    }),
  ],
})
export class TranslocoRootModule {}
