import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  showInstitucional= false;
  showMobileMenu= false;
  dropdown= false;

  openMobileMenu() {
    this.showMobileMenu = true
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
    this.showInstitucional= false;
  }

  toggleInstitucional() {
    this.showInstitucional = !this.showInstitucional
  }

  action() {
    this.dropdown = !this.dropdown
  }
  
  ngOnInit(): void {
  }

}
