import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from './../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{

  //categories?: Category[];
  categories$?: Observable<Category[]>;
  constructor(private CategoryService: CategoryService){   
  }

  ngOnInit(): void {
    this.categories$ =this.CategoryService.getAllCategory();
    // this.CategoryService.getAllCategory()
    // .subscribe({
    //   next:(response)=>{
    //     this.categories=response;
    //   }
    // });
  }
}
