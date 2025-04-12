import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // BehaviorSubject to store and emit the current language
  private langSubject = new BehaviorSubject<string>('en');

  // Public observable that components can subscribe to
  public language$: Observable<string> = this.langSubject.asObservable();

  // Check if we're in a browser environment
  private readonly isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Determine if we're in a browser
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Initialize with default language
    this.initializeLanguage();
  }

  /**
   * Initialize language settings based on saved preferences or browser settings
   */
  private initializeLanguage(): void {
    let initialLang = 'en';

    // Only access localStorage if in browser environment
    if (this.isBrowser) {
      const savedLang = localStorage?.getItem('preferredLanguage');
      initialLang = savedLang || 'en';
    }

    // Configure translate service
    this.translate.setDefaultLang('en');

    // Set the initial language
    this.setLanguage(initialLang);
  }

  /**
   * Change the current language
   * @param lang Language code ('en', 'ar', etc.)
   */
  setLanguage(lang: string): void {
    // Don't do anything if it's the same language
    if (this.langSubject.value === lang) return;

    // Update the language in the translate service
    this.translate.use(lang);

    // Update document direction for RTL support (only in browser)
    if (this.isBrowser) {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

      // Save preference to localStorage
      localStorage.setItem('preferredLanguage', lang);
    }

    // Notify all subscribers about the language change
    this.langSubject.next(lang);
  }

  /**
   * Get the current language synchronously (without subscribing)
   * Useful for one-time access or simple components
   */
  getCurrentLanguage(): string {
    return this.langSubject.value;
  }

  /**
   * Check if the current language is RTL
   */
  isRtl(): boolean {
    return this.isBrowser && document.documentElement.getAttribute('dir') === 'rtl';
  }

  /**
   * Get array of available languages
   */
  getAvailableLanguages(): {code: string, name: string}[] {
    return [
      { code: 'en', name: 'English' },
      { code: 'ar', name: 'العربية' }
      // Add more languages as needed
    ];
  }
}
