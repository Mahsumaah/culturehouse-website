import {
  AfterViewInit,
  Component,
  ElementRef,
  PLATFORM_ID,
  HostListener,
  ViewChild,
  Inject,
  inject, NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {LanguageService} from "../../services/language.service";
import {TranslatePipe} from "@ngx-translate/core";
import {toSignal} from "@angular/core/rxjs-interop";
import {animate, state, style, transition, trigger} from "@angular/animations";

// Define the structure for multilingual text
export interface MultilingualText {
  en: string;
  ar: string;
  [key: string]: string; // Allow for additional languages
}

// Define the structure for carousel images
export interface CarouselImage {
  id: number;
  imgSrc: string;
}

// Define the structure for a recent work project
export interface RecentWorkItem {
  id: number;
  title: MultilingualText;
  activeImageId: number;
  imgSrc: string;
  carouselImages: CarouselImage[];
}

// Type for the entire recentWork array
export type RecentWork = RecentWorkItem[];

@Component({
  selector: 'app-recent-work',
  standalone: true,
  imports: [
    TranslatePipe,
  ],
  templateUrl: './recent-work.component.html',
  styleUrl: './recent-work.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('800ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RecentWorkComponent implements AfterViewInit{
  @ViewChild('recentWorkSection') recentWorkSection!: ElementRef;
  private lastScrollTop = 0;
  private sectionVisible = false;
  private observer!: IntersectionObserver;
  private isBrowser: boolean;
  private languageService = inject(LanguageService);
  private ngZone = inject(NgZone);
  private carouselIntervals: Map<number, any> = new Map();
  private isTouchDevice = false;
  language = toSignal(this.languageService.language$, { initialValue: 'en' });



  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    // Check if we're in the browser
    this.isBrowser = isPlatformBrowser(platformId);
    // Check if it's a touch device
    if (this.isBrowser) {
      this.isTouchDevice = 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0;
    }
  }



  recentWork: RecentWork = [
    // {
    //   id: 2,
    //   title: {
    //     en: 'Shop Beirut', ar: 'تسوق بيروت'
    //   },
    //   activeImageId: 1, // Track active image
    //   imgSrc: 'assets/work/shop-beirut-culture-house/main-shop-beirut-culture-house.jpg',
    //   carouselImages: [
    //     {
    //       id: 1,
    //       imgSrc: 'assets/work/shop-beirut-culture-house/main-shop-beirut-culture-house.jpg'
    //     },
    //     {
    //       id: 2,
    //       imgSrc: 'assets/work/shop-beirut-culture-house/shop-beirut-1-culture-house.jpg'
    //     },
    //     {
    //       id: 3,
    //       imgSrc: 'assets/work/shop-beirut-culture-house/shop-beirut-2-culture-house.jpg'
    //     }
    //   ]
    // },
    {
      id: 2,
      title: {
        en: 'Costumes of Saudi Arabia', ar: 'Costumes of Saudi Arabia'
      },
      activeImageId: 1, // Track active image
      imgSrc: 'assets/work/costume-saudi/costumes-of-saudi-arabia-1-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          imgSrc: 'assets/work/costume-saudi/costumes-of-saudi-arabia-1-culture-house.jpg'
        },
        {
          id: 2,
          imgSrc: 'assets/work/costume-saudi/costumes-of-saudi-arabia-2-culture-house.jpg'
        },
        {
          id: 3,
          imgSrc: 'assets/work/costume-saudi/main-costumes-of-saudi-arabia-culture-house.jpg'
        }
      ]
    },
    {
      id: 3,
      title: {en: 'Intercontinental Hotels', ar: 'فنادق إنتركونتيننتال' },
      activeImageId: 1,
      imgSrc: 'assets/work/intercontinental-hotels-culture-house/main-intercontinental-hotels-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          imgSrc: 'assets/work/intercontinental-hotels-culture-house/main-intercontinental-hotels-culture-house.jpg'
        },
        {
          id: 2,
          imgSrc: 'assets/work/intercontinental-hotels-culture-house/intercontinental-hotels-1-culture-house.jpg'
        },
        {
          id: 3,
          imgSrc: 'assets/work/intercontinental-hotels-culture-house/intercontinental-hotels-2-culture-house.jpg'
        }
      ]
    },
    {
      id: 4,
      title: { en: 'Ghana Edition', ar: 'إصدار غانا' },
      activeImageId: 1, imgSrc: 'assets/work/ghana-edition-culture-house/main-ghana-edition-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          imgSrc: 'assets/work/ghana-edition-culture-house/main-ghana-edition-culture-house.jpg'
        },
        {
          id: 2,
          imgSrc: 'assets/work/ghana-edition-culture-house/ghana-edition-1-culture-house.jpg'
        },
        {
          id: 3,
          imgSrc: 'assets/work/ghana-edition-culture-house/ghana-edition-2-culture-house.jpg'
        }
      ]
    },
    {
      id: 5,
      title: { en: 'The Hidden Kaleidoscope', ar: 'معرض أزياء التراث السعودي (ألوان سرمدية)' },
      activeImageId: 1, imgSrc: 'assets/work/the-hidden-kaleidoscope-culture-house/main-the-hidden-kaleidoscope-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          imgSrc: 'assets/work/the-hidden-kaleidoscope-culture-house/main-the-hidden-kaleidoscope-culture-house.jpg'
        },
        {
          id: 2,
          imgSrc: 'assets/work/the-hidden-kaleidoscope-culture-house/the-hidden-kaleidoscope-1-culture-house.jpg'
        },
        {
          id: 3,
          imgSrc: 'assets/work/the-hidden-kaleidoscope-culture-house/the-hidden-kaleidoscope-2-culture-house.jpg'
        }
      ]
    },
    {
      id: 6,
      title: { en: 'Turquoise Mountain Trust', ar: 'هدايا كبار الشخصيات للجهات الحكومية السعودية' },
      activeImageId: 1, imgSrc: 'assets/work/turquoise-mountain-trust-culture-house/main-turquoise-mountain-trust-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          imgSrc: 'assets/work/turquoise-mountain-trust-culture-house/main-turquoise-mountain-trust-culture-house.jpg'
        },
        {
          id: 2,
          imgSrc: 'assets/work/turquoise-mountain-trust-culture-house/turquoise-mountain-trust-1-culture-house.jpg'
        },
        {
          id: 3,
          imgSrc: 'assets/work/turquoise-mountain-trust-culture-house/turquoise-mountain-trust-2-culture-house.jpg'
        }
      ]
    },
    {
      id: 7,
      title: { en : 'A Day At The Race', ar: 'قواعد اللباس لكأس السعودية' },
      activeImageId: 1, imgSrc: 'assets/work/a-day-at-the-race-culture-house/main-a-day-at-the-race-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          imgSrc: 'assets/work/a-day-at-the-race-culture-house/main-a-day-at-the-race-culture-house.jpg'
        },
        {
          id: 2,
          imgSrc: 'assets/work/a-day-at-the-race-culture-house/a-day-at-the-race-1-culture-house.jpg'
        },
        {
          id: 3,
          imgSrc: 'assets/work/a-day-at-the-race-culture-house/a-day-at-the-race-2-culture-house.jpg'
        }
      ]
    },
    {
      id: 8,
      title: { en: 'Tribe', ar: 'ترايب' },
      activeImageId: 1, imgSrc: 'assets/work/tribe-culture-house/main-tribe-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          imgSrc: 'assets/work/tribe-culture-house/main-tribe-culture-house.jpg'
        },
        {
          id: 2,
          imgSrc: 'assets/work/tribe-culture-house/tribe-1-culture-house.jpg'
        },
        {
          id: 3,
          imgSrc: 'assets/work/tribe-culture-house/tribe-2-culture-house.jpg'
        }
      ]
    },
    {
      id: 9,
      title: { en: 'Fashion Futuress', ar: 'مستقبل الأزياء'},
      activeImageId: 1, imgSrc: 'assets/work/fashion-futures-culture-house/main-fashion-futures-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          imgSrc: 'assets/work/fashion-futures-culture-house/main-fashion-futures-culture-house.jpg'
        },
        {
          id: 2,
          imgSrc: 'assets/work/fashion-futures-culture-house/fashion-futures-1-culture-house.jpg'
        },
        {
          id: 3,
          imgSrc: 'assets/work/fashion-futures-culture-house/fashion-futures-2-culture-house.jpg'
        }
      ]
    },
    {
      id: 10,
      title: { en: 'Souq Waqif', ar: 'سوق واقف' },
      activeImageId: 1, imgSrc: 'assets/work/souq-waqif-culture-house/main-souq-waqif-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          imgSrc: 'assets/work/souq-waqif-culture-house/main-souq-waqif-culture-house.jpg'
        },
        {
          id: 2,
          imgSrc: 'assets/work/souq-waqif-culture-house/souq-waqif-1-culture-house.jpg'
        },
        {
          id: 3,
          imgSrc: 'assets/work/souq-waqif-culture-house/souq-waqif-2-culture-house.jpg'
        }
      ]
    }
  ];

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.setupIntersectionObserver();
      this.lastScrollTop = window.scrollY;
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }

    // Clear all interval timers when component is destroyed
    this.clearAllCarousels();
  }
  startCarousel(project: any): void {
    if (!this.isBrowser) return;

    // Clear any existing interval for this project
    this.clearCarousel(project.id);

    // Run outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      const interval = setInterval(() => {
        // Find the index of the current active image
        const currentIndex = project.carouselImages.findIndex(
          (img: any) => img.id === project.activeImageId
        );

        // Calculate next image index (loop back to first image if at the end)
        const nextIndex = (currentIndex + 1) % project.carouselImages.length;

        // Update the active image ID
        this.ngZone.run(() => {
          project.activeImageId = project.carouselImages[nextIndex].id;
        });
      }, 1100); // Change image every 2 seconds

      // Store the interval ID for cleanup
      this.carouselIntervals.set(project.id, interval);
    });
  }

  // Stop carousel when hover ends
  stopCarousel(project: any): void {
    this.clearCarousel(project.id);
  }

  // Helper method to clear a specific carousel interval
  private clearCarousel(projectId: number): void {
    if (this.carouselIntervals.has(projectId)) {
      clearInterval(this.carouselIntervals.get(projectId));
      this.carouselIntervals.delete(projectId);
    }
  }

  // Helper method to clear all carousel intervals
  private clearAllCarousels(): void {
    this.carouselIntervals.forEach((interval) => clearInterval(interval));
    this.carouselIntervals.clear();
  }

  // Check if an image is active
  isActiveImage(project: any, imageId: number): boolean {
    return project.activeImageId === imageId;
  }
  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.sectionVisible = entry.isIntersecting;
        if (entry.isIntersecting) {
          this.updateTitlePosition();
        }
      });
    }, { threshold: 0.1 });

    if (this.recentWorkSection) {
      this.observer.observe(this.recentWorkSection.nativeElement);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if(!this.isBrowser) {
      return;
    }
    if (this.isTouchDevice) {
      this.clearAllCarousels();
    }

    if (!this.sectionVisible) return;

    const scrollTop = window.scrollY;
    console.log('Scroll Top:', scrollTop);
    const scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';
    this.lastScrollTop = scrollTop;
    console.log('Scroll Direction:', scrollDirection);
    this.updateTitlePosition(scrollDirection);

  }

  updateTitlePosition(scrollDirection: string = 'down') {

    if (!this.isBrowser || !this.recentWorkSection) return;

    const section = this.recentWorkSection.nativeElement;
    const title = section.querySelector('.recent-work__title');
    if (!title) return;

    // Get the section's position relative to the viewport
    const sectionRect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // If section isn't visible yet, position title at starting point (far left)
    // if (sectionRect.top >= viewportHeight || sectionRect.bottom <= 0) {
    //   title.style.transform = 'translateX(-100%)';
    //   return;
    // }

    // Calculate how far we've scrolled through the section
    // This gives us a value from 0 (section just entered view) to 1 (section about to leave view)
    const sectionHeight = sectionRect.height;
    const visibleSectionTop = Math.max(0, sectionRect.top);
    const visibleSectionBottom = Math.min(viewportHeight, sectionRect.bottom);
    const visibleSectionHeight = visibleSectionBottom - visibleSectionTop;

    // Calculate visibility percentage - how much of the section is in view
    const visibilityPercentage = visibleSectionHeight / sectionHeight;

    // Calculate vertical position - where is the section relative to the viewport
    // 0 = section just entered from bottom, 1 = section fully in viewport, 2 = section leaving from top
    const verticalPosition = (viewportHeight - sectionRect.top) / (viewportHeight + sectionHeight);
    const normalizedPosition = Math.max(0, Math.min(1, verticalPosition));

    // Calculate title position: start at -100% (left) and move to 0% (center)
    let translateX;
    if(this.languageService.isRtl()) {
      translateX =51 + (+normalizedPosition * 100);

    } else {
      translateX =-51 + (-normalizedPosition * 100);
    }

    // Apply the translation
    title.style.transform = `translateX(${translateX}%)`;

    // For debugging
    console.log({
      verticalPosition,
      normalizedPosition,
      translateX
    });
  }


}
