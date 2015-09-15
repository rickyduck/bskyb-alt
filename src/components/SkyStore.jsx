import alt from '../libs/alt';
import { RouteHandler, Link } from 'react-router';
import React from 'react';

import BillStore from '../stores/BillStore';

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
        return (<div className="col-md-12">
            <div className="row">
                <aside className="col-md-4 sidebar">

                    <Navigation />
                    <StatementInfo statement={bill.statement} total={bill.total} />


                </aside>
                <div className="col-md-8">
                    Sky Store
                </div>
            </div>
        </div>);
    }
}