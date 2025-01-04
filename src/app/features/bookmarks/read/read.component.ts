import { BookmarksService } from './../services/bookmarks.service';
import { ComicService } from 'src/app/features/comic/services/comic.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../../comic/models/comic.model';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent {
lstReadComics$?: Observable<Comic[]>;
 constructor(private bookmarksService: BookmarksService){   
}
ngOnInit(): void {
  this.lstReadComics$ =this.bookmarksService.getReadComic('56c174e4-31ba-45dd-b26d-1d18da684e6b');    
  }
}
