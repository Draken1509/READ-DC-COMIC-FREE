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
  selector: 'app-user-reply',
  templateUrl: './user-reply.component.html',
  styleUrls: ['./user-reply.component.css']
})
export class UserReplyComponent implements OnInit,OnDestroy{
  
  
  @Input() comicId!: number;
  @Input() comments: Comment[] = [];
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
             answer:0, 
             applicationUser: null,  
        }
    }
 

  toggleReplyBox(commentId: number): void {
    this.activeReplyId = this.activeReplyId === commentId ? null : commentId;
  }

  OnSubmitReply(commentId: number) {

    if(this.user?.applicationUserId)
    {
      this.model.comicId = this.comicId;
      this.model.parentCommentId = commentId;                  
      this.model.applicationUserId = this.user?.applicationUserId;       
    // Trước khi gửi yêu cầu API

      
      //this.model.replyUserName = this.comment?.replyUserName;
      //this.model.replyUserName = 'trung ne';
      
      console.log('this.model  Comment added', this.model);  
      // Gửi yêu cầu tạo comment (hoặc reply)
      this.commentService.createComment(this.model).subscribe({
        next: (response) => {
       //   console.log('Comment added response :', response);
          // Phát sự kiện với comment mới hoặc reply
          const updatedResponse = {
            ...response, // Sao chép tất cả các thuộc tính của response
            applicationUser: {
              ...(response.applicationUser || {}),
              userName: this.user?.email, // Thêm userName từ user hiện tại
            },
          };
          
          this.commentAdded.emit(updatedResponse);
        },
        error: (err) => {
          console.error('Error adding comment:', err);
        }
      });
  
      this.activeReplyId = null; // Đóng hộp thoại sau khi gửi
    }
    else{
      this.toastr.warning('You need to login !')
    }

  }


  ngOnInit(): void {       
    this.user = this.authService.getUser();
    console.log('this.comicIdthis.comicIdthis.comicIdthis.comicId', this.comments);    
  }
  ngOnDestroy(): void {
    this.AddCommentSubscription?.unsubscribe();
  }


}
