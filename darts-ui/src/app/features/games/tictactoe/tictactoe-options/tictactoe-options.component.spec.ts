import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TictactoeOptionsComponent } from './tictactoe-options.component';

describe('TictactoeOptionsComponent', () => {
  let component: TictactoeOptionsComponent;
  let fixture: ComponentFixture<TictactoeOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TictactoeOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TictactoeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
