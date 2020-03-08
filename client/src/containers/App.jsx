import React from 'react';
import {Provider} from 'react-redux';   //to connect the store
import decode from 'jwt-decode';

import {store} from '../store';
import {setCurrentUser, addError, setToken} from '../store/actions';
import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';

if (localStorage.jwtToken) {
    setToken(localStorage.jwtToken);
    try {
      store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));    //we use decode to get the user that's enctypted inside the token
    } catch (err) {
      store.dispatch(setCurrentUser({}));
      store.dispatch(addError(err));
    }
  }

const App = () => (
<Provider store={store}>
    <Auth />
    <ErrorMessage/>
</Provider>
);



export default App;