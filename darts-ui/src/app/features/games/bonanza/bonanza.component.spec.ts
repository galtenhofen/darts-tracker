import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonanzaComponent } from './bonanza.component';

describe('BonanzaComponent', () => {
  let component: BonanzaComponent;
  let fixture: ComponentFixture<BonanzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonanzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
