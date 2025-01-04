
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { ComicDetailsComponent } from './features/comic/comic-details/comic-details.component';
import { ReadComicComponent } from './features/comic/read-comic/read-comic.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { SaveComponent } from './features/bookmarks/save/save.component';
import { ReadComponent } from './features/bookmarks/read/read.component';
import { CurrentlyReadingComponent } from './features/bookmarks/currently-reading/currently-reading.component';
import { ListAllComicComponent } from './features/result-search/list-all-comic/list-all-comic.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';




const routes: Routes = [
  // {
  //   path: '',  // Khi truy cập vào trang gốc
  //   redirectTo: '/home',  // Điều hướng mặc định đến trang /home
  //   pathMatch: 'full'  // Đảm bảo điều hướng khi path là trang chủ
    
  // },
  {
    path:'admin/categories',
    component: CategoryListComponent, 
    canActivate:[authGuard]
  },
  {
    path:'admin/categories/add',
    component: AddCategoryComponent ,
    canActivate:[authGuard]
  },
  {
    path:'admin/categories/:id',
    component: EditCategoryComponent,
    canActivate:[authGuard]
  },
  {
    path:'',
    component: HomePageComponent,        
  },
  {
    path:'comic/search',
    component: ListAllComicComponent
  },
  {
    path:'comic/:id',
    component: ComicDetailsComponent
  },
  {
    path:'comic/details/read/:id',
    component: ReadComicComponent
  },

  {
    path:'bookmarks/save',
    component: SaveComponent,
    canActivate:[authGuard]
  },
   {
    path:'bookmarks/read',
    component: ReadComponent,
    canActivate:[authGuard]
  },
  {
    path:'bookmarks/currently-reading',
    component: CurrentlyReadingComponent,
    canActivate:[authGuard]
    
  },
  {
    path:'login',
    component: LoginComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
