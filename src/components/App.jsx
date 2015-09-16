import alt from '../libs/alt';
import { RouteHandler, Link } from 'react-router';
import React from 'react';

import Header from './Header';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-container">
                <Header />
                <div className="route-container">
                    <div className="container">
                        <RouteHandler />
                    </div>
                </div>
            </div>
        );
    }
}