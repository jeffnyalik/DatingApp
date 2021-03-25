import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuard } from './_guards/auth.guard';
import { PreventClassUnsavedChanges } from './_guards/prevent_unsaved_changes_guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolvers';
import { MemberListResolver } from './_resolvers/member-list-resolvers';
import { JwtInterceptor } from './errors/error.interceptor';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NavComponent } from './components/nav/nav.component';
import { AlertifyService } from './services/alertify/alertify.service';
import { AuthServiceService } from './services/auth/auth-service.service';
import { RegisterComponent } from './components/auth/register/register.component';
import { EditProfileComponent } from './components/members/edit-profile/edit-profile.component';
import { MemberCardComponent } from './components/members/member-card/member-card.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    // BsDatepickerModule.forRoot(),

    // PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AlertifyService,
    AuthGuard,
    MemberDetailResolver,
    MemberListResolver,
    PreventClassUnsavedChanges,
    AuthServiceService, {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
