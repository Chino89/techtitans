import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VerifyUserService } from 'src/app/core/services/auth/verify-user.service';
import { BackEndError } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css'],
})
export class VerifyUserComponent implements OnInit {
  token: string = '';
  greeting: string = 'Bienvenido a nuestro portal';
  verifyError: BackEndError[] = [];
  constructor(
    private route: ActivatedRoute,
    private verifyUserService: VerifyUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') as string;
    this.verifyUserService.verifyUser(this.token as string).subscribe({
      error: (errorData) => {
        if (errorData.error.mensaje) {
          this.verifyError = [{ mensaje: errorData.error.mensaje }];
        }
      },
      complete: () => {
        console.info('Usuario verificado');
        setTimeout(() => {
          this.router.navigateByUrl('/iniciar-sesion');
        }, 5000);
      },
    });
  }
}
