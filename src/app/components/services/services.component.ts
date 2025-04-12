import { Component } from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
// Define service items with translation keys
  // Column 1 services
  columnOneServices = [
    { id: 1, name: 'SERVICES.ITEMS.USER_JOURNEY' },
    { id: 2, name: 'SERVICES.ITEMS.SOCIAL_MEDIA' },
    { id: 3, name: 'SERVICES.ITEMS.BROCHURES' },
    { id: 4, name: 'SERVICES.ITEMS.TV_CONCEPTS' },
    { id: 5, name: 'SERVICES.ITEMS.CONTENT_CREATION' }
  ];

  // Column 2 services
  columnTwoServices = [
    { id: 6, name: 'SERVICES.ITEMS.GIFTS' },
    { id: 7, name: 'SERVICES.ITEMS.MAGAZINES' },
    { id: 8, name: 'SERVICES.ITEMS.PRINTED_BOOKS' },
    { id: 9, name: 'SERVICES.ITEMS.EXHIBITIONS' }
  ];
}
