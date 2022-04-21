import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";



@Injectable({
    providedIn: 'root'
})

export class MainService {
    baseURL = environment.apiURL;
    public loginData = new Subject();
    public loginStatus = new Subject();


    constructor(public httpClient: HttpClient, private router: Router) {

    }

    private _refreshNeeded = new Subject<void>();

    get refreshNeeded() {
        return this._refreshNeeded;
    }

    //Get Api 

    getApi(endPointURL: any): Observable<any> {
        let headers: any = {
            'Content-Type': 'application/json'
        }

        if (localStorage.getItem('hoppedin-token')) {
            headers = {
                ...headers,
                token: localStorage.getItem('hoppedin-token')
            }
        }

        const httpHeaders = {
            headers: new HttpHeaders(headers)
        }

        return this.httpClient.get(this.baseURL + endPointURL, httpHeaders)

    }


    // ---------------- post Api Function ------------------- //
    postApi(endPointURL: any, data: any): Observable<any> {
        let headers: any = {
            'Content-Type': 'application/json',
            'site-id': environment.siteId
        }
        if (localStorage.getItem('hoppedin-token')) {
            headers = {
                ...headers,
                token: localStorage.getItem('hoppedin-token')
            }
        }
        const httpHeaders = {
            headers: new HttpHeaders(headers)
        }
        return this.httpClient.post(this.baseURL + endPointURL, data, httpHeaders)
            .pipe(
                tap(() => {
                    this._refreshNeeded.next();
                })
            )
    }


    // // --------------- toastr service ----------------- //
    // successToast(msg) {
    //     alert(msg);
    //     console.log('Success', msg);
    // }

    // errorToast(msg) {
    //     alert(msg);
    //     console.log('Error', msg);
    // }

    // warningToast(msg) {
    //     alert(msg);
    //     console.log('Warning', msg);
    // }

    // infoToast(msg) {
    //     alert(msg);
    //     console.log('Info', msg);
    // }


    showSpinner() {
        document.getElementById('app-spinner')!.classList.remove('d-none');
        document.getElementById('main-wrapper')!.classList.add('has-spinner');
    }

    hideSpinner() {
        document.getElementById('app-spinner')!.classList.add('d-none');
        document.getElementById('main-wrapper')!.classList.remove('has-spinner');
    }



}