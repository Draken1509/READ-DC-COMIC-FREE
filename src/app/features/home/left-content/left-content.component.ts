import { Component } from '@angular/core';
import { Comic } from '../../comic/models/comic.model';
import { ComicService } from '../../comic/services/comic.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-left-content',
  templateUrl: './left-content.component.html',
  styleUrls: ['./left-content.component.css']
})
export class LeftContentComponent {

 highestRatingComic$ ?: Observable<Comic[]>;
  constructor(private ComicService: ComicService){   
  }

  ngOnInit(): void {
    this.highestRatingComic$ =this.ComicService.getHighestRatingComic();

  }
}
