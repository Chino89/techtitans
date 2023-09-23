import { Component, Input, OnInit } from '@angular/core';
import { DropdownItem } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() items: DropdownItem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
