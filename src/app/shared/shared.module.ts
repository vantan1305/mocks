import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { VerifyLinkModalComponent } from './verify-link-modal/verify-link-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { NgSpinnerModule } from 'ng-bootstrap-spinner';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ManagerComponent } from './manager/manager.component';
import { PmComponent } from './pm/pm.component';
import { MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    MenuComponent,
    PopupModalComponent,
    VerifyLinkModalComponent,
    LoaderComponent,
    AdminComponent,
    UserComponent,
    ManagerComponent,
    PmComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
  ],
  exports: [
    MenuComponent,
    PopupModalComponent,
    VerifyLinkModalComponent,
    LoaderComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatListModule
  ],
})
export class SharedModule { }
