import { GetCuisinesService } from './../../services/get-cuisines.service';
import { Cuisine } from './../../models/cuisine';
import { Allergie } from './../../models/allergie';
import { GetAllergiesService } from './../../services/get-allergies.service';
import { GetDiseasesService } from './../../services/get-diseases.service';
import { Observable } from 'rxjs/Observable';
import { Diseases } from './../../models/diseases';
import { UserService } from './../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService, GetDiseasesService, GetAllergiesService, GetCuisinesService]
})

export class SignupComponent implements OnInit {
  public diseases = [];
  public allergies = [];
  public cuisines = [];
  register;

  SignUpForm: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;

  constructor(
    private frmBuilder: FormBuilder, 
    private userService: UserService,
    private getDiseasesService: GetDiseasesService,
    private getAllergiesService: GetAllergiesService,
    private getCuisinesService: GetCuisinesService,
    private _titleService: Title,
    public flashMessagesService: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
    // Set title
    this._titleService.setTitle('Реєстрація');

    // Form Validation
    this.SignUpForm = this.frmBuilder.group({
      email:["", [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      first_name:["", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      last_name:["", [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      password:["", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      disease:["", [Validators.required]],
      allergy:["", [Validators.required]],
      cuisine:["", [Validators.required]],

    });

    // UserData
    this.register = {
      first_name:'',
      email: '',
      password: '',
      diseases: [],
      allergies: [],
      cuisines: []
    };

    // Get data from Service to select
    this.getDiseasesService.getDisases()
      .subscribe(data => this.diseases = data);
    // Get data from Service to select
    this.getAllergiesService.getAllergies()
      .subscribe(data => this.allergies = data);
    // Get data from Service to select
    this.getCuisinesService.getCuisines()
      .subscribe(data => this.cuisines = data);
  }

  // Register User on submit
  registerUser() {
    this.userService.registerNewUser(this.register).subscribe(
      // On Success
        response => {
            // Route to signin
            this.router.navigate(['/signin']);
            // Success Message
            this.flashMessagesService.show(`User ${this.register.email} has been created`, { cssClass: 'alert-success', timeout: 3000 });
        },
        // On Error
        error => {
          // console.log('error', error);
          // Check error and show message
          if (error.status === 400) {
            this.flashMessagesService.show(`User ${this.register.email} allready exists`, { cssClass: 'alert-danger', timeout: 3000 });
          } 
        }
    )
  }

  // Validation
  get first_name() { return this.SignUpForm.get('first_name'); }
  get last_name() { return this.SignUpForm.get('last_name'); }
  get email() { return this.SignUpForm.get('email'); }
  get password() { return this.SignUpForm.get('password'); }
  get disease() { return this.SignUpForm.get('disease'); }
  get allergy() { return this.SignUpForm.get('allergy'); }
  get cuisine() { return this.SignUpForm.get('cuisine'); }

  // Validate
  save(){
    this.isSubmitted = true;
    if(!this.SignUpForm.valid) {
      return;
    }
    this.result = this.SignUpForm.value;
  }
  
}
