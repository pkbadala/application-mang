import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../common/commonComponent';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// environment
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  public applicationList: any;

  constructor(public injector: Injector, private formBuilder: FormBuilder, private toaster: ToastrService) { 
    super(injector);
  }

  ngOnInit() {
    this.commonService.callApi('getAllApplication', {}, 'get', false).then(response => {
      if(response.status === 1) {
        this.applicationList = response.data;
      }
    });
  }

  deleteApplication(applicationId) {
    this.commonService.callApi('deleteApplication/' + applicationId, {}, 'get', false).then(response => {
      if(response.status === 1) {
        this.toaster.success(response.message, 'Application');
      } else {
        this.toaster.error(response.message, 'Application');
      }
    });
  }

  logoutAdmin() {
    this.removeToken('authToken');
    this.router.navigate(['']);
  }
}
