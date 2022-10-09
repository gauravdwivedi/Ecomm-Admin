import { Component,OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MainService } from "src/app/provider/main.service";
import { FormGroup,FormControl, Validators } from "@angular/forms";
import { ActivatedRoute,Router } from "@angular/router";
import { environment } from "src/environments/environment";


@Component({
    selector:'app-add-banner',
    templateUrl:'./add.component.html',
    styleUrls:['./add.component.scss']
})

export class AddBanner implements OnInit{
    isSubmitting=false;

    images:string[]=[];

    apiUrl= environment.apiURL;

    bannerForm = new FormGroup({
        title:new FormControl('',Validators.required),
        description:new FormControl('',Validators.required),
        slug:new FormControl('',Validators.required),
        file:new FormControl('',Validators.required),
        fileSource:new FormControl('',Validators.required),
    })


    constructor(public mainService:MainService){}

    ngOnInit(): void { }


    get f(){
        return this.bannerForm.controls;
    }

    uploadFile(e:any){
        if(e.target.files && e.target.files[0]){
            let noOfFiles = e.target.files.length;
            console.log('No OF files', noOfFiles);

            let formData = new FormData();
            for(let i=0; i<noOfFiles;i++){
                formData.append('datafiles',e.target.files[i])
            }

            const apiURL = 'api/v1/upload/files';

            this.mainService.uploadApi(apiURL,formData).subscribe((res:any) =>{
                console.log(res);
                this.images=res.result;
            })
        }
    }

    submitForm(){
        this.isSubmitting=true;
        const formValues = this.bannerForm.value;

        console.log('formvalues',formValues,'images url',this.images)

        const apiURL = `api/v1/banners/add`;

        let params:any={
            url:this.images[0],
            title:formValues.title,
            description:formValues.description,
            slug:formValues.slug,
            
        }

        this.mainService.postApi(apiURL,params).subscribe((res)=>{
            console.log('Response',res.result)
        })
    }

}