import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllComicComponent } from './list-all-comic.component';

describe('ListAllComicComponent', () => {
  let component: ListAllComicComponent;
  let fixture: ComponentFixture<ListAllComicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAllComicComponent]
    });
    fixture = TestBed.createComponent(ListAllComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
