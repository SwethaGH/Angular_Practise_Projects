import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TaskService } from './task.service';
import { TaskListComponent } from './task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './task-form/task-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskListComponent, TaskFormComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedFilter: string = 'All';
  showForm: boolean = false;
  title: string = 'task manager';
  @ViewChild(TaskListComponent) taskListComponent!: TaskListComponent;

  constructor(public taskService: TaskService, private cdr: ChangeDetectorRef) {}

  get completionStats(): string {
    const totalTasks = this.taskService.getTasks().length;
    const completedTasks = this.taskService.getTasks().filter(task => task.completed).length;
    const percentage = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(0) : '0';
    return `You've completed ${completedTasks} of ${totalTasks} tasks (${percentage}%)`;
  }

  refreshTaskList() {
    if (this.taskListComponent) {
      this.taskListComponent.updateFilteredTasks();
      this.cdr.detectChanges(); 
    }
  }
}
