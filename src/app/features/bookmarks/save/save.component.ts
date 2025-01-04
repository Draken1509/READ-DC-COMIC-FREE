import { AuthService } from './../../auth/services/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from '../../comic/models/comic.model';
import { ComicService } from '../../comic/services/comic.service';
import { User } from '../../auth/models/user.model';
import { BookmarksService } from '../services/bookmarks.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent {
 lstSaveComics$?: Observable<Comic[]>;
 user ?: User

 constructor(private bookmarksService: BookmarksService, private authService: AuthService){   
}
ngOnInit(): void {
  this.user = this.authService.getUser();
  if(this.user?.applicationUserId)
  {
    this.lstSaveComics$ =this.bookmarksService.getSavedComic( this.user.applicationUserId);
  }

  // this.ComicService.getSavedComic('56c174e4-31ba-45dd-b26d-1d18da684e6b').subscribe({
  //   next: (data) => {
  //     console.log('Saved comics:', data);     
  //   },
  //   error: (err) => {
  //     console.error('Error fetching saved comics:', err);
  //   },
  // });
  
  }
}