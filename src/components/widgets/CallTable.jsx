import React from 'react';
import numberUtils from '../../utils/numberUtils.jsx';
import { Table } from 'reactabular';

export default class CallTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table
                className="table"
                data={this.props.data}
                columns={[
                    {property: "called", header: "Number called"},
                    {property: "duration", header: "Duration of call"},
                    {
                        property: "cost",
                        header: "Cost",
                        cell: (cost) => {
                            return numberUtils.formatGBP(cost);
                        }
                    }
                ]}
            />
        );
    }
}