

import { ComicService } from 'src/app/features/comic/services/comic.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Comic } from '../models/comic.model';
import { Rating } from '../models/rating.model';
import { BookmarksService } from '../../bookmarks/services/bookmarks.service';
import { Bookmark } from '../../bookmarks/model/bookmark.model';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { Comment } from '../../comment/model/comment.model';
import { RatingRequest } from '../../rating/models/ratingRequest.model';
import { RatingService } from '../../rating/services/rating.service';



@Component({
  selector: 'app-comic-details',
  templateUrl: './comic-details.component.html',
  styleUrls: ['./comic-details.component.css']
})
export class ComicDetailsComponent implements OnInit, OnDestroy {
    id:string | null = null;
    paramsSubscription?: Subscription;
    statusBookmark?: Bookmark;
    statusBookmarkSubscription?: Subscription;
    //comic?: Comic
     
    comic$: BehaviorSubject<Comic | null> = new BehaviorSubject<Comic | null>(null);

    
    ratingStars: any = {};
    ratingsPercentage?: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    //applicationUserId='80bc701a-c88d-4b4c-8ff5-a85eb79e563f';

    bookmarkModel: Bookmark = {
      isSave: false,
      isRead: false,
      isCurrentlyReading: false,  
    };


   user ?: User


    constructor(private route: ActivatedRoute,private bookmarkService: BookmarksService,
        private comicService: ComicService,
        private  router:Router,private cookieService: CookieService,private authService: AuthService,
        private toastr: ToastrService, private ratingService:RatingService
      ){}


      rateComic(star: number): void {
        const comic = this.comic$.value; 
        const model: RatingRequest = {
          comicId: comic?.id,
          applicationUserId: this.user?.applicationUserId,
          score: star
        };
        
        if(this.user?.applicationUserId)
        {
          this.ratingService.createRateComic(model).subscribe({
            next: (response) => {
             // console.log('?????',response);
              this.toastr.success('Thanks for your rating!');      
            },
            error: (error) => {
              this.toastr.error('Failed to submit your rating. Please try again.');
           //   console.error('Error submitting rating:', error);
            }
          });
        }
        else{
          this.toastr.warning('You must be logged in to use this feature!');      
        }

      }  
      ngOnInit(): void {
        this.user = this.authService.getUser();
    
        this.route.paramMap.subscribe((params) => {
          this.id = params.get('id');
     
          if (this.id) {
            // Lấy trạng thái bookmark
            this.bookmarkService
              .getStatusBookmark(this.user?.applicationUserId, Number(this.id))
              .subscribe((response) => {
                this.statusBookmark = response;
              });
    
            // Lấy thông tin comic
            this.comicService.getComicById(this.id).subscribe({
              next: (response) => {
             //   console.log('response comicById',response );
                  this.comic$.next(response);
                if (response.ratings && Array.isArray(response.ratings)) {
                  this.ratingsPercentage = this.calculateRatings(response.ratings);
                }
              },
              error: (err) => {
              
              },
            });
          }
        });
      }
 // Helper function để tìm bình luận theo ID
      findCommentById(comments: Comment[], commentId: number): Comment | undefined {
        for (let comment of comments) {
          if (comment.commentId === commentId) {
            return comment;
          }
          if (comment.replies) {
            const foundInReplies = this.findCommentById(comment.replies, commentId);
            if (foundInReplies) {
              return foundInReplies;
            }
          }
        }
        return undefined;
      }
      onCommentAdded(newComment: Comment): void {
        const currentComic = this.comic$.value;  // Lấy comic hiện tại      
      //  console.log('newComment', newComment);
        if (currentComic) {
          if (newComment.parentCommentId) {
            // Nếu đây là bình luận trả lời, tìm bình luận cha và thêm vào mảng replies
            const parentComment = this.findCommentById(currentComic.comments, newComment.parentCommentId);      
            if (parentComment) {
              parentComment.replies = parentComment.replies || [];
              parentComment.replies.push(newComment);  // Thêm bình luận vào mảng replies của bình luận cha
            }
          } else {      
           //   console.log('newComment', newComment);    
            currentComic.comments.push(newComment);
          }      
          // Cập nhật lại comic$ và trigger Angular kiểm tra thay đổi
          this.comic$.next({ ...currentComic });
        }
      }
    



  toggleBookmark(comicId: number): void {
    // Kiểm tra trạng thái hiện tại của bookmark (isSave)
    if (this.statusBookmark?.isSave) {
      this.bookmarkModel.isSave = false; // Đổi trạng thái thành chưa lưu
    } else {
      this.bookmarkModel.isSave = true; // Đổi trạng thái thành đã lưu
    }
  
 //   console.log('Trạng thái hiện tại:', this.statusBookmark?.isSave);
  //  console.log('Cập nhật trạng thái isSave:', this.bookmarkModel.isSave);
  
    // Gọi API AddOrUpdate để lưu trạng thái
    if (this.user?.applicationUserId) {
   
      this.bookmarkService
        .addOrUpdateBookmark(this.user.applicationUserId, comicId, this.bookmarkModel)
        .subscribe({
          next: (response) => {
       //     console.log('Bookmark successfully added or updated', response);
  
            // Sau khi cập nhật thành công, cập nhật lại statusBookmark
            this.statusBookmark = { ...this.statusBookmark, isSave: this.bookmarkModel.isSave }; // cú pháp spread operator (...) 
          },
          error: (err) => {
            if (err.status === 401) {
              this.toastr.warning('Bạn không có quyền truy cập chức năng này');
            }
            console.error('Failed to add or update bookmark:', err);
          },
        });
    } else {
      this.toastr.warning('You must be logged in to use this feature!');
    }
  }
  

  calculateRatings(ratings: Rating[]): { [key: number]: number } {
    // Kiểm tra ratings là mảng hợp lệ
    if (Array.isArray(ratings) && ratings.length > 0) {
      // Khai báo kiểu cho ratingsCount
      const ratingsCount: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let totalRatings = 0;
  
      // Đếm số lượng mỗi rating
      ratings.forEach((rating) => {
        if (rating.score >= 1 && rating.score <= 5) {
          ratingsCount[rating.score]++; // Tăng số lượng rating
          totalRatings++; // Tăng tổng số rating
        }
      });
  
      // Kiểm tra nếu không có rating nào để tránh chia cho 0
      if (totalRatings === 0) {
   //     console.error('No valid ratings found');
        return ratingsCount; // Trả về mặc định nếu không có rating hợp lệ
      }
  
      // Khai báo kiểu cho ratingsPercentage
      const ratingsPercentage: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
      // Tính phần trăm cho mỗi rating
      Object.keys(ratingsCount).forEach((key) => {
        const numberKey = Number(key); // Chuyển key sang number
        const percentage = (ratingsCount[numberKey] / totalRatings) * 100;
        ratingsPercentage[numberKey] = parseFloat(percentage.toFixed(2)); // Làm tròn phần trăm
      });
  
      console.log("Kết quả tính phần trăm rating:", ratingsPercentage);
      return ratingsPercentage; // Trả về kết quả phần trăm
    } else {
   //   console.error('Invalid or empty ratings array');
      return {}; // Nếu không phải mảng hợp lệ hoặc mảng trống, trả về đối tượng trống
    }
  }
  
  
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.statusBookmarkSubscription?.unsubscribe();
  }

}
