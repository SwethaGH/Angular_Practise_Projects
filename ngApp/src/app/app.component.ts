import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  standalone: true,
  templateUrl: './app.component.html',
  template:`<app-video-center></app-video-center>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngApp';
}
