import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment/moment";

import OrderList from "../OrderList";
import { fetchHistoryOrderList } from '../../reducers/Orders';
import { processApiError } from '../../reducers/helpers';

const formatOrderDate = date => moment(date).format("DD/MM/YYYY HH:mm:ss");

class HistoryOrderList extends Component {
    render() {
    	const { fetchHistoryOrderList, tickers, ...props } = this.props;
        const columns = [ {
            title: "Date",
            render: (text, record) => {
                return(<div>{formatOrderDate(record.created_at)}</div>)
            }
        }, {
            title: "Pair",
            render: (text, record) => {
                const ticker = tickers[record.market_display];
                const base_currency = ticker ? ticker.base_currency_display : '';
                const quote_currency = ticker ? ticker.quote_currency_display : '';
                return <div>{base_currency}/{quote_currency}</div>;
            }
        }, {
            title: "Type",
            dataIndex: "order_type"
        }, {
            title: "Side",
            dataIndex: "side"
        }, {
            title: "Price",
            render: (text, record) => <div>{record.price || '-'}</div>
        }, {
            title: "Amount",
            dataIndex: "size"
        }, {
            title: "Total",
            render: (text, record) => (<div>{(record.price * record.filled).toFixed(8) || '-'}</div>)
        }, {
            title: "Status",
            dataIndex: "status"
        }];
        return(
    		<OrderList
                title="Order history"
                columns={columns}
                {...props}
            />
        );
    }
}

export default HistoryOrderList;
