import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftContentComponent } from './left-content.component';

describe('LeftContentComponent', () => {
  let component: LeftContentComponent;
  let fixture: ComponentFixture<LeftContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftContentComponent]
    });
    fixture = TestBed.createComponent(LeftContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
