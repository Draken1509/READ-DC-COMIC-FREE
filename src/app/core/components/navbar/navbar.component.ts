import { AuthService } from './../../../features/auth/services/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {
  searchQuery: string = ''; 
  user?: User
  constructor(private authService: AuthService ,private router: Router,private cdRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.authService.User().subscribe({
      next :(response)=>{
        this.user=response;
        console.log(response);
      }
    });
    this.user=this.authService.getUser()
  }
  OnLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {
        this.cdRef.detectChanges(); // Kích hoạt việc cập nhật giao diện
    });
}

  // Hàm này sẽ được gọi khi form submit
  onSearch() {
    if (this.searchQuery) {
      this.router.navigate(['/comic/search'], { queryParams: { filterOn: 'name', filterQuery: this.searchQuery } });
    }
  }
}
