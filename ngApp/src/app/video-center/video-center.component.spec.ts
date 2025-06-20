import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCenterComponent } from './video-center.component';

describe('VideoCenterComponent', () => {
  let component: VideoCenterComponent;
  let fixture: ComponentFixture<VideoCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
