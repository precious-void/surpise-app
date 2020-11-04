import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import Main from 'pages/Main/Main';
import Statistics from 'pages/Statistics/Statistics';

const App = () => (
    <>
        <Header />
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/statistics" component={Statistics} />
            <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
    </>
);

export default App;
