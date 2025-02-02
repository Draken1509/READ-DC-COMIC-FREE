import { CookieService } from 'ngx-cookie-service';
import { UpdateCategoryRequest } from './../models/update-category-request.model copy';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {  

  constructor(private http: HttpClient, private cookieService:CookieService ) { }
  
  addCategory(model:AddCategoryRequest):Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Series?addAuth=true`,model);
  }

  getAllCategory():Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Series`);
  }

  getCategoryById(id:string):Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/Series/${id}`);
  }

  updateCategory(id:string,updateCategoryRequest: UpdateCategoryRequest):Observable<Category>{
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/series/${id}`,updateCategoryRequest);

    // {
    //   headers:{
    //     'Authorization': this.cookieService.get('Authorization')
    //   }
    // }
  }

  deleteCategoryById(id:string):Observable<Category>{
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Series/${id}`);
  }

}
