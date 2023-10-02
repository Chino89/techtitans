import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropdownItem } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() items: DropdownItem[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToPage(event: Event, link: string) {
    event.stopPropagation();
    this.router.navigate([link]);
  }
}
