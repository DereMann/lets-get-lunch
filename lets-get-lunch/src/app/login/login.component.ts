import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { User } from '../services/auth/user';
import { AuthService } from '../services/auth/auth.service'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = { username: '', password: ''}; //bound in html file

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  login(credentials) {
    this.authService.login(credentials).subscribe(res => {
      this.router.navigate(['/dashboard']);
    });
  };
}
