import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  socialLinks = [
    { name: 'LinkedIn', url: 'https://github.com/SwethaGH', icon: 'fab fa-linkedin' },
    { name: 'GitHub', url: 'https://github.com/SwethaGH', icon: 'fab fa-github' },
    { name: 'Twitter', url: 'https://github.com/SwethaGH', icon: 'fab fa-twitter' }
  ];

  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  submitForm() {
    console.log('Form submitted:', this.contactForm);
    // Add backend integration later
    this.contactForm = { name: '', email: '', message: '' };
  }
}