import React, {Component} from 'react';
import api from '../services/api'

// const App = () => <div>APP WORKS</div>;

class App extends React.Component{
    async componentDidMount() {   ////runs imediately after the render method. Is a lifecycle method
        const result = await api.call('post','auth/login', {
            "username":"username",
            "password":"password"
        });
        console.log(result);
    }
    
    render(){
        return <div>APP WORKS</div>;
    }
}

export default App;

