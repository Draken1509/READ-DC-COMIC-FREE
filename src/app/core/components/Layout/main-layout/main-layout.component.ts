import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
    constructor(private router: Router)
    {

    }
    get hideNavbar(): boolean {
      return this.router.url.startsWith('/comic/details/read/');
    }
  
    get hideFooter(): boolean {
      return this.router.url.startsWith('/comic/details/read/');
    }
  
    get hideInfoExtra(): boolean {
      return this.router.url.startsWith('/comic/details/read/');
    }
}
