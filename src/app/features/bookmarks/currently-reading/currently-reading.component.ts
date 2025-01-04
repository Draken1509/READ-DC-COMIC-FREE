import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../auth/services/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ComicService } from '../../comic/services/comic.service';
import { Comic } from '../../comic/models/comic.model';
import { User } from '../../auth/models/user.model';
import { BookmarksService } from '../services/bookmarks.service';

@Component({
  selector: 'app-currently-reading',
  templateUrl: './currently-reading.component.html',
  styleUrls: ['./currently-reading.component.css']
})
export class CurrentlyReadingComponent {
  lstCurrentlyComics$?: Observable<Comic[]>;
  user ?: User
 constructor(private bookmarksService: BookmarksService, private authService: AuthService, private toastrService: ToastrService,){   
}
ngOnInit(): void {
  this.user = this.authService.getUser();
   if(this.user?.applicationUserId)
   {
      this.lstCurrentlyComics$ =this.bookmarksService.getCurrentlyReadingComic('56c174e4-31ba-45dd-b26d-1d18da684e6b');
   }
   else{
    this.toastrService.warning('You must be logged in to continue !');
   }
  
 
  }
}
