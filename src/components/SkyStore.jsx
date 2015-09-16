import alt from '../libs/alt';
import { RouteHandler, Link } from 'react-router';
import React from 'react';
import Paginator from 'react-pagify';
import numberUtils from '../utils/numberUtils';

import BillStore from '../stores/BillStore';

import SkyStoreTable from './widgets/SkyStoreTable';
import StatementInfo from './widgets/StatementInfo';
import Navigation from './widgets/Navigation';

export default class SkyStore extends React.Component {
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
        const skyStore = bill.skyStore;

        return (<div className="col-md-12">
            <div className="row">
                <aside className="col-md-4 sidebar">

                    <Navigation />
                    <StatementInfo statement={bill.statement} total={bill.total} />


                </aside>
                <div className="col-md-8">
                    <h2>Subscriptions</h2>
                    <h3>Total - {numberUtils.formatGBP(skyStore.total)}</h3>
                    <hr />
                    <h3>Rentals</h3>
                    <section className="recent-calls">
                        <SkyStoreTable data={skyStore.rentals} />

                    </section>
                    <hr />
                    <h3>Buy and Keep</h3>
                    <section className="recent-calls">
                        <SkyStoreTable data={skyStore.buyAndKeep} />

                    </section>
                </div>
            </div>
        </div>);
    }
}