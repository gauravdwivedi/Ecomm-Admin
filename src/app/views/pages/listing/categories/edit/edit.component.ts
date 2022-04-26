import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainService } from "src/app/provider/main.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
    selector: 'app-category-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})


export class CategoryEditComponent implements OnInit {
    isSubmiting = false;
    id: any = '';
    detail: any = {};
    categoryId: any;
    icon: any
    error: string;




    categoryForm = new FormGroup({

        title: new FormControl('', Validators.required),
        icon: new FormControl('', Validators.required),
        status: new FormControl('', Validators.required)


    })

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public mainService: MainService
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.queryParamMap.get('id');

    }

    getCategoryDetail() {
        const apiURL = `api/v1/category/detail`
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