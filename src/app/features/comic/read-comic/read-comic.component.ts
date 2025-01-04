import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComicService } from '../services/comic.service';
import { Page } from '../models/page.model';


@Component({
  selector: 'app-read-comic',
  templateUrl:'./read-comic.component.html',
  styleUrls: ['./read-comic.component.css']
})
export class ReadComicComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  page?: Page[];
  currentPageIndex = 0;
  isSelected: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private comicService: ComicService,
    private router: Router
  ) {}

  nextPage() {
    if(this.page)
    {
      if (this.currentPageIndex < this.page.length - 1) {
        this.currentPageIndex++;
      }
    }
  
  }
  previousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }
  
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  goToPage(i: number): void {
    if (this.page && i >= 0 && i < this.page.length) {
      this.currentPageIndex = i;
      // Thực hiện các thao tác cần thiết để cập nhật nội dung trang
  //    console.log(`Chuyển đến trang ${i + 1}`);
    } else {
   //   console.error('Chỉ số trang không hợp lệ');
    }
  }
  
  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
      //    console.log('id la', this.id);
          this.comicService.getPageById(this.id).subscribe({
            next: (response) => {
              this.page = response;
          //    console.log('Kết quả response page', response);
            },
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
}
