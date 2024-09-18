import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from "./menubar/menubar.component";
import { FooterComponent } from "./footer/footer.component";
import { AuthService } from './services/auth.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarComponent, FooterComponent,SpinnerComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLogin: boolean = false;
  loading: boolean = true;

  constructor(private _AuthService: AuthService) { }

  ngOnInit(): void {
    this._AuthService.currentUser.subscribe({
      next: () => {
        if (this._AuthService.currentUser.getValue() !== null) { this.isLogin = true; }
        else { this.isLogin = false; }
      
      }
    })}
  }
