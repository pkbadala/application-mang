import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../common/commonComponent';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent extends BaseComponent implements OnInit {

  public showSignUp: boolean = true;
  public loginForm: FormGroup;
  public signUpForm: FormGroup;

  constructor(public injector: Injector, private formBuilder: FormBuilder, 
    private toaster: ToastrService) { 
    super(injector);

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  switchSignUpORSignIn() {
    this.showSignUp = !this.showSignUp;
  }
  
  // login process
  submittedLoginForm() {    
    let formValid = this.checkAllRequiredFieldValues(this.loginForm.value, 'Login');
    if(this.loginForm.valid && formValid) {
      this.commonService.callApi('login/', this.loginForm.value, 'post', true).then(response => {
        if(response.status === 1) {
          this.toaster.success(response.message, 'Login');
          this.setToken('authToken', response.data.accessToken);
          this.router.navigate(['/home']);
        } else {
          this.toaster.error(response.message, 'Login');
        }
      });
    }
  }

 // check all required data is fill or not
  checkAllRequiredFieldValues(data, title) {
    const keyArr = Object.keys(data);
    const valueArr = Object.values(data);

    for (let i = 0; i < keyArr.length; i++) {
      if (valueArr[i] === null || valueArr[i] === '' || valueArr[i] === false) {

        keyArr[i] = keyArr[i].replace(/([A-Z])/g, ' $1').trim().toLowerCase();
        keyArr[i] = keyArr[i].replace('required', '');
        this.toaster.error(keyArr[i] + ' field is required', title);
        return false;
      }
    }
    return true;
  }

  gotToApplicationForm() {
    this.router.navigate["/app-application"];
  }
}

