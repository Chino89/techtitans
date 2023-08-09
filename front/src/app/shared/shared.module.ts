import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CourseCardComponent } from './components/course-card/course-card.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, CourseCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, FooterComponent, CourseCardComponent
  ],
})
export class SharedModule { }
