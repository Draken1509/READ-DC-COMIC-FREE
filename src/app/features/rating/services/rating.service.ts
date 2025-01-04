import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RatingRequest } from '../models/ratingRequest.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  createRateComic(model:RatingRequest):Observable<RatingRequest>{
    return this.http.post<RatingRequest>(`${environment.apiBaseUrl}/api/ApplicationUser/rate?addAuth=true`,model);
  }
}
