import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private isDarkTheme: boolean = false;

    constructor() { 
        this.isDarkTheme = localStorage.getItem('theme') === 'dark' ? true : false;
        this.updateTheme();
    }

    public toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.updateTheme();
    }

    private updateTheme() {
        const theme = this.isDarkTheme ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    }

    public isDark(): boolean {
        return this.isDarkTheme;
    }
}
