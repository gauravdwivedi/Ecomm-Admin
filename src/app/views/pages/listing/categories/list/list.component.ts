import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/provider/main.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
// import { DomSanitizer } from '@angular/platform-browser'


// class ImageSnippet {
//     constructor(public src: string, private domSanitizer: DomSanitizer) { }
// }

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
    ImgUrl: string = '';
    constructor(public mainService: MainService, private router: Router) { }

    ngOnInit(): void {
        this.getCategoriesList();
    }

    getCategoriesList() {
        const apiURL = `api/v1/category/list`;
        // this.mainService.showSpinner();
        this.mainService.getApi(apiURL).subscribe((res: any) => {
            console.log('RESSS', res.result)
            this.categoriesList = res && res.result.length > 0 ? res.result : [];
            console.log(this.categoriesList)
            // this.mainService.hideSpinner();
        })
    }


    // processFile(imageInput: any) {
    //     const file: File = imageInput.files[0]
    //     console.log('FIle', file)

    //     const reader = new FileReader();
    //     const apiURL = 'api/v1/category/uploadicon';


    //     reader.addEventListener('load', (event: any) => {
    //         this.selectedFile = new ImageSnippet(event.target.result, file);
    //         this.mainService.uploadApi(apiURL, this.selectedFile.file).subscribe((res) => {

    //         },
    //             (err) => {

    //             })
    //     })
    //     console.log(file)
    //     reader.readAsDataURL(file)
    // }


    delete(categoryId: number) {
        if (confirm("Are you sure want to delete this category ?")) {
            const apiURL = `api/v1/category/delete`;
            this.mainService.deleteCategoryApi(apiURL, categoryId).subscribe((res: any) => {
                console.log('RESPONSE', res)
                this.getCategoriesList();
            })
        }
    }


    uploadIcon(e: any) {
        if (e.target.files.length <= 0) return false;
        this.icon = e.target.files[0];
        this.categoryId = e.target.id;
        let formData = new FormData();
        formData.append('datafile', this.icon);
        formData.append('id', this.categoryId);
        const apiURL = 'api/v1/category/uploadicon';
        // this.mainService.showSpinner();
        this.mainService.uploadApi(apiURL, formData).subscribe((res: any) => {
            // this.mainService.hideSpinner();
            this.getCategoriesList();
        })

    }
}