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

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'artworks', component: ArtworksComponent },
    { path: 'artwork-details/:id', component: ArtworkDetailsComponent },
    { path: 'artwork-create', component: ArtworkCreateComponent },
    { path: 'artwork-update/:id', component: ArtworkUpdateComponent },
    { path: 'cycles', component: CyclesComponent },
    { path: 'cycle-details/:id', component: CyclesDetailsComponent },
    { path: 'cycle-create', component: CycleCreateComponent },
    { path: 'cycle-update/:id', component: CycleUpdateComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }