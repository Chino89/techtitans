import { Component, Input, OnInit } from '@angular/core';

import { customizedToasts } from '../../../../assets/icons/toast/customizeToast';
import { Customizer } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.css'],
})
export class CustomToastComponent implements OnInit {
  @Input() toastType: string = '';
  customizedToasts: {
    [key: string]: Customizer;
  } = customizedToasts;

  constructor() {}

  ngOnInit(): void {}
}
