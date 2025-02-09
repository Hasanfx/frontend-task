// types/task.ts
export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string; // You can use Date or string depending on the format
  }
  