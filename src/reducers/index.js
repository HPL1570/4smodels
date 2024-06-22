// src/reducers/index.js
import { combineReducers } from 'redux';

const initialState = {
  task: {
    TaskName: '',
    TaskTypeID: '',
    TaskDescription: '',
    TaskInput: '',
    // Add other fields as needed
  },
  auth: {
    userDetails: null, // Placeholder for user details
    // Add other auth-related state
  },
  // other slices of state
};

const taskReducer = (state = initialState.task, action) => {
  switch (action.type) {
    // handle actions to update task state if needed
    default:
      return state;
  }
};

// Add other reducers as needed for different slices of state

const rootReducer = combineReducers({
  task: taskReducer,
  // Add other reducers here
});

export default rootReducer;
