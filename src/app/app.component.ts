import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private fb: FormBuilder) {}
  isSubmitted:boolean=false
  title = 'test'

  private signUpForm = this.fb.group({
    email: ['', [Validators.required, customEmailValidator]],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required]]
  }, { validator: [customPasswordValidator]})

  submit(){
    console.log(this.signUpFrm);
    this.isSubmitted = true
  }

  
  public get signUpFrm() : FormGroup {
    return this.signUpForm
  }
  
  public get signUpFormControl()  {
    return this.signUpForm.controls 
  }
  
}

export function customEmailValidator(emailFormControl: AbstractControl){
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailFormControl.value) return null;
  if (emailRegex.test(emailFormControl.value)){
    return null;
  }
  return {
    inValidEmail: true,
  }
}

export function customPasswordValidator(group: any){
  let password = group.get('password').value;
  let confirmPassword = group.get('confirmPassword').value;
  if (password ) {
    if (confirmPassword) {
      if (password == confirmPassword) return null;
      return {
        isSame: true
      }
    }else{
      return null
    }
  }
  return null
}