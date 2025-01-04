import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComicService } from '../../comic/services/comic.service';
import { Comic } from '../../comic/models/comic.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-all-comic',
  templateUrl: './list-all-comic.component.html',
  styleUrls: ['./list-all-comic.component.css']
})
export class ListAllComicComponent implements OnInit, OnDestroy {
  comics: Comic[] = [];
  totalItems: number = 0;  
  totalPages: number = 0;  
  pageNumber: number = 1;  
  pageSize: number = 5;   


  filterOn: string = '';
  filterQuery: string = '';

  paginationPages: (string | number)[] = [];
  
  private comicsSubscription?: Subscription;

  constructor(private comicService: ComicService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadComics();
  }

  loadComics(): void {
    this.route.queryParams.subscribe(params => {
      this.filterOn = params['filterOn'];
      this.filterQuery = params['filterQuery'];

      this.comicsSubscription = this.comicService.getAllComic(this.filterOn, this.filterQuery, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          this.comics = response.comics;
          this.totalItems = response.totalItems;
          this.totalPages = response.totalPages;
      //    console.log('Comics:', this.comics);
      //    console.log('Total items:', this.totalItems);
       //   console.log('Total pages:', this.totalPages);
          this.updatePagination();
        },
        error: (error) => {
          console.error('Error loading comics:', error);
        }
      });
      
    });
  }
  
  

  updatePagination() {
    const pageLinks: (string | number)[] = [];  // Khai báo kiểu Array<string | number>

    // Always show the first page
    pageLinks.push(1);

    // Show "..." if the pages are too many
    if (this.pageNumber > 3) {
      pageLinks.push('...');
    }

    // Show nearby pages
    for (let i = Math.max(2, this.pageNumber - 2); i <= Math.min(this.totalPages - 1, this.pageNumber + 2); i++) {
      pageLinks.push(i);
    }

    // Show "..." if the pages are too many
    if (this.pageNumber < this.totalPages - 2) {
      pageLinks.push('...');
    }

    // Always show the last page
    if (this.totalPages > 1) {
      pageLinks.push(this.totalPages);
    }

    this.paginationPages = pageLinks;
  }
  onPageChange(page: number | string) {
    if (page === '...') return; // Do nothing for "..."
    this.pageNumber = page as number;  // Chuyển về kiểu number
    this.loadComics();
  }

  ngOnDestroy(): void {
    if (this.comicsSubscription) {
      this.comicsSubscription.unsubscribe();
    }
  }
}
