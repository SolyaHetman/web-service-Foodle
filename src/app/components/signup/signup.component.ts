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

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService, GetDiseasesService, GetAllergiesService]
})
export class SignupComponent implements OnInit {
  public diseases = [];
  public allergies = [];
  register;

  form: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  constructor(
    private frmBuilder: FormBuilder, 
    private userService: UserService,
    private getDiseasesService: GetDiseasesService,
    private getAllergiesService: GetAllergiesService,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.form = this.frmBuilder.group({
      name:["", [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      email:["", [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      password:["", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      disease:["", [Validators.required]],
      allergy:["", [Validators.required]],
      age:["", [Validators.required, Validators.pattern(/^[0-9\s]*$/)]],
      height:["", [Validators.required, Validators.pattern(/^[0-9\s]*$/)]],
      weight:["", [Validators.required, Validators.pattern(/^[0-9\s]*$/)]],

    });
    this.register = {
      email: '',
      password: '',
      diseases: [],
      allergies: [],
      cuisines: []
    };
    this.getDiseasesService.getDisases()
      .subscribe(data => this.diseases = data);
    
    this.getAllergiesService.getAllergies()
      .subscribe(data => this.allergies = data);
  }

  // Register User
  registerUser() {
    this.userService.registerNewUser(this.register).subscribe(
        response => {
          console.log(`User ${this.register.email} has been created`);
          this.form.reset();
          this.flashMessagesService.show('New user Added', { cssClass: 'alert-success', timeout: 3000 });
        },
        error => console.log('error', error)
    )
  }
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get disease() { return this.form.get('disease'); }
  get allergy() { return this.form.get('allergy'); }
  get age() { return this.form.get('age'); }
  get height() { return this.form.get('height'); }
  get weight() { return this.form.get('weight'); }

  save(){
    this.isSubmitted = true;
    if(!this.form.valid) {
      return;
    }
    this.result = this.form.value;
  }
  
}
