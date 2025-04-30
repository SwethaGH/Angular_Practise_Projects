import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  skills = [
    // { name: 'HTML', description: 'Designing beautiful, responsive layouts.' },
    { name: 'HTML, CSS', description: 'Designing beautiful, responsive layouts.' },
    { name: 'JavaScript', description: 'Crafting interactive user experiences.' },
    { name: 'TypeScript', description: 'Writing robust, type-safe code.' },
    { name: 'Angular', description: 'Building dynamic, scalable web apps.' },
  ];

  timeline = [
    { year: '2020', description: 'Graduated with a degree in Computer Science.' },
    { year: '2021', description: 'Started working as a Software developer in Pivot Financial Technologies' },
    { year: '2022', description: 'Built a Sample web app using HTML,JS,CSS' },
    { year: '2025', description: 'Built my first Angular portfolio project.' },
  ];
}