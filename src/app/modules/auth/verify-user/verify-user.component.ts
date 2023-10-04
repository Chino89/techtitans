import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VerifyUserService } from 'src/app/core/services/auth/verify-user.service';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css'],
})
export class VerifyUserComponent implements OnInit, OnDestroy {
  token: string = '';
  greeting: string = 'Bienvenido a nuestro portal';
  verifyError: BackEndError[] = [];
  subscriptions: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private verifyUserService: VerifyUserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') as string;
    const verifyUserServiceSubscription = this.verifyUserService
      .verifyUser(this.token as string)
      .subscribe({
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
    this.subscriptions.push(verifyUserServiceSubscription);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
