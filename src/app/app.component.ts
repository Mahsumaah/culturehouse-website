import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroComponent} from "./components/hero/hero.component";
import {AboutComponent} from "./components/about/about.component";
import {RecentWorkComponent} from "./components/recent-work/recent-work.component";
import {ServicesComponent} from "./components/services/services.component";
import {SupportComponent} from "./components/support/support.component";
import {AspirationComponent} from "./components/aspiration/aspiration.component";
import {ConnectComponent} from "./components/connect/connect.component";
import {LanguageService} from "./services/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutComponent, RecentWorkComponent, ServicesComponent, SupportComponent, AspirationComponent, ConnectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  title = 'Culture House';

  private languageService = inject(LanguageService);
  private translate = inject(TranslateService);

}
