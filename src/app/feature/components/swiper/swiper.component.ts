import { Component, Input, OnInit } from '@angular/core';
import { CarouselItem } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
})
export class SwiperComponent implements OnInit {
  @Input() carouselContent: CarouselItem[] = [];
  constructor() {}

  ngOnInit(): void {}
}
