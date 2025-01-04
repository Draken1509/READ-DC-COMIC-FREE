import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainContent } from './main-content.component';



describe('MainContent', () => {
  let component: MainContent;
  let fixture: ComponentFixture<MainContent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainContent]
    });
    fixture = TestBed.createComponent(MainContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
