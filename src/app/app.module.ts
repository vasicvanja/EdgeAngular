import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

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

@NgModule({
    declarations: [
        AppComponent,
        ArtworksComponent,
        CyclesComponent,
        ArtworkDetailsComponent,
        CyclesDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
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
        CyclesService
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }