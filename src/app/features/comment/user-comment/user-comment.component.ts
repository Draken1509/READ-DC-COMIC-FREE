import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';


import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
;


import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../service/comment.service';
import { AddCommentRequest } from '../model/add-comment-request.model';
import { Comment } from '../model/comment.model';


@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.css']
})
export class UserCommentComponent implements OnInit,OnDestroy{
  
  
  @Input() comicId!: number;
  @Output() commentAdded = new EventEmitter<Comment>(); 


  comment?: Comment
  model: AddCommentRequest;  
  private AddCommentSubscription?: Subscription;

  activeReplyId: number | null = null; 


  user ?: User
    constructor(private commentService:CommentService ,
      private authService:  AuthService,private router:Router,
       private toastr: ToastrService ){
        this.model = {
             comicId: null,              
             content: null,                     
             applicationUserId:'',
             parentCommentId: null,                     
             replyUserName:'', 
             answer:0 ,    
             email: '',  
        }
    }
 

  

    OnSubmitComment() {

    if(this.user?.applicationUserId)
    {
      if(this.model.answer==15 ){
        if(this.model.content != null && this.model.content.length <200)
        {
          this.model.comicId = this.comicId;                  
          this.model.applicationUserId = this.user?.applicationUserId;    
  
 
          console.log('commentRequest', this.model);  

          this.commentService.createComment(this.model).subscribe({
            next: (response) => {
        //      console.log('Comment response added:', response);
              const updatedResponse = {
                ...response, // Sao chép tất cả các thuộc tính của response
                applicationUser: {
                  ...(response.applicationUser || {}),
                  userName: this.user?.email, // Thêm userName từ user hiện tại
                },
              };
              this.commentAdded.emit(updatedResponse);
              this.resetModel();
            },
            error: (err) => {
              console.error('Error adding comment:', err);
            }
          });                
          this.activeReplyId = null; // Đóng hộp thoại sau khi gửi
        }
        else{
          this.toastr.error('Invalid value !');
        }
       
      }
      else{
        this.toastr.error('Invalid value !');
      }
     
    }
    else{
      this.toastr.warning('You need to login !');
    }

  }


  ngOnInit(): void {       
    this.user = this.authService.getUser();

  }
  ngOnDestroy(): void {
    this.AddCommentSubscription?.unsubscribe();
  }
  resetModel() {
    this.model = {
      comicId: null,
      content: '',
      applicationUserId: null,
      parentCommentId: null,
      answer: 0,
      email: '',
    };
  }

}
