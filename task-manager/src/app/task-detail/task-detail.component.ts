import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div *ngIf="task">
      <h2>{{task.title}}</h2>
      <p>{{task.description}}</p>
      <label>
        <input type="checkbox" [(ngModel)]="task.completed"> Completed
      </label>
      <select [(ngModel)]="task.category" name="category">
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      <select [(ngModel)]="task.priority" name="priority">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button (click)="save()">Save</button>
    </div>
  `
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTask(id);
  }

  save() {
    if (this.task) {
      this.taskService.updateTask(this.task);
    }
  }
}