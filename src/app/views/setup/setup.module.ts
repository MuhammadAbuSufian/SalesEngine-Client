import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
import {CustomMatrialModule} from '../../custom-matrial.module';
import {StorageService} from '../../services/storage.service';
import {SetupService} from '../../services/setup.service';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CustomMatrialModule,

  ],
  providers: [SetupService],
  declarations: [ProfileComponent]
})
export class SetupModule {
  
}

