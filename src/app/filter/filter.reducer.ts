import * as FilterActions from './filter.actions';

const initialState: FilterActions.AllowedFilters = 'All';

export const filterReducer = (state = initialState, action: FilterActions.Actions): FilterActions.AllowedFilters => {
  switch (action.type) {
    case FilterActions.SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}
