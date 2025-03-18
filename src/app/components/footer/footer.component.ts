import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [RouterLink, FormsModule]
})
export class FooterComponent {

    getYear() {
        return new Date().getFullYear();
    }
}
