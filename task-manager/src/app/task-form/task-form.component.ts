import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="detailed-form">
      <form #taskForm="ngForm" (ngSubmit)="onSubmit(taskForm)" (clickOutside)="onCancel()">
        <div class="form-group">
          <div *ngIf="taskForm.submitted && !taskForm.controls['title']?.valid" class="error-alert">
            <span class="error-icon">!</span> Please fill out this field.
          </div>
          <input 
            #titleInput
            type="text" 
            [(ngModel)]="task.title" 
            name="title" 
            placeholder="Task title" 
            required
          >
        </div>

        <div class="form-row">
          <select [(ngModel)]="task.priority" name="priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select [(ngModel)]="task.category" name="category">
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-row">
          <input type="date" [(ngModel)]="task.dueDate" name="dueDate" placeholder="mm/dd/yyyy">
        </div>

        <div class="form-actions">
          <button type="button" (click)="onCancel()">Cancel</button>
          <button type="submit" class="add-button">Add Task</button>
        </div>
      </form>
    </div>
  `
})
export class TaskFormComponent {
  task: Task = { id: 0, title: '', description: '', completed: false, category: 'Personal', priority: 'Low', dueDate: undefined };
  @Output() formClosed = new EventEmitter<void>();
  @ViewChild('taskForm') taskForm!: NgForm;

  constructor(private taskService: TaskService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.taskService.addTask({ ...this.task });
      this.task = { id: 0, title: '', description: '', completed: false, category: 'Personal', priority: 'Low', dueDate: undefined };
      this.formClosed.emit();
    }
  }

  onCancel() {
    this.task = { id: 0, title: '', description: '', completed: false, category: 'Personal', priority: 'Low', dueDate: undefined };
    this.formClosed.emit();
  }
}