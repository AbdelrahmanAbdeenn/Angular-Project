import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedInputComponent } from './input.component';

describe('InputComponent', () => {
  let component: SharedInputComponent;
  let fixture: ComponentFixture<SharedInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
