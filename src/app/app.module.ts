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
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ArtworkUpdateComponent } from "./components/artwork-update/artwork-update.component";
import { CycleUpdateComponent } from "./components/cycle-update/cycle-update.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AboutComponent } from "./components/about/about.component";
import { CartComponent } from "./components/cart/cart.component";
import { CartService } from "./services/cart.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ArtworksComponent,
        ArtworkDetailsComponent,
        ArtworkCreateComponent,
        ArtworkUpdateComponent,
        CyclesComponent,
        CyclesDetailsComponent,
        CycleCreateComponent,
        CycleUpdateComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
        NavMenuComponent,
        FooterComponent,
        ContactComponent,
        AboutComponent,
        CartComponent
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
        AuthService,
        CartService
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }