import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArtworksComponent } from "./components/artworks/artworks.component";
import { CyclesComponent } from "./components/cycles/cycles.component";
import { ArtworkDetailsComponent } from "./components/artwork-details/artwork-details.component";
import { CyclesDetailsComponent } from "./components/cycles-details/cycles-details.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ArtworkCreateComponent } from "./components/artwork-create/artwork-create.component";
import { CycleCreateComponent } from "./components/cycle-create/cycle-create.component";
import { ArtworkUpdateComponent } from "./components/artwork-update/artwork-update.component";
import { CycleUpdateComponent } from "./components/cycle-update/cycle-update.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CartComponent } from "./components/cart/cart.component";
import { SmtpSettingsComponent } from "./components/smtp-settings/smtp-settings.component";
import { ContactMessagesComponent } from "./components/contact-messages/contact-messages.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { SuccessfulPaymentComponent } from "./components/successful-payment/successful-payment.component";
import { UnsuccessfulPaymentComponent } from "./components/unsuccessful-payment/unsuccessful-payment.component";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { UsersComponent } from "./components/users/users.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'artworks', component: ArtworksComponent },
    { path: 'artwork-details/:id', component: ArtworkDetailsComponent },
    { path: 'artwork-create', component: ArtworkCreateComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'artwork-update/:id', component: ArtworkUpdateComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'cycles', component: CyclesComponent },
    { path: 'cycle-details/:id', component: CyclesDetailsComponent },
    { path: 'cycle-create', component: CycleCreateComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'cycle-update/:id', component: CycleUpdateComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: 'cart', component: CartComponent },
    { path: 'smtp-settings', component: SmtpSettingsComponent },
    { path: 'contact-messages', component: ContactMessagesComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'successful-payment', component: SuccessfulPaymentComponent },
    { path: 'unsuccessful-payment', component: UnsuccessfulPaymentComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }