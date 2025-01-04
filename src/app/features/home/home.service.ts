import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Comic } from '../comic/models/comic.model';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

 constructor(private http: HttpClient) { }
   

}
