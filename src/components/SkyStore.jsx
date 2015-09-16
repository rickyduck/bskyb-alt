import alt from '../libs/alt';
import { RouteHandler, Link } from 'react-router';
import React from 'react';
import Paginator from 'react-pagify';

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
        this.state.pagination = {
            rental: {
                page: 0,
                perPage: 10
            },
            buyAndKeep: {
                page: 0,
                perPage: 10
            }
        }
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
    onSelect(page, type) {
        let pagination = this.state.pagination || {};
        pagination[type].page = page;
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
        const skyStore = bill.skyStore;
        const pagination = this.state.pagination;
        const paginatedRental = Paginator.paginate(skyStore.rental, pagination.rental);

        return (<div className="col-md-12">
            <div className="row">
                <aside className="col-md-4 sidebar">

                    <Navigation />
                    <StatementInfo statement={bill.statement} total={bill.total} />


                </aside>
                <div className="col-md-8">
                    <h2>Subscriptions</h2>
                    <hr />
                    <h3>Rentals</h3>
                    <section className="recent-calls">
                        <SkyStoreTable data={paginatedRental.data} />
                        <div className='pagination'>
                            <Paginator
                                page={paginatedRental.page}
                                pages={paginatedRental.amount}
                                beginPages={3}
                                endPages={3}
                                onSelect={this.onSelect.bind(null, "rental")}>
                            </Paginator>
                        </div>
                    </section>
                </div>
            </div>
        </div>);
    }
}