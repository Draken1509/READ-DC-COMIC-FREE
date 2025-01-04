import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ComicService } from 'src/app/features/comic/services/comic.service';
import { Comic } from 'src/app/features/comic/models/comic.model';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  //encapsulation: ViewEncapsulation.Emulated, 
  encapsulation:ViewEncapsulation.None ,  //Áp dụng css lên toàn bộ phạm vi ứng dụng. 
})
export class SwiperComponent { //
   comics$?: Observable<Comic[]>;
   // comics?: Comic[];
    constructor(private ComicService: ComicService){   
    }
  
    ngOnInit(): void {
    this.comics$ =this.ComicService.getHighestRatingComic();
    //    this.ComicService.getHighestRatingComic()
    // .subscribe({
    //   next:(response)=>{
    //     this.comics=response;
    //     console.log('Kết quả:',  this.comics); // In danh sách comics
    //   }
    // });
      
      
      // this.ComicService.getHighestRatingComic().subscribe({
      //   next: (data) => {
      //     console.log('Kết quả:', data); // In danh sách comics
      //   },
      //   error: (err) => {
      //     console.error('Lỗi:', err); // Xử lý lỗi nếu có
      //   },
      // });
  
  
  
    }

  myConfig = {
    slidesPerView: 3,
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 3, // Hiển thị 1 slide khi màn hình nhỏ hơn 640px
      },
      1024: {
        slidesPerView: 8, // Hiển thị 3 slide khi màn hình lớn hơn 1024px
      }
    }
  };
}
