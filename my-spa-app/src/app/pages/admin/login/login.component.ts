import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  constructor(private router: Router) {} 

  loginObj: any = {
    userName: '',
    password: ''
  };

  onLogin() {
    if (this.loginObj.userName === 'admin' && this.loginObj.password === 'admin') {
      this.router.navigateByUrl('/products');
    } else {
      alert("Invalid credentials");
    }
  }
}
