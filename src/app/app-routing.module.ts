import { MemberListResolver } from './_resolvers/member-list-resolvers';
import { MemberDetailResolver } from './_resolvers/member-detail.resolvers';
import { User } from './_models/user/user';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_guards/auth.guard';
import { PreventClassUnsavedChanges } from './_guards/prevent_unsaved_changes_guard';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { MessagesComponent } from './components/messages/messages.component';
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
      {path: 'messages', component: MessagesComponent},
      {path: 'list', component: ListComponent},
    ]
  },

  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
