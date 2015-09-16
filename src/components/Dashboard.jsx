import alt from '../libs/alt';
import { RouteHandler, Link } from 'react-router';
import React from 'react';
import config from '../../config';
import BillStore from '../stores/BillStore';
import numberUtils from '../utils/numberUtils';

import SkyStoreTable from './widgets/SkyStoreTable';
import CallTable from './widgets/CallTable';
import SubscriptionsTable from './widgets/SubscriptionsTable';
import StatementInfo from './widgets/StatementInfo';
import Navigation from './widgets/Navigation';

export default class Dashboard extends React.Component {
    static contextTypes = {
        router: React.PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = BillStore.getState();
    }
    componentDidMount() {
        BillStore.listen(this.onChange);
    }
    componentWillUnmount() {
        BillStore.unlisten(this.onChange);
    }
    onChange(state) {
        this.setState(state);
    }

    render() {
        const bill = this.state.bill;
        return (<div className="col-md-12" style={{paddingTop: "10px"}}>
                <div className="row">
                    <aside className="col-md-4 sidebar">

                        <Navigation />
                        <StatementInfo statement={bill.statement} total={bill.total} />

                    </aside>
                    <div className="col-md-8">
                        <h2>Dashboard</h2>
                        <hr />
                        {this.renderCalls()}
                        <hr />
                        {this.renderSubscriptions()}
                        <hr />
                        {this.renderSkyStore()}
                    </div>
                </div>
            </div>
        );
    }
    renderCalls() {
        const calls = this.state.bill.callCharges.calls;
        const callRows = calls.slice(0,config.DASHBOARD_TABLE_ROWS);
        const className = calls.length > config.DASHBOARD_TABLE_ROWS ? "visible" : "hidden";
        const moreCount = calls.length - config.DASHBOARD_TABLE_ROWS;
        return(
            <section className="dashboard-table">
                <h3>Recent call charges</h3>
                <CallTable data={callRows} />
                <h4>Total: {numberUtils.formatGBP(this.state.bill.callCharges.total)}</h4>
                <Link to="callCharges">
                    <button className="btn">View all ({moreCount} more)</button>
                </Link>
            </section>
        );
    }
    renderSubscriptions() {
        const subscriptions = this.state.bill.package.subscriptions;
        const subscriptionsRows = subscriptions.slice(0,config.DASHBOARD_TABLE_ROWS);
        const className = subscriptions.length > config.DASHBOARD_TABLE_ROWS ? "visible" : "hidden";
        const moreCount = subscriptions.length - config.DASHBOARD_TABLE_ROWS;
        return(
            <section className="dashboard-table">
                <h3>Subscriptions</h3>

                <SubscriptionsTable data={subscriptionsRows} />
                <h4>Total: {numberUtils.formatGBP(this.state.bill.package.total)}</h4>
                <Link to="subscriptions">
                    <button className="btn">View all ({moreCount} more)</button>
                </Link>

            </section>
        );
    }
    renderSkyStore() {
        const skyStore = this.state.bill.skyStore;
        let skyStoreConcat = [], fullConcat = [];
        const skyStoreRental = skyStoreConcat.concat.apply(skyStoreConcat, skyStore.rentals);
        skyStoreConcat = [];
        const skyStoreBAK = skyStoreConcat.concat.apply(skyStoreConcat, skyStore.buyAndKeep);
        const skyStoreRentalRows = skyStoreRental.slice(0,config.DASHBOARD_TABLE_ROWS);
        const skyStoreBAKRows = skyStoreBAK.slice(0,config.DASHBOARD_TABLE_ROWS);
        const className = (skyStoreBAKRows.length > config.DASHBOARD_TABLE_ROWS) || (skyStoreRentalRows.length > config.DASHBOARD_TABLE_ROWS) ? "visible" : "hidden";
        const moreCount = (skyStoreBAKRows.length - config.DASHBOARD_TABLE_ROWS) + (skyStoreRentalRows.length - config.DASHBOARD_TABLE_ROWS);
        return(
            <section className="dashboard-table">
                <h3>Sky Store</h3>
                <h4>Rentals</h4>
                <SkyStoreTable data={skyStoreRentalRows} />
                <h4>Buy and keep</h4>
                <SkyStoreTable data={skyStoreBAKRows} />
                <h4>Total: {numberUtils.formatGBP(skyStore.total)}</h4>
                <Link to="skyStore">
                    <button className="btn">View all ({(moreCount > 0 ? moreCount : 0)} more)</button>
                </Link>

            </section>
        );
    }
}