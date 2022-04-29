import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';


@Component({
    selector: 'app-product-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class CategoriesListComponent implements OnInit {

    categoriesList: any;
    envApiUrl: any = environment.apiURL;
    icon: any;
    categoryId: any;
    error: string;

    constructor(public mainService: MainService, private router: Router) { }

    ngOnInit(): void {
    }


}
