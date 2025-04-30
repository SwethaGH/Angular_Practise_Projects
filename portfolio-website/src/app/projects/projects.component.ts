import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio built with Angular, featuring a feminine design.',
      image: '/project1.jpg',
      link: 'https://github.com/SwethaGH'
    },
    {
      title: 'Task Manager',
      description: 'A responsive task management app.',
      image: '/project2.jpg', 
    },
    {
      title: 'E-Commerce UI',
      description: 'Big Basket e-commerce admin interface with products and category listings.',
      image: '/project3.jpg', 
      link: 'https://github.com/SwethaGH'
    }
  ];
}