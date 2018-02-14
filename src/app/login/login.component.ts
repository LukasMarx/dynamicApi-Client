import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit() {}

  onSubmit(): void {
    this.accountService.login(this.username, this.password).subscribe(() => {
      this.router.navigateByUrl('/projects');
    });
  }
}
