import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { AuthInterceptor } from '../auth.interceptor';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule

  
  ]
})
export class AuthModule { 
  static forRoot():ModuleWithProviders<any> {
    return {
      ngModule:AuthModule,
      providers:[
        AuthInterceptor
      ]
    }
  }
}
