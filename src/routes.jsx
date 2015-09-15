import alt from './libs/alt';
import { Route, RouteHandler, Link } from 'react-router';
import React from 'react';

import Dashboard from './components/Dashboard';
import CallCharges from './components/CallCharges';
import SkyStore from './components/SkyStore';
import Subscriptions from './components/Subscriptions';
import App from './components/App';

var routes = (
    <Route name="home" path="/" handler={App}>
        <Route name="dashboard" path="/" handler={Dashboard} />
        <Route name="subscriptions" path="/subscriptions" handler={Subscriptions} />
        <Route name="callCharges" path="/call-charges" handler={CallCharges} />
        <Route name="skyStore" path="/sky-store" handler={SkyStore} />
    </Route>
);
export default routes;