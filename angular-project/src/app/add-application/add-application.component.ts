import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../common/commonComponent';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// environment
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss']
})
export class AddApplicationComponent extends BaseComponent implements OnInit {

  // public applicationForm: FormGroup;
  public applicationForm: any = {
    name: null,
    email: null,
    address: null,
    gender: null,
    contact: null,
    preference: {
      location: null,
      expectedCTC: null,
      currentCTC: null,
      noticePeriod: null,
    }
  };
  public educationObj = [
    {
      board : "",
      year: 0,
      percentage : 0,
    }
  ];

  constructor(public injector: Injector, private formBuilder: FormBuilder, private toaster: ToastrService) { 
    super(injector);
  }

  ngOnInit() {
  }

  loginSubmit(form:NgForm) {
    
  }
  submittedApplicationForm(form:NgForm) {
    

    console.log("form value :::", form.value);

    let formValid = this.checkAllRequiredFieldValues(form.value, 'Application');
    if(formValid || form.valid) {
      this.commonService.callApi('saveApplication/', form.value, 'post', true).then(response => {
        if(response.status === 1) {
          this.toaster.success(response.message, 'Add Application');
          this.router.navigate(['']);
        } else {
          this.toaster.error(response.message, 'Add Application');
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
}
