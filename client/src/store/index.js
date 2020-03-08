import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';    //to be able to do async calls within our actions and reducers

import rootReducer from './reducers';

const DEFAULT_STATE = {
    error: {message: null}
};

export const store = createStore(
    rootReducer,
    DEFAULT_STATE,
    compose(    //compose turns all middleware into one object
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&    //check if redux devtools exists
        window.__REDUX_DEVTOOLS_EXTENSION__(),  //call's it if it exists
        //if you don't have the react and redux devtools installed in chrome it will give an error for the above 2 lines
    ),
  );