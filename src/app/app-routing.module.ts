import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArtworksComponent } from "./components/artworks/artworks.component";
import { CyclesComponent } from "./components/cycles/cycles.component";
import { ArtworkDetailsComponent } from "./components/artwork-details/artwork-details.component";
import { CyclesDetailsComponent } from "./components/cycles-details/cycles-details.component";

const routes: Routes = [
    { path: 'artworks', component: ArtworksComponent },
    { path: 'cycles', component: CyclesComponent },
    { path: 'artwork-details/:id', component: ArtworkDetailsComponent },
    { path: 'cycle-details/:id', component: CyclesDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }