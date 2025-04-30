import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  addTask(task: Task) {
    const newId = this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    this.tasks.push({ ...task, id: newId });
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  filterTasks(filter: string): Task[] {
    if (filter === 'All') {
      return this.tasks;
    } else if (filter === 'High Priority') {
      return this.tasks.filter(task => task.priority === 'High');
    } else if (filter === 'Medium Priority') {
      return this.tasks.filter(task => task.priority === 'Medium');
    } else if (filter === 'Low Priority') {
      return this.tasks.filter(task => task.priority === 'Low');
    } else {
      return this.tasks.filter(task => task.category === filter);
    }
  }
}