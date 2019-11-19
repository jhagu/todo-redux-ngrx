import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { ToggleTodoAction, EditTodoAction, DeleteTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  // Recibo los items de la lista que esta en el paddre (todo-list)

  @Input() todo: Todo;
  @ViewChild('inputText', null) inputText: ElementRef;

  checkBox: FormControl;
  textInput: FormControl;
  editing: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.checkBox = new FormControl(this.todo.completed);
    this.textInput = new FormControl(this.todo.text, Validators.required);

    this.checkBox.valueChanges.subscribe(() => {
      const action = new ToggleTodoAction(this.todo.id);
      this.store.dispatch(action);
    });
  }

  editTextItem() {
    this.editing = true;
    setTimeout(() => {
      this.inputText.nativeElement.select();
    }, 1);
  }

  finishEdit() {
    this.editing = false;

    if (this.textInput.invalid) {
      return;
    }
    if (this.textInput.value === this.todo.text) {
      return;
    }
    const action = new EditTodoAction(this.todo.id, this.textInput.value);
    this.store.dispatch(action);
  }

  deleteTodo() {
    const action = new DeleteTodoAction(this.todo.id);
    this.store.dispatch(action);
  }
}
