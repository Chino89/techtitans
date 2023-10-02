import { Component, Input, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() carouselContent: CarouselItem[] = [];
  emptyArray: CarouselItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.emptyArray = new Array(this.carouselContent.length);
  }
}
