import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeOptionsComponent } from './three-options.component';

describe('ThreeOptionsComponent', () => {
  let component: ThreeOptionsComponent;
  let fixture: ComponentFixture<ThreeOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
