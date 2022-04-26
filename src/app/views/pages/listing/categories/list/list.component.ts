import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';


@Component({
    selector: 'app-categories-list',
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
        this.getCategoriesList();
    }

    getCategoriesList() {
        const apiURL = `api/v1/category/list`;
        // this.mainService.showSpinner();
        this.mainService.getApi(apiURL).subscribe((res: any) => {
            console.log(res)
            this.categoriesList = res && res.length > 0 ? res : [];
            console.log(this.categoriesList)
            // this.mainService.hideSpinner();
        })
    }

    uploadIcon(e: any) {
        if (e.target.files.length <= 0) return false;
        this.icon = e.target.files[0];
        this.categoryId = e.target.id;
        let formData = new FormData();
        formData.append('datafile', this.icon);
        formData.append('id', this.categoryId);
        const apiURL = 'api/v1/category/uploadicon';
        this.mainService.showSpinner();
        this.mainService.uploadApi(apiURL, formData).subscribe((res: any) => {
            this.mainService.hideSpinner();
            if (res && res.data) {
                this.router.navigate(['/categories/list']);
            }
            else this.error = 'There was some error importing the file. Please try again later.';
        })
    }
}
