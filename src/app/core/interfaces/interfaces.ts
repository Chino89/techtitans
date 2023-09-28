import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export type CarouselItem = {
  img: string;
  alt: string;
};

export type DropdownItem = {
  svg: string;
  routerLink: string;
  component: string;
  phrase: string;
};

export type Customizer = {
  svg: string;
  action: string;
  style: string;
};

export type BackEndResponse = {
  mensaje: string;
};

export type BackEndError = {
  mensaje: string;
};

export interface onExit {
  onExit: (
    nextRoute: RouterStateSnapshot | undefined
  ) => Observable<boolean> | Promise<boolean> | boolean;
}
