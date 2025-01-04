import { Component, ViewEncapsulation } from '@angular/core';
import { Comic } from '../../comic/models/comic.model';
import { ComicService } from '../../comic/services/comic.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {
//  comics$?: Observable<Comic[]>;
//  lastestComic$?: Observable<Comic[]>;
 
//   constructor(private ComicService: ComicService){   
//   }

//   ngOnInit(): void {
//     this.comics$ =this.ComicService.getAllComic();
//     this.lastestComic$ =this.ComicService.getLastestComic();
  
//   }
}
