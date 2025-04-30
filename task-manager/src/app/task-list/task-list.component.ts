import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-list" *ngIf="filteredTasks.length === 0">
      <p>No tasks found</p>
      <p *ngIf="filter !== 'All'">Try changing your filter or add a new {{ filter.toLowerCase().replace(' priority', '') }} task</p>
    </div>
    <ul class="task-list" *ngIf="filteredTasks.length > 0">
      <li *ngFor="let task of filteredTasks">
        <input type="checkbox" [(ngModel)]="task.completed" (ngModelChange)="updateTask(task)">
        <span [class.completed]="task.completed">{{ task.title }}</span>
        <span class="due-date" *ngIf="task.dueDate">  {{ task.dueDate | date:'MMM d' }}</span>
        <!-- <span class="category">{{ task.category }}</span> -->
        <button class="delete-btn" (click)="deleteTask(task.id)">🗑️</button>
      </li>
    </ul>
  `
})
export class TaskListComponent implements OnInit, OnChanges {
  @Input() filter: string = 'All';
  filteredTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.updateFilteredTasks();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter']) {
      this.updateFilteredTasks();
    }
  }

  updateFilteredTasks() {
    this.filteredTasks = this.taskService.filterTasks(this.filter);
    // console.log(`Filtered tasks for ${this.filter}:`, this.filteredTasks); // Debugging
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.updateFilteredTasks();
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task);
    this.updateFilteredTasks(); 
  }
}