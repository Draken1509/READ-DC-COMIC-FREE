

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AddCommentRequest } from '../model/add-comment-request.model';
import { Comment } from '../model/comment.model';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
     createComment(model: AddCommentRequest):Observable<Comment>{
      return this.http.post<Comment>(`${environment.apiBaseUrl}/api/ApplicationUser/create-comment?addAuth=true`,model);
    }
}
