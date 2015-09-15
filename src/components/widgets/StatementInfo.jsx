import React from 'react';
import { RouteHandler, Link } from 'react-router';
import moment from 'moment';
export default class StatementInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formatDate(date) {
        return moment(date).format("MMM Do YYYY");
    }

    render() {
        const statement = this.props.statement;
        const total = this.props.total;
        return (
            <div className="row">
                <header className="col-md-12">
                    <h3>Your Statement</h3>
                </header>
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <th scope="row">From:</th>
                            <td>{this.formatDate(statement.period.from)}</td>
                        </tr>
                        <tr>
                            <th scope="row">To:</th>
                            <td>{this.formatDate(statement.period.to)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Due on:</th>
                            <td>{this.formatDate(statement.due)}</td>
                        </tr>
                        <tr>
                            <th scope="row">Total:</th>
                            <td>{total}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}