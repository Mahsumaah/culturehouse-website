import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';

@Component({
  selector: 'app-recent-work',
  standalone: true,
  imports: [],
  templateUrl: './recent-work.component.html',
  styleUrl: './recent-work.component.scss'
})
export class RecentWorkComponent implements AfterViewInit{
  @ViewChild('recentWorkSection') recentWorkSection!: ElementRef;
  private lastScrollTop = 0;
  private sectionVisible = false;
  private observer!: IntersectionObserver;

  recentWork = [
    {
      id: 2,
      title: 'Shop Beirut',
      activeImageId: 1, // Track active image
      imgSrc: 'assets/work/shop-beirut-culture-house/main-shop-beirut-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          imgSrc: 'assets/work/shop-beirut-culture-house/main-shop-beirut-culture-house.jpg'
        },
        {
          id: 2,
          imgSrc: 'assets/work/shop-beirut-culture-house/shop-beirut-1-culture-house.jpg'
        },
        {
          id: 3,
          imgSrc: 'assets/work/shop-beirut-culture-house/shop-beirut-2-culture-house.jpg'
        }
      ]
    },
    {
      id: 3,
      title: 'Intercontinental Hotels',
      activeImageId: 1, imgSrc: 'assets/work/intercontinental-hotels-culture-house/main-intercontinental-hotels-culture-house.jpg',
      carouselImages: [
        {
          id: 1,
          activeImageId: 1, imgSrc: 'assets/work/intercontinental-hotels-culture-house/main-intercontinental-hotels-culture-house.jpg'
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
      title: 'Ghana Edition',
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
      title: 'The Hidden Kaleidoscope',
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
      title: 'Turquoise Mountain Trust',
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
      title: 'A Day At The Race',
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
      title: 'Tribe',
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
      title: 'Fashion Futuress',
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
      title: 'Souq Waqif',
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
    this.setupIntersectionObserver();
    this.lastScrollTop = window.scrollY;
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
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
    if (!this.sectionVisible) return;

    const scrollTop = window.scrollY;
    console.log('Scroll Top:', scrollTop);
    const scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';
    this.lastScrollTop = scrollTop;
    console.log('Scroll Direction:', scrollDirection);
    this.updateTitlePosition(scrollDirection);
  }

  updateTitlePosition(scrollDirection: string = 'down') {
    if (!this.recentWorkSection) return;

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
    const translateX =-51 + (-normalizedPosition * 100);

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
