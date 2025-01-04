import { CategoryService } from './../services/category.service';
import { Category } from './../models/category.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateCategoryRequest } from '../models/update-category-request.model copy';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit,OnDestroy {
  id:string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category ?: Category
  constructor(private route: ActivatedRoute,
    private CategoryService: CategoryService,
    private  router:Router
  ){

  }
 
  ngOnInit(): void {
    this.paramsSubscription=this.route.paramMap.subscribe({
      next: (params)=>{
        this.id=params.get('id');
        if(this.id){
          this.CategoryService.getCategoryById(this.id)
          .subscribe({
            next: (response)=>{
                this.category = response;
                console.log("thong tin chi tiet caterory",response);
          },
            error: (err) => {
              console.error('Error fetching category:', err);
              this.category = undefined; 
            },
        });
        }
      }
    });
  }
  onFormSubmit(): void {
   // console.log("this.category");
   const updateCategoryRequest : UpdateCategoryRequest ={
    name: this.category?.name ?? '',
    description: this.category?.description ?? ''
   };

   if(this.id){
    this.editCategorySubscription=this.CategoryService.updateCategory(this.id, updateCategoryRequest)
    .subscribe({
      next: (response)=>{
        console.log("category updated", response);
        this.router.navigateByUrl('/admin/categories')
    }});
  }
}
 onDelete(): void{
  if(this.id){
    this.CategoryService.deleteCategoryById(this.id).subscribe(
      {
        next: (response)=>{
          this.router.navigateByUrl('/admin/categories');
        }
      }
    )
  }
   
 }


ngOnDestroy(): void {
  this.paramsSubscription?.unsubscribe;
  this.editCategorySubscription?.unsubscribe;
 }
}