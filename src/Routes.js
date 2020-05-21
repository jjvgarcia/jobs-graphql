import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetail";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={JobList} />
                <Route path='/:company/:slug' component={JobDetails} />
                <Redirect to='/' />
            </Switch>
        </Router>
    );
};

export default Routes;
