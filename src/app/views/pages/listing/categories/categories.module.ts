import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeahterIconModule } from '../../../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './categories.component';
import { CategoriesListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: CategoriesListComponent
            },
        ]
    }
]

@NgModule({
    declarations: [CategoriesComponent, CategoriesListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FeahterIconModule,
        NgbAccordionModule,
        NgbDropdownModule,
        NgbTooltipModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class CategoriesModule { }
