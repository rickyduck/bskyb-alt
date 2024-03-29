import alt from '../libs/alt';
import { RouteHandler, Link } from 'react-router';
import React from 'react';
import Paginator from 'react-pagify';
import numberUtils from '../utils/numberUtils';

import BillStore from '../stores/BillStore';

import SubscriptionsTable from './widgets/SubscriptionsTable';
import StatementInfo from './widgets/StatementInfo';
import Navigation from './widgets/Navigation';

export default class Subscriptions extends React.Component {
    static contextTypes = {
        router: React.PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = BillStore.getState();
        this.state.pagination = {
            page: 0,
            perPage: 10
        };
        this.onSelect = this.onSelect.bind(this);
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
    onSelect(page) {
        let pagination = this.state.pagination || {};
        pagination.page = page;
        this.setState({
            pagination: pagination
        });
    }
    onPerPage(e) {
        let pagination = this.state.pagination || {};
        pagination.perPage = parseInt(event.target.value, 10);
        this.setState({
            pagination: pagination
        });
    }
    render() {
        const bill = this.state.bill;
        const pagination = this.state.pagination;
        const paginated = Paginator.paginate(bill.package.subscriptions, pagination);

        return (<div className="col-md-12" style={{paddingTop: "10px"}}>
            <div className="row">
                <aside className="col-md-4 sidebar">

                    <Navigation />
                    <StatementInfo statement={bill.statement} total={bill.total} />


                </aside>
                <div className="col-md-8">
                    <h2>Subscriptions</h2>
                    <h3>Total - {numberUtils.formatGBP(bill.package.total)}</h3>
                    <hr />

                    <section className="recent-calls">
                        <SubscriptionsTable data={paginated.data} />
                        <div className='pagination'>
                            <Paginator
                                page={paginated.page}
                                pages={paginated.amount}
                                beginPages={3}
                                endPages={3}
                                onSelect={this.onSelect}></Paginator>
                        </div>
                    </section>
                </div>
            </div>
        </div>);
    }
}