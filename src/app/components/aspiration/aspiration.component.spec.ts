import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspirationComponent } from './aspiration.component';

describe('AspirationComponent', () => {
  let component: AspirationComponent;
  let fixture: ComponentFixture<AspirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AspirationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
