import React from 'react';
import { RouteHandler, Link } from 'react-router';
import moment from 'moment';
export default class StatementInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <header className="col-md-12">
                    <h3>Navigation</h3>
                </header>
                <div className="col-md-12">
                    <ul className="nav nav-pills nav-stacked">
                        <li><Link to="dashboard">Dashboard</Link></li>
                        <li><Link to="subscriptions">Subscriptions</Link></li>
                        <li><Link to="callCharges">Call Charges</Link></li>
                        <li><Link to="skyStore">Sky Store</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
}