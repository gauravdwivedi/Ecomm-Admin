import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeahterIconModule } from '../../../core/feather-icon/feather-icon.module';

import { NgbAccordionModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './list/list.component';
import { UserAddEditComponent } from './add-edit/add-edit.component';
import { UserAdd } from './add/add.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: UsersListComponent
            },
            {
                path: 'action',
                component: UserAddEditComponent
            },
            {
                path: 'add',
                component: UserAdd
            }
        ]
    }
]

@NgModule({
    declarations: [UsersComponent, UsersListComponent, UserAddEditComponent, UserAdd],
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
export class UsersModule { }
