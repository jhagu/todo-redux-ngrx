import { Component, OnInit } from '@angular/core';
import * as FilterActions from '../../filter/filter.actions';
import { DeleteCompletedTodosAction } from '../../todo/todo.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  allowedFilters: FilterActions.AllowedFilters [] = ['All', 'Active', 'Completed'];
  selectedFilter: FilterActions.AllowedFilters;
  pendingTodos: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.selectedFilter = state.filter;
      this.countPendingTasks(state.todos);
    });
  }

  changeFilter( filter: FilterActions.AllowedFilters) {
    const action = new FilterActions.SetFilterAction(filter);
    this.store.dispatch(action);
  }

  countPendingTasks(todos: Todo[]) {
    this.pendingTodos = todos.filter( todo => !todo.completed).length;
  }

  clearCompleted() {
    const action = new DeleteCompletedTodosAction();
    this.store.dispatch(action);
  }

}
