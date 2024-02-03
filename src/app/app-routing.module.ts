import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArtworksComponent } from "./components/artworks/artworks.component";
import { CyclesComponent } from "./components/cycles/cycles.component";

const routes: Routes = [
    { path: 'artworks', component: ArtworksComponent },
    { path: 'cycles', component: CyclesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }