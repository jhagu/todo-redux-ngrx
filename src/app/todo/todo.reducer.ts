import * as TodoActions from './todo.actions';
import { Todo } from './models/todo.model';

// Todos precargados

const todo1 = new Todo('Save the fucking world');
const todo2 = new Todo('Go out for a drink');
const todo3 = new Todo('Travel');
todo2.completed = true;
const initialState: Todo[] = [todo1, todo2, todo3];

export function todoReducer(state = initialState, action: TodoActions.Actions): Todo[]{
  switch (action.type) {
    case TodoActions.ADD_TODO:
      const todo = new Todo(action.text);
      return [...state, todo];
    case TodoActions.TOGGLE_TODO:
      return state.map( pTodo => {
        if (pTodo.id === action.id) {
          return {
            ...pTodo,
            completed: !pTodo.completed,
          };
        } else {
          return pTodo;
        }
      });
    case TodoActions.TOGGLE_ALL_TODO:
      return state.map(pTodo => {
        return {
          ...pTodo,
          completed: action.completed
        };
      });
    case TodoActions.EDIT_TODO:
      return state.map(pTodo => {
        if (pTodo.id === action.id) {
          return {
            ...pTodo,
            text: action.text
          };
        } else {
          return pTodo;
        }
      });
    case TodoActions.DELETE_TODO:
      return state.filter(pTodo => pTodo.id !== action.id);
    case TodoActions.DELETE_ALL_COMPLETED:
      return state.filter(pTodo => !pTodo.completed);
    default:
      return state;
  }
};
