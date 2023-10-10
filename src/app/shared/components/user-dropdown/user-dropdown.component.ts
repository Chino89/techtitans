import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserResponse } from 'src/app/core/interfaces/userInterfaces';
import { LoginService } from 'src/app/core/services/auth/login.service';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css'],
})
export class UserDropdownComponent implements OnInit {
  @Input() userDetail?: UserResponse;
  @Input() userData?: User;
  @Output() closeDropdownEvent = new EventEmitter();

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onLogOut() {
    this.loginService.logOut();
    this.closeDropdownEvent.emit();
    this.router.navigateByUrl('');
  }
}
