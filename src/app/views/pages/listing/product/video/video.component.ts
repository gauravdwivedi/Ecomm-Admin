import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/provider/main.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})


export class ProductVideoList implements OnInit {

    envApiUrl: any = environment.apiURL;
    id: any;
    isSubmitting: boolean = false
    slug: any;
    title: any;
    videoUrl: string[] = [];
    thumbnails: any;

    constructor(private mainService: MainService, private route: ActivatedRoute, private router: Router) { }


    videoForm = new FormGroup({
        url: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        thumbnail: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        slug: new FormControl('', Validators.required),
        file: new FormControl('', Validators.required)
    })


    ngOnInit(): void {
        this.slug = this.route.snapshot.queryParamMap.get('slug');
        this.getProductDetail(this.slug)
    }



    getProductDetail(slug: any) {
        const apiURL = `api/v1/product/detail?slug=${slug}`;
        this.mainService.getApi(apiURL).subscribe((res: any) => {
            console.log(res.result)
            if (res.status.message == 'success') {
                console.log('res', res)
                this.title = res.result.title
                this.id = res.result.id
            }
        })
    }


    public blobToFile = (theBlob: Blob, fileName: string): File => {
        var b: any = theBlob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;

        //Cast to a File() type
        return <File>theBlob;
    }

    async getThumbnailURL(blobUrl: any) {

        console.log(blobUrl)

        let file = this.blobToFile(blobUrl, 'temp');
        console.log('FILE TYPE', file)

        let formData = new FormData();
        formData.append('datafiles', file)

        const apiURL = `api/v1/upload/files`;

        this.mainService.uploadApi(apiURL, formData).subscribe((res) => {
            console.log('Thumbnail url', res)
            this.thumbnails = res.result
        })

        // try {
        //     let formData = new FormData();
        //     formData.append('datafiles', blobUrl)
        //     const apiURL = 'api/v1/upload/files';
        //     this.mainService.uploadApi(apiURL, formData).subscribe((res: any) => {
        //         console.log('VIDEO UPLOAD RES', res)

        //     })
        // } catch (err) {
        //     console.log('Error', err)
        // }
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

                    let blobUrl = URL.createObjectURL(coverBlob);
                    this.getThumbnailURL(coverBlob)


                    const reader = new FileReader();
                    reader.readAsDataURL(coverBlob);
                    reader.onload = _event => {

                        console.log(reader.result)
                        // this.thumbnails[i] = reader.result;
                    }
                }
                // this.thumbnail = await this.generateVideoThumbail(e.target.files[0])
                const apiURL = 'api/v1/upload/files';
                this.mainService.uploadApi(apiURL, formData).subscribe((res: any) => {
                    console.log('VIDEO UPLOAD RES', res)

                    this.videoUrl = res.result

                })
            }
        } catch (err) {
            console.log('Error!', err)
        }
    }


    uploadProductVideo() {
        console.log('Video URL', this.videoUrl)
        console.log('Thumbnails', this.thumbnails)
    }

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

    get f() {
        return this.videoForm.controls;
    }

    submitForm(e: any) {
        this.isSubmitting = true;
        const formValues = this.videoForm.value;
        console.log(this.thumbnails)
        let params: any = {
            productId: this.id,
            video: {
                url: this.videoUrl,
                name: formValues.name,
                thumbnail: this.thumbnails || '',
                description: formValues.description,
                slug: formValues.slug
            }
        }
        console.log(params)

        const apiURL = `api/v1/product/addProductVideo`

        this.mainService.uploadApi(apiURL, params).subscribe((res) => {
            console.log(res)
            if (res.result) {
                this.router.navigateByUrl('product')
            }
        })

    }

}


