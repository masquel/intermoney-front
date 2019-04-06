import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment/moment";

import OrderList from "../OrderList";
import { fetchHistoryOrderList } from '../../reducers/Orders';
import { processApiError } from '../../reducers/helpers';

function mapStateToProps(state, ownProps) {
    return {
        ...state.Orders.orders
    };


}
const mapDispatchToProps = {
    fetchHistoryOrderList,
    processApiError
}

const formatOrderDate = date => moment(date).format("DD/MM/YYYY HH:mm:ss");

class HistoryOrderList extends Component {
    render() {
    	const { fetchHistoryOrderList, instruments, ...props } = this.props;
        const columns = [ {
            title: "Date",
            render: (text, record) => {
                return(<div>{formatOrderDate(record.created_at / 1000000)}</div>)
            }
        }, {
            title: "Pair",
            render: (text, record) => {
                const instrument = instruments[record.instrument];
                const base_currency = instrument ? instrument.base_currency : '';
                const quote_currency = instrument ? instrument.quote_currency : '';
                return <div>{base_currency}/{quote_currency}</div>;
            }
        }, {
            title: "Type",
            dataIndex: "execution_type"
        }, {
            title: "Side",
            dataIndex: "side"
        }, {
            title: "Average",
            render: (text, record) => (<div>-</div>)
        }, {
            title: "Price",
            render: (text, record) => <div>{record.price || '-'}</div>
        }, {
            title: "Amount",
            dataIndex: "amount"
        }, {
            title: "Filled",
            dataIndex: "filled"
        }, {
            title: "Total",
            render: (text, record) => (<div>{(record.price * record.filled).toFixed(8) || '-'}</div>)
        }, {
            title: "Trigger conditions"
        }, {
            title: "Status",
            dataIndex: "state"
        }];
        return(
    		<OrderList
                title="Order history"
                limit={5}
                fetch={fetchHistoryOrderList}
                columns={columns}
                {...props}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrderList);
