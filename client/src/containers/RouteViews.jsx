import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCurrentPoll } from '../store/actions';
import AuthPage from '../pages/AuthPage';
import TestPage from '../pages/TestPage';
import HomePage from '../pages/HomePage';
import PollPage from '../pages/PollPage';
import CreatePollPage from '../pages/CreatePollPage';

const RouteViews = ({auth, getCurrentPoll}) => (
    <main className="container">
        <Switch>
            <Route exact path="/" render={(props) => <HomePage {...props}/>} />
            <Route
            exact path="/login"
            render={() => (
            <AuthPage 
                authType="login" 
                isAuthenticated={auth.isAuthenticated} 
            />
            )}
            />
            <Route
                exact path="/register"
                render={() => (
                <AuthPage
                    authType="register"
                    isAuthenticated={auth.isAuthenticated}
                />
                )}
            />
            <Route
                exact path="/poll/new"
                render={() => <CreatePollPage isAuthenticated={auth.isAuthenticated} />}
            />
            <Route
                exact path="/poll/:id"    //: is used so that react knows that id is a variable
                render={props => (
                <PollPage getPoll={id => getCurrentPoll(id)} {...props} />
                )}
            />
            <Route exact path="/test" render={() => <TestPage/>} />
        </Switch>
    </main>
);

export default withRouter(connect(store => ({auth: store.auth}), { getCurrentPoll })(RouteViews));
//withRouter lets rudux have access to router state(i.e. it has access to path and history object)