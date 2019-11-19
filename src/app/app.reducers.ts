import { Todo } from './todo/models/todo.model';
import { ActionReducerMap } from '@ngrx/store';

import * as TodoReducer from './todo/todo.reducer';
import * as FilterReducer from './filter/filter.reducer';
import * as FilterActions from './filter/filter.actions';

export interface AppState {
  todos: Todo[];
  filter: FilterActions.AllowedFilters;
}

export const appReducers: ActionReducerMap<AppState> = {
  todos: TodoReducer.todoReducer,
  filter: FilterReducer.filterReducer
};
