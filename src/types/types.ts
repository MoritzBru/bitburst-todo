export enum TodoType {
  Todo = 'TODO',
  Backlog = 'BACKLOG',
}

export type TodoItem = {
  id: string;
  date: number;
  text: string;
  isCompleted: boolean;
  type: TodoType;
};
