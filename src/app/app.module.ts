import { SwiperModule } from 'swiper/angular';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { SwiperComponent } from './core/components/swiper/swiper.component';
import { ReadComicComponent } from './features/comic/read-comic/read-comic.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainContent } from './features/home/main-content/main-content.component';

import { HomePageComponent } from './features/home/home-page/home-page.component';
import { FooterComponent } from './features/home/footer/footer.component';
import { LeftContentComponent } from './features/home/left-content/left-content.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { SaveComponent } from './features/bookmarks/save/save.component';
import { ReadComponent } from './features/bookmarks/read/read.component';
import { CurrentlyReadingComponent } from './features/bookmarks/currently-reading/currently-reading.component';
import { InfoExtraComponent } from './core/components/info-extra/info-extra.component';
import { ListAllComicComponent } from './features/result-search/list-all-comic/list-all-comic.component';
import { PaginationComponent } from './core/components/pagination/pagination.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeLayoutComponent } from './core/components/Layout/home-layout/home-layout.component';
import { MainLayoutComponent } from './core/components/Layout/main-layout/main-layout.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UserReplyComponent } from './features/comment/user-reply/user-reply.component';
import { UserCommentComponent } from './features/comment/user-comment/user-comment.component';
import { UserRatingComponent } from './features/rating/user-rating/user-rating.component';
import { ComicDetailsComponent } from './features/comic/comic-details/comic-details.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    SwiperComponent,
    MainContent,    
    ReadComicComponent,
    HomePageComponent,
    FooterComponent,
    LeftContentComponent,
    EditCategoryComponent,
    SaveComponent,
    ReadComponent,
    CurrentlyReadingComponent,
    InfoExtraComponent,
    ListAllComicComponent,
    PaginationComponent,
    UserReplyComponent,
    UserCommentComponent,
    LoginComponent,
    HomeLayoutComponent,
    MainLayoutComponent,
    UserRatingComponent,
    ComicDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    SwiperModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),    
  ],
  providers: [
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
