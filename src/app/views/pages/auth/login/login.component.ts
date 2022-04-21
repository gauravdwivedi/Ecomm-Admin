import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/provider/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  email: string;
  password: string;
  isSubmitting: boolean = false;
  error: string

  constructor(private router: Router, private route: ActivatedRoute, public mainService: MainService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e: Event) {
    e.preventDefault();
    console.log('Logging IN');
    this.isSubmitting = true;

    if (this.isValid()) {
      console.log('Valid')
      const params = {
        email: this.email,
        password: this.password,
      }

      const apiURL = `api/v1/auth/user/verify`;
      this.mainService.showSpinner();
      this.mainService.postApi(apiURL, params).subscribe((res: any) => {
        this.mainService.hideSpinner();
        console.log('Res', res)
        if (res) {
          if (res.registration == false && res.user.role == 1) {
            localStorage.setItem('hoppedin-admin-token', res.token);
            if (localStorage.getItem('hoppedin-admin-token')) {
              this.router.navigate([this.returnUrl])
            }
          } else {
            this.error = 'Invalid Credentials'
          }

          if (res.registration == true || res.status == 400) {

            this.error = 'User doesn\'t exists'

          }
        }

      })
    }

    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin')) {
      this.router.navigate([this.returnUrl]);
    }
  }

  isValid() {
    return this.email && this.password
  }
}
