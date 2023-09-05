import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { backEndError } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {
  greeting: string = 'Recuperemos tu clave';
  recoveryError: backEndError[] = [{ msg: '' }];
  recoveryForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  })

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {}

  setPassword() {}

  get email() {
    return this.recoveryForm.controls.email;
  }

}
