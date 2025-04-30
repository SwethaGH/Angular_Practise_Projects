export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    category: 'Personal' | 'Work' | 'Shopping' | 'Other';
    priority: 'High' | 'Medium' | 'Low';
    dueDate?: string;
  }