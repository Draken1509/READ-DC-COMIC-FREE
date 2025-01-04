import { Router } from '@angular/router';
import { CategoryService } from './../services/category.service';
import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  model:AddCategoryRequest;  
  private AddCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService, private router:Router, private toastr: ToastrService){
   this.model = {
    name:'',
    description:''
   }
  }
  showSuccess() {
    this.toastr.warning('create successful', 'Toastr fun!');
  }
  ngOnDestroy(): void {
    console.log('AddCategoryComponent has been destroyed');
    this.AddCategorySubscription?.unsubscribe();  
  }

  onFormSubmit(){
    
       this.AddCategorySubscription=this.categoryService.addCategory(this.model)
     .subscribe({
      next:(response)=>{
       this.showSuccess();
       this.router.navigateByUrl('admin/categories');
      }
     })
    
   }
}

//  this.categoryService.addCategory(this.model)
    //  .subscribe({
    //   next:(response)=>{
    //     console.log('this was successful');
    //   }
    //  })