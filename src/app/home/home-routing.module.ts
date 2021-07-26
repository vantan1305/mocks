import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterEvent } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { RouteGuardService } from '../services/route-guard.service';
import { AdminComponent } from '../shared/admin/admin.component';

export const Home_Module_routes: Routes = [
    { path: 'profile', component: ProfileComponent , canActivate: [RouteGuardService]}, //, canActivate: [RouteGuardService]
    { path: 'subjects', component: SubjectListComponent , canActivate: [RouteGuardService]},
    {path:'admin', component:AdminComponent,canActivate:[RouteGuardService]},
]

@NgModule({
    imports: [
        RouterModule.forChild(Home_Module_routes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule {

}
