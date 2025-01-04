import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comic } from '../models/comic.model';
import { baseUrlImage, environment } from 'src/environments/environment.development';
import { Page } from '../models/page.model';
@Injectable({
  providedIn: 'root'
})
export class ComicService {   
    constructor(private http: HttpClient) {}
  
    // API với tham số phân trang
    getAllComic(
      filterOn: string = '', 
      filterQuery: string = '', 
      pageNumber: number=1, 
      pageSize: number=1000   
    ): Observable<any> {
      let url = `${environment.apiBaseUrl}/api/comic?`;
    
      // Thêm các tham số vào URL nếu có
      if (filterOn) url += `filterOn=${filterOn}&`;
      if (filterQuery) url += `filterQuery=${filterQuery}&`;
      if (pageNumber) url += `pageNumber=${pageNumber}&`;
      if (pageSize) url += `pageSize=${pageSize}&`;
    
      // Cắt bỏ dấu "&" thừa ở cuối URL
      url = url.slice(0, -1);
    
      return this.http.get<any>(url).pipe(
        map(response => {
          const totalItems = response.totalItems; // Lấy totalItems từ response
          const comics = response.comics; // Lấy danh sách comics
    
          let totalPages = 0;
          if (pageSize != null && pageSize != undefined) {
            totalPages = Math.ceil(totalItems / pageSize); // Tính số trang
          }
    
          // Định dạng lại dữ liệu comic (ví dụ: xử lý thumbnail)
          const formattedComics = comics.map((comic: Comic) => ({
            ...comic,
            thumbnail: comic.thumbnail
              ? `${baseUrlImage.apiBaseUrl}/${comic.thumbnail}`
              : 'assets/default-image.jpg'
          }));
    
          // Trả về kết quả bao gồm comics, totalItems, totalPages
          return {
            comics: formattedComics,
            totalItems: totalItems,
            totalPages: totalPages
          };
        })
      );
    }
    
  


  getHighestRatingComic(): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${environment.apiBaseUrl}/api/comic/highest-rating`).pipe(
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

  getLastestComic(): Observable<Comic[]> {
    return this.http.get<Comic[]>(`${environment.apiBaseUrl}/api/comic/latest`).pipe(
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

  getComicById(id: string): Observable<Comic> {
    return this.http.get<Comic>(`${environment.apiBaseUrl}/api/comic/${id}`).pipe(
      map(comic => ({
        ...comic,
        thumbnail: comic.thumbnail
          ? `${baseUrlImage.apiBaseUrl}/${comic.thumbnail}`
          : 'assets/default-image.jpg'
      }))
    );
  }

  getPageById(id: string): Observable<Page[]> {
    return this.http.get<Page[]>(`${environment.apiBaseUrl}/api/comic/page/${id}`).pipe(
      map(comics =>
        comics.map(comic => ({
          ...comic,
          imageUrl: comic.imageUrl
            ? `${baseUrlImage.apiBaseUrl}/${comic.imageUrl}`
            : 'assets/default-image.jpg'
        }))
      )
      );    
  }



  
}
   


  //  addCategory(model:AddCategoryRequest):Observable<void>{
  //    return this.http.post<void>(`${environment.apiBaseUrl}/api/Series`,model);
  //  }
 
  //  getAllCategory():Observable<Category[]>{
  //    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Series`);
  //  }

