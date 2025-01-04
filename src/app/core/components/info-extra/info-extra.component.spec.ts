import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoExtraComponent } from './info-extra.component';

describe('InfoExtraComponent', () => {
  let component: InfoExtraComponent;
  let fixture: ComponentFixture<InfoExtraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoExtraComponent]
    });
    fixture = TestBed.createComponent(InfoExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
