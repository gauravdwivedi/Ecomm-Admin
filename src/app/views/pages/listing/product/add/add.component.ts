import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainService } from "src/app/provider/main.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AddAttribute } from "../add-attribute/add-attribute.component";
import { InteractionService } from "../../../../../interaction.service";
import { environment } from "src/environments/environment";
@Component({
    selector: 'app-product-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})



export class ProductAddComponent implements OnInit {

    isSubmitting = false;
    id: any = '';
    categoriesList: any = '';
    categoryId: any = '';
    categoryTitle: string = '';
    images: string[] = [];
    backendImagesPath: string[] = [];
    attributes: any = [];
    isAttributeAdding = false;
    apiUrl = environment.apiURL;
    videos: string[] = [];
    thumbnail: any = '';
    // categorySelected: any = '';


    addItems(newItem: any) {
        this.attributes.push(newItem);
    }

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
        private _interactionService: InteractionService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal,
        public mainService: MainService
    ) { }


    ngOnInit(): void {


        this._interactionService.dataTransfer$.subscribe(data => {
            console.log(data)
            this.attributes.push({ size: data.size, color: data.color, price: data.price })

            this.isAttributeAdding = false;
        })
        this.getCatList()
    }

    get f() {
        return this.productForm.controls;
    }

    // onFileChange(event: any) {
    //     if (event.target.files && event.target.files[0]) {
    //         let noOfFiles = event.target.files.length;
    //         for (let i = 0; i < noOfFiles; i++) {
    //             let reader = new FileReader();

    //             reader.onload = (event: any) => {
    //                 console.log(event.target.result);
    //                 this.images.push(event.target.result);
    //                 this.productForm.patchValue({
    //                     fileSouce: this.images
    //                 });
    //             }



    //             reader.readAsDataURL(event.target.files[i])
    //         }
    //     }
    // }

    uploadFile(e: any) {
        console.log(e.target.files)
        if (e.target.files && e.target.files[0]) {
            let noOfFiles = e.target.files.length;
            console.log('No of FIles', noOfFiles)
            let formData = new FormData();
            for (let i = 0; i < noOfFiles; i++) {
                formData.append('datafiles', e.target.files[i])
            }
            // formData.append('datafiles', e.target.files[0])
            const apiURL = 'api/v1/upload/files';
            this.mainService.uploadApi(apiURL, formData).subscribe((res: any) => {
                console.log(res)
                this.images = res.result
            })

            // for (let i = 0; i < noOfFiles; i++) {
            //     let reader = new FileReader();
            //     reader.onload = (event: any) => {
            //         console.log(event.target.result);
            //         this.images.push(event.target.result);
            //         this.productForm.patchValue({
            //             fileSouce: this.images
            //         });
            //     }


            // }
        }

    }

    async uploadVideo(e: any) {
        if (e.target.files && e.target.files[0]) {
            let noOfFiles = e.target.files.length;
            console.log('No of FIles', noOfFiles)
            let formData = new FormData();
            for (let i = 0; i < noOfFiles; i++) {
                formData.append('datafiles', e.target.files[i])
            }

            // this.thumbnail = await this.generateVideoThumbail(e.target.files[0])

            const apiURL = 'api/v1/upload/files';
            this.mainService.uploadApi(apiURL, formData).subscribe((res: any) => {
                console.log(res)
                this.images = res.result
            })
        }
    }

    // generateVideoThumbail(file: File) {
    //     return new Promise((resolve) => {
    //         const canvas = document.createElement("canvas");
    //         const video = document.createElement("video");

    //         video.autoplay = true;
    //         video.muted = true;
    //         video.src = URL.createObjectURL(file);

    //         video.onloadeddata = () => {
    //             let ctx = canvas.getContext("2d");

    //             canvas.width = video.videoWidth;
    //             canvas.height = video.height;

    //             ctx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    //             video.pause();
    //             return resolve(canvas.toDataURL("image/png"));
    //         }
    //     })
    // }

    // capture() {
    //     const canvas = document.createElement("canvas");
    //     const video = document.createElement("video");

    //     canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
    // }


    getCatList() {
        const apiURL = `api/v1/category/list`;
        this.mainService.getApi(apiURL).subscribe((res: any) => {

            this.categoriesList = res && res.result.length > 0 ? res.result : [];

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

    catSelected(e: Event, id: number, title: string) {
        e.preventDefault()

        this.categoryId = id
        this.categoryTitle = title
    }

    submitForm(e: any) {
        // e.preventDefault()

        this.isSubmitting = true;
        const formValues = this.productForm.value;
        console.log(formValues)
        let params: any = {
            images: this.images,
            title: formValues.title,
            description: formValues.description,
            category: this.categoryId,
            video_url: formValues.video_url,
            slug: formValues.slug,
            attributes: this.attributes,
            rating: formValues.rating
        }

        console.log('ADD product body', params)

        const apiURL = `api/v1/product/add`
        this.mainService.postApi(apiURL, params).subscribe((res) => {
            console.log('RESPONSE', res)
            if (res?.result) {
                this.router.navigate(['product'])
            }
        })
    }


}