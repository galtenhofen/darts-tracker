import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonanzaOptionsComponent } from './bonanza-options.component';

describe('BonanzaOptionsComponent', () => {
  let component: BonanzaOptionsComponent;
  let fixture: ComponentFixture<BonanzaOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonanzaOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonanzaOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
