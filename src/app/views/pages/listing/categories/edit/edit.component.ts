import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainService } from "src/app/provider/main.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-category-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})


export class CategoryEditComponent implements OnInit {
    isSubmiting = false;
    detail: any = {};
    categoryId: any;
    icon: any
    error: string;
    envApiUrl: any = environment.apiURL




    categoryForm = new FormGroup({

        title: new FormControl('', Validators.required),
        icon: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required),
        slug: new FormControl('', Validators.required)


    })

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public mainService: MainService
    ) { }

    ngOnInit(): void {
        this.categoryId = this.route.snapshot.queryParamMap.get('id');
        this.getCategoryDetail()
    }

    getCategoryDetail() {
        const apiURL = `api/v1/category/detail`

        this.mainService.postApi(apiURL, { categoryId: this.categoryId }).subscribe((res: any) => {
            this.detail = res.result;
        })
    }

    get f() {
        return this.categoryForm.controls;
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
            // if (res && res.data) {
            //     this.router.navigate(['/categories/list']);
            // }
            // else this.error = 'There was some error importing the file. Please try again later.';

        })
    }

    save() {
        this.isSubmiting = true;
        const formValues = this.categoryForm.value;

        const apiURL = `api/v1/category/update`
        console.log('ICON', this.detail.icon)
        let params: any = {
            categoryId: parseInt(this.categoryId),
            title: formValues.title || this.detail.title,
            slug: formValues.slug || this.detail.slug,
            icon: this.detail.icon
        }
        console.log(params)

        this.mainService.updateUser(apiURL, params).subscribe((res: any) => {
            this.router.navigate(['categories'])
        })
    }

}