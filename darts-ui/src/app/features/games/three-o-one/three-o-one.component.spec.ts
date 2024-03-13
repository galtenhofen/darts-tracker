import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeOOneComponent } from './three-o-one.component';

describe('ThreeOOneComponent', () => {
  let component: ThreeOOneComponent;
  let fixture: ComponentFixture<ThreeOOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeOOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeOOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
