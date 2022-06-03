import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainService } from "src/app/provider/main.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AddAttribute } from "../add-attribute/add-attribute.component";
import { InteractionService } from "../../../../../interaction.service";
import { environment } from "src/environments/environment";

@Component({
    selector: 'edit-product',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})



export class EditProduct implements OnInit {

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
    isThumbnail: boolean = false;
    thumbnails: any[] = [];
    apiSlug: any = '';

    envApiUrl: any = environment.apiURL
    title: string;
    rating: number;
    slug: any;
    video_url: string;
    description: string;
    // id: any;
    imagesDisplay: any;
    // attributes: any;
    category: any;
    status: any;




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
        this.slug = this.route.snapshot.queryParamMap.get('slug');

        console.log(this.slug)

        this.mainService.refreshNeeded.subscribe(() => {
            this.getProductDetail(this.slug)
        })
        this.getProductDetail(this.slug)

        this._interactionService.dataTransfer$.subscribe(data => {
            console.log(data)
            this.attributes.push({ size: data.size, color: data.color, price: data.price, qty_in_stock: data.qty_in_stock })

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


    getProductDetail(slug: string) {
        const apiURL = `api/v1/product/detail?slug=${slug}`;
        this.mainService.getApi(apiURL).subscribe((res: any) => {
            console.log('Detail Response', res.result.images)
            if (res.status.message == 'success') {
                this.title = res.result.title;
                this.rating = res.result.rating;
                this.apiSlug = res.result.slug;
                this.video_url = res.result.videos;
                this.description = res.result.description;
                this.id = res.result.id;
                this.imagesDisplay = res.result.images;
                this.attributes = res.result.attributes;
                this.category = res.result.category;
                this.status = res.result.status;
            }
        })
    }

    uploadFile(e: any) {
        console.log(e.target.files)

        let images = new Array();
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
                console.log('IMAGES URL', res)
                for (let i = 0; i < res.result.length; i++) {
                    console.log(res.result[i])
                    images[i] = res.result[i]
                    // this.images.push(res.result[i])
                }
                this.uploadImagestodb(images)
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


    uploadImagestodb(images: any) {
        const apiUrl = `api/v1/product/addProductImages`;


        console.log('productID', this.id, 'images', images[0])



        const params = {
            productId: this.id,
            images: images
        }
        console.log('Calling API call addProductImages', params)
        this.mainService.postApi(apiUrl, params).subscribe((res) => {
            console.log('IMAGE ADD RES', res)
        })
    }

    async uploadVideo(e: any) {
        try {
            if (e.target.files && e.target.files[0]) {
                let noOfFiles = e.target.files.length;
                console.log('No of FIles', noOfFiles)
                let formData = new FormData();
                for (let i = 0; i < noOfFiles; i++) {
                    formData.append('datafiles', e.target.files[i])
                    const cover = await this.getVideoCover(e.target.files[i])
                    console.log(cover)

                    const coverBlob = cover as Blob;

                    // this.thumbnails[i] = cover;
                    this.isThumbnail = true
                    const reader = new FileReader();
                    reader.readAsDataURL(coverBlob);
                    reader.onload = _event => {
                        this.thumbnails[i] = reader.result;
                    }
                }
                // this.thumbnail = await this.generateVideoThumbail(e.target.files[0])
                const apiURL = 'api/v1/upload/files';
                this.mainService.uploadApi(apiURL, formData).subscribe((res: any) => {
                    console.log('VIDEO UPLOAD RES', res)
                    this.images = res.result
                })
            }
        } catch (err) {
            console.log('Error!', err)
            this.isThumbnail = false;
        }
    }

    updateVideoUrlDb(videoUrl: any, name: any, thumbnail: any, description: any, slug: any) {
        const apiUrl = `api/v1/product/addProductVideo`;

        const params = {
            productId: this.id,
            video: {
                url: videoUrl,
                name: name,
                thumbnail: thumbnail,
                description: description,
                slug: slug
            }
        }
        console.log('Calling API call addVideo', params)
        this.mainService.postApi(apiUrl, params).subscribe((res) => {
            console.log('Video ADD RES', res)
        })
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

    getVideoCover(file: File, seekTo = 0.0) {
        console.log("getting video cover for file: ", file);
        return new Promise((resolve, reject) => {
            // load the file to a video player
            const videoPlayer = document.createElement('video');
            videoPlayer.setAttribute('src', URL.createObjectURL(file));
            videoPlayer.load();
            videoPlayer.addEventListener('error', (ex) => {
                reject(ex);
            });
            // load metadata of the video to get video duration and dimensions
            videoPlayer.addEventListener('loadedmetadata', () => {
                // seek to user defined timestamp (in seconds) if possible
                if (videoPlayer.duration < seekTo) {
                    reject("video is too short.");
                    return;
                }
                // delay seeking or else 'seeked' event won't fire on Safari
                setTimeout(() => {
                    videoPlayer.currentTime = seekTo;
                }, 200);
                // extract video thumbnail once seeking is complete
                videoPlayer.addEventListener('seeked', () => {
                    console.log('video is now paused at %ss.', seekTo);
                    // define a canvas to have the same dimension as the video
                    const canvas = document.createElement("canvas");
                    canvas.width = videoPlayer.videoWidth;
                    canvas.height = videoPlayer.videoHeight;
                    // draw the video frame to canvas
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                    // return the canvas image as a blob
                    ctx?.canvas.toBlob(
                        (blob) => {
                            resolve(blob);
                        },
                        "image/jpeg",
                        0.75 /* quality */
                    );
                });
            });
        });
    }


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

    saveAttributes() {
        const apiURL = `api/v1/product/updateVariant`;


        // this.mainService.postApi(apiURL,).subscribe((res: any) => {
        //     console.log('Save Attributes', res)
        // }
        // )
    }

    submitForm(e: any) {
        // e.preventDefault()

        this.isSubmitting = true;
        const formValues = this.productForm.value;
        console.log(formValues)
        let params: any = {
            // images: this.images,
            productId: this.id,
            title: formValues.title || this.title,
            description: formValues.description || this.description,
            category: formValues.categorySelected || this.categoryId,
            video_url: formValues.video_url || this.video_url,
            slug: formValues.slug || this.slug,
            rating: formValues.rating || this.rating
        }

        console.log('ADD product body', params)

        const apiURL = `api/v1/product/updateProduct`
        this.mainService.postApi(apiURL, params).subscribe((res) => {
            console.log('RESPONSE', res)
            if (res?.result) {
                this.router.navigate(['product'])
            }
        })
    }


}