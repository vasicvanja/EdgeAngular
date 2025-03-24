import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { StripeService } from './app/services/stripe.service';
import { ThemeService } from './app/services/theme.service';
import { EmailService } from './app/services/email.service';
import { ContactMessagesService } from './app/services/contact-messages.service';
import { SmtpSettingsService } from './app/services/smtp-settings.service';
import { CartService } from './app/services/cart.service';
import { AuthService } from './app/services/auth.service';
import { CyclesService } from './app/services/cycles.service';
import { ArtworksService } from './app/services/artworks.service';
import { UsersService } from './app/services/users.service';
import { RolesService } from './app/services/roles.service';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, ToastrModule.forRoot({
            timeOut: 2500,
            preventDuplicates: true,
            positionClass: "toast-top-center",
            tapToDismiss: true
        })),
        ArtworksService,
        CyclesService,
        AuthService,
        CartService,
        SmtpSettingsService,
        ContactMessagesService,
        EmailService,
        ThemeService,
        StripeService,
        UsersService,
        RolesService,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
}).catch(err => console.error(err));
