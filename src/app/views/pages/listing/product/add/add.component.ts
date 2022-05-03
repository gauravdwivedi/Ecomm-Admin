import { Attribute, Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainService } from "src/app/provider/main.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AddAttribute } from "../add-attribute/add-attribute.component";





@Component({
    selector: 'app-product-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})



export class ProductAddComponent implements OnInit {


    isSubmitting = false;
    id: any = '';
    categoriesList: any = '';
    images: string[] = [];
    attributes: {}[];
    isAttributeAdding = false;

    productForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        categorySelected: new FormControl('', Validators.required),
        video_url: new FormControl('', Validators.required),
        rating: new FormControl('', Validators.required),
        slug: new FormControl('', Validators.required),
        name: new FormControl('', [Validators.required]),
        file: new FormControl('', [Validators.required]),
        fileSource: new FormControl('', [Validators.required])
    })

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public mainService: MainService
    ) { }


    ngOnInit(): void {
        this.getCatList()
    }

    get f() {
        return this.productForm.controls;
    }

    onFileChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            let noOfFiles = event.target.files.length;
            for (let i = 0; i < noOfFiles; i++) {
                let reader = new FileReader();

                reader.onload = (event: any) => {
                    console.log(event.target.result);
                    this.images.push(event.target.result);
                    this.productForm.patchValue({
                        fileSouce: this.images
                    });
                }
                reader.readAsDataURL(event.target.files[i])
            }
        }
    }


    getCatList() {
        const apiURL = `api/v1/category/list`;
        // this.mainService.showSpinner();
        this.mainService.getApi(apiURL).subscribe((res: any) => {
            console.log('RESSS', res.result)
            this.categoriesList = res && res.result.length > 0 ? res.result : [];
            console.log(this.categoriesList)
            // this.mainService.hideSpinner();
        })
    }

    dummyComponent: any;
    assignComponent(e: any) {
        e.stopPropagation();
        this.isAttributeAdding = !this.isAttributeAdding
        if (this.isAttributeAdding) {
            this.dummyComponent = AddAttribute
        }

        if (!this.isAttributeAdding) {
            this.dummyComponent = ''
        }
    }

    submitForm(e: any) {
        // e.preventDefault()

        this.isSubmitting = true;
        const formValues = this.productForm.value

        let params: any = {
            images: this.images,
            title: formValues.title,
            description: formValues.description,
            category: formValues.categorySelected,
            video_url: formValues.video_url,
            slug: formValues.slug,
        }

        console.log(params)

    }


}