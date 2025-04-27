import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  isMenuOpen = false;
  currentLang = 'en';

  // Inject services
  private languageService = inject(LanguageService);

  // Menu items with translation keys
  menuItems = [
    { id: 'home', url: '#', label: 'NAVIGATION.HOME' },
    { id: 'about', url: '#about', label: 'NAVIGATION.ABOUT' },
    { id: 'work', url: '#work', label: 'NAVIGATION.RECENT_WORK' },
    { id: 'services', url: '#services', label: 'NAVIGATION.SERVICES' },
    { id: 'help', url: '#help', label: 'NAVIGATION.HELP' },
    { id: 'contact', url: '#connect', label: 'NAVIGATION.CONTACT' }
  ];

  // Available languages
  availableLanguages = [
    { code: 'en', name: 'English', nativeName: 'english' },
    { code: 'ar', name: 'Arabic', nativeName: 'عربي' }
  ];

  ngOnInit() {
    // Initialize with current language
    this.currentLang = this.languageService.getCurrentLanguage();

    // Subscribe to language changes
    this.languageService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    // Prevent scrolling when menu is open
    // document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.closeMenu();
  }
}
