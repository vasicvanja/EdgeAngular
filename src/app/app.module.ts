import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { ArtworksService } from "./services/artworks.service";
import { CyclesService } from "./services/cycles.service";
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
import { SmtpSettingsComponent } from "./components/smtp-settings/smtp-settings.component";
import { SmtpSettingsService } from "./services/smtp-settings.service";
import { ContactMessagesService } from "./services/contact-messages.service";
import { ContactMessagesComponent } from "./components/contact-messages/contact-messages.component";
import { ModalComponent } from "./components/modal/modal.component";
import { EmailService } from "./services/email.service";
import { ReplyModalComponent } from "./components/reply-modal/reply-modal.component";
import { ThemeService } from "./services/theme.service";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { SuccessfulPaymentComponent } from "./components/successful-payment/successful-payment.component";
import { UnsuccessfulPaymentComponent } from "./components/unsuccessful-payment/unsuccessful-payment.component";

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
        CartComponent,
        SmtpSettingsComponent,
        ContactMessagesComponent,
        ModalComponent,
        ReplyModalComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        SuccessfulPaymentComponent,
        UnsuccessfulPaymentComponent
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
        ArtworksService,
        CyclesService,
        AuthService,
        CartService,
        SmtpSettingsService,
        ContactMessagesService,
        EmailService,
        ThemeService
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }