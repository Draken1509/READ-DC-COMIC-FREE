import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadComicComponent } from './read-comic.component';

describe('ReadComicComponent', () => {
  let component: ReadComicComponent;
  let fixture: ComponentFixture<ReadComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadComicComponent]
    });
    fixture = TestBed.createComponent(ReadComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
