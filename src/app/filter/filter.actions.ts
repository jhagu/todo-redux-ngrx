import { Action } from '@ngrx/store';

export type AllowedFilters = 'All' | 'Active' | 'Completed';
export const SET_FILTER = '[FILTER] Set filter';

export class SetFilterAction implements Action {
  readonly type = SET_FILTER;
  constructor(public filter: AllowedFilters) { }
}

export type Actions = SetFilterAction;
