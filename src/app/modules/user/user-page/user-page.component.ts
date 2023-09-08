import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/interfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';



@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  user?: User

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.currentUserData.subscribe(data => {
      this.user = data
    })
  }

}