import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

//declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    //this.renderButton();
  }
  handleCredentialResponse(response: any) {
    console.info('entry');
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    console.info('Token JWT', response.credential);
    return response;
    // const responsePayload = decodeJwtResponse(response.credential);
    // console.log("ID: " + responsePayload.sub);
    // console.log('Full Name: ' + responsePayload.name);
    // console.log('Given Name: ' + responsePayload.given_name);
    // console.log('Family Name: ' + responsePayload.family_name);
    // console.log("Image URL: " + responsePayload.picture);
    // console.log("Email: " + responsePayload.email);
  }
  login() {
    console.log(this.loginForm.value);
    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp) => {
        console.log(resp);
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');
      },
      (err) => {
        // si sucede un error
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  // onSuccess(googleUser: any) {
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log(id_token);
  // }
  // onFailure(error: any) {
  //   console.log('error');
  //   console.log(error);
  // }
  // renderButton() {
  //   gapi.signin2.render('my-signin2', {
  //     scope: 'profile email',
  //     width: 240,
  //     height: 50,
  //     longtitle: true,
  //     theme: 'dark',
  //     onsuccess: this.onSuccess,
  //     onfailure: this.onFailure,
  //   });
  //   this.startApp();
  // }

  // startApp() {
  //   return new Promise((resolve) => {
  //     gapi.load('auth2', () => {
  //       this.auth2 = gapi.auth2.init({
  //         client_id:
  //           '703833158408-cls9llf4ehpo8gl141mi7glcg9dfs18u.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //         // scope: 'profile email',
  //         // ux_mode: 'redirect',
  //       });

  //       resolve(this.attachSignin(document.getElementById('my-signin2')));
  //     });
  //   });
  // }
  // attachSignin(element: any) {
  //   this.auth2.attachClickHandler(
  //     element,
  //     {},
  //     (googleUser: any) => {
  //       const id_token = googleUser.getAuthResponse().id_token;
  //       console.log(id_token);
  //       //LLAMAR AL SERVICIO DE MI API LOGIN GOOGLE
  //       this.usuarioService.loginGoogle(id_token).subscribe((resp) => {
  //         this.router.navigateByUrl('/');
  //       });

  //       //TODO : REDIRECT TO DASHBOARD
  //     },
  //     (error: any) => {
  //       alert(JSON.stringify(error, undefined, 2));
  //     }
  //   );
  // }
}
