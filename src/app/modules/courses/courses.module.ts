import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule y/o ReactiveFormsModule

import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { HttpClientModule } from '@angular/common/http';
import { FeatureModule } from 'src/app/feature/feature.module';

@NgModule({
    declarations: [CoursesPageComponent],
    imports: [
        CommonModule, 
        CoursesRoutingModule, 
        SharedModule, 
        FeatureModule, 
        HttpClientModule,
        FormsModule, 
        ReactiveFormsModule 
    ],
    exports: [
        CoursesPageComponent
    ],
    providers: [],
})
export class CoursesModule {}
