import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CricketOptionsComponent } from './cricket-options.component';

describe('CricketOptionsComponent', () => {
  let component: CricketOptionsComponent;
  let fixture: ComponentFixture<CricketOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CricketOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CricketOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
