import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comic } from '../../comic/models/comic.model';
import { map, Observable } from 'rxjs';
import { baseUrlImage, environment } from 'src/environments/environment.development';
import { Bookmark } from '../model/bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

 constructor(private http: HttpClient) {} 


  addOrUpdateBookmark(userId: string, comicId: number, model: Bookmark): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Bookmark?userId=${userId}&ComicId=${comicId}&addAuth=true`, model);
  }

  getStatusBookmark(userId: string='', comicId: number=0): Observable<Bookmark> {
    return this.http.get<Bookmark>(`${environment.apiBaseUrl}/api/Bookmark/status?userId=${userId}&ComicId=${comicId}`);
  }
  
  getSavedComic(id:string): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${environment.apiBaseUrl}/api/Bookmark/saved/${id}?addAuth=true`).pipe(
      map(comics =>
        comics.map(comic => ({
          ...comic,
          thumbnail: comic.thumbnail
            ? `${baseUrlImage.apiBaseUrl}/${comic.thumbnail}`
            : 'assets/default-image.jpg'
        }))
      )
    );
  }

  getReadComic(id:string): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${environment.apiBaseUrl}/api/Bookmark/read/${id}?addAuth=true`).pipe(
      map(comics =>
        comics.map(comic => ({
          ...comic,
          thumbnail: comic.thumbnail
            ? `${baseUrlImage.apiBaseUrl}/${comic.thumbnail}`
            : 'assets/default-image.jpg'
        }))
      )
    );
  }

  getCurrentlyReadingComic(id:string): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${baseUrlImage.apiBaseUrl}/api/Bookmark/currently-reading/${id}?addAuth=true`).pipe(
      map(comics =>
        comics.map(comic => ({
          ...comic,
          thumbnail: comic.thumbnail
            ? `${environment.apiBaseUrl}/${comic.thumbnail}`
            : 'assets/default-image.jpg'
        }))
      )
    );
  }




}
