import Iso from 'iso';
import Router from 'react-router';
import React from 'react/addons';
import routes from 'routes';
import alt from './libs/alt';

window.onload = function() {
    Iso.bootstrap((state, meta, container) => {
        alt.bootstrap(state);
        Router.run(routes, Router.HistoryLocation, (Handler) => {
            var node = React.createElement(Handler);
            console.log(container);
            React.render(node, container);
        });
    });
}
