// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-home',
//   imports: [CommonModule, RouterLink],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {

// }
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  subtitle = 'Crafting Beautiful Code & User-Friendly Apps';
  typedSubtitle = '';

  ngOnInit() {
    this.typeSubtitle();
  }

  typeSubtitle(index = 0) {
    if (index < this.subtitle.length) {
      this.typedSubtitle += this.subtitle[index];
      setTimeout(() => this.typeSubtitle(index + 1), 100);
    }
  }

  ngAfterViewInit() {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        entries => entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }),
        { threshold: 0.2 }
      );
      document.querySelectorAll('.hero').forEach(section => observer.observe(section));
    } else {
      // console.warn('IntersectionObserver is not supported in this browser.');
    }
  }
}