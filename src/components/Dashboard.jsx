import alt from '../libs/alt';
import { RouteHandler, Link } from 'react-router';
import React from 'react';
import { Table } from 'reactabular';

import BillStore from '../stores/BillStore';

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
    test() {}
    onChange(state) {
        this.setState(state);
    }

    render() {
        const bill = this.state.bill;
        let calls = bill.callCharges.calls.slice(0,5);
        return (<div className="col-md-12" style={{paddingTop: "10px"}}>
                <div className="row">
                    <aside className="col-md-4 sidebar">

                        <Navigation />
                        <StatementInfo statement={bill.statement} total={bill.total} />

                    </aside>
                    <div className="col-md-8">
                        <h2>Dashboard</h2>
                        <hr />
                        <section className="recent-calls">
                            <h3>Recent call charges</h3>
                            <Table
                                className="table"
                                data={calls}
                                columns={[
                                    {property: "called", header: "Number called"},
                                    {property: "duration", header: "Duration of call"},
                                    {property: "cost", header: "Cost"}
                                ]}
                                />
                            <Link to="callCharges"><button className="btn">View all</button></Link>
                        </section>
                    </div>
                </div>
            </div>);
    }
}