import { UserService } from './../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  register
  diseases: string[] = [
    'First',
    'Second',
    'Third'
  ];
  allergys: string[] = [
    'First',
    'Second',
    'Third'
  ]
  form: FormGroup;
  isSubmitted: boolean = false;
  result: any = null;
  constructor(
    private frmBuilder: FormBuilder, 
    private userService: UserService
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
      // username: '',
      password: '',
      email: ''
    }
  }

  // Register User
  registerUser() {
    this.userService.registerNewUser(this.register).subscribe(
        response => {
          console.log(`User ${this.register.email} has been created`)
          // console.log('Works...')
        },
        error => console.log('error', error)
    )
  }
  // get name() { return this.form.get('name'); }
  // get email() { return this.form.get('email'); }
  // get password() { return this.form.get('password'); }
  // get disease() { return this.form.get('disease'); }
  // get allergy() { return this.form.get('allergy'); }
  // get age() { return this.form.get('age'); }
  // get height() { return this.form.get('height'); }
  // get weight() { return this.form.get('weight'); }

  // save(){
  //   this.isSubmitted = true;
  //   if(!this.form.valid)
  //       return;
  //   // Code to save the data
  //   // userService.Save(this.register.value);
  //   this.result = this.form.value;
  // }
}
