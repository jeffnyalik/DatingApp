import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { PreventClassUnsavedChanges } from './_guards/prevent_unsaved_changes_guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolvers';
import { MemberListResolver } from './_resolvers/member-list-resolvers';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditProfileComponent } from './components/members/edit-profile/edit-profile.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {   
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
      {path: 'member/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
      {path: 'member-edit', component: EditProfileComponent, canDeactivate: [PreventClassUnsavedChanges]},
      // {path: 'messages', component: MessagesComponent},
      {path: 'photos', component: GalleryComponent},
    ]
  },
  {path: 'not-found', component: NotFoundComponent},

  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
