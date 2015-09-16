import React from 'react';
import stringUtils from '../../utils/stringUtils';
import numberUtils from '../../utils/numberUtils';
import { Table } from 'reactabular';

export default class SubscriptionsTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table
                className="table"
                data={this.props.data}
                columns={[
                    {property: "type", header: "Subscription Type", cell: (type) => stringUtils.capitalize(type)},
                    {property: "name", header: "Name"},
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
