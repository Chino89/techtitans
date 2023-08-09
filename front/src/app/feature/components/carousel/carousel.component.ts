import { Component, Input, OnInit } from '@angular/core';

type CarouselItem = {
  img: string;
  alt: string;
};

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() carouselContent: CarouselItem[] = [];
  emptyArray: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.emptyArray = new Array(this.carouselContent.length);
  }

}
