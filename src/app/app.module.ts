import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { ArtworksService } from "./services/artworks.service";
import { CyclesService } from "./services/cycles.service";
import { EncodeService } from "./services/encode.service";
import { ArtworksComponent } from "./components/artworks/artworks.component";
import { CyclesComponent } from "./components/cycles/cycles.component";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from '@angular/common/http';
import { ArtworkDetailsComponent } from "./components/artwork-details/artwork-details.component";
import { CyclesDetailsComponent } from "./components/cycles-details/cycles-details.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthService } from "./services/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LogoutComponent } from "./components/logout/logout.component";
import { HomeComponent } from "./components/home/home.component";
import { ArtworkCreateComponent } from "./components/artwork-create/artwork-create.component";
import { CycleCreateComponent } from "./components/cycle-create/cycle-create.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ArtworksComponent,
        ArtworkDetailsComponent,
        ArtworkCreateComponent,
        CyclesComponent,
        CyclesDetailsComponent,
        CycleCreateComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            timeOut: 2500,
            preventDuplicates: true,
            positionClass: "toast-top-center",
            tapToDismiss: true
        }),
    ],
    providers: [
        EncodeService,
        ArtworksService,
        CyclesService,
        AuthService
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }