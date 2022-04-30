import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainService } from "src/app/provider/main.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-category-edit',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})


export class CategoryAddComponent implements OnInit {
    isSubmiting = false;
    id: any = '';
    detail: any = '';
    icon: any = '';
    formData: any = '';
    error: any = '';

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

    }

    get f() {
        return this.categoryForm.controls;
    }


    convertToSlug(slug: string) {
        return slug.toLocaleLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-')
    }
    submitForm() {
        // e.preventDefault()
        this.isSubmiting = true;
        const formValues = this.categoryForm.value;

        const apiURL = `api/v1/category/add`;

        let params: any = {
            title: formValues.title,
            icon: 'https://img.icons8.com/fluency/48/000000/test-account.png',
            slug: this.convertToSlug(formValues.title)
        }

        console.log(params)

        this.mainService.postApi(apiURL, params).subscribe((res: any) => {
            console.log(res)
            if (res[0] && res[1]) {
                this.router.navigate(['categories']);
            }
        })

    }

}