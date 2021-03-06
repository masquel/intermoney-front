import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment/moment";

import OrderList from "../OrderList";
import { fetchHistoryOrderList } from '../../reducers/Orders';


const formatOrderDate = date => moment(date).format("DD/MM/YYYY HH:mm:ss");

const formatPrice = number => number / 1000000000000000000;

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
            render: (text, record) => <div>{formatPrice(record.price) || '-'}</div>
        }, {
            title: "Amount",
            render: (text, record) => (<div>{formatPrice(record.size) ||'-'}</div>)
        }, {
            title: "Total",
            render: (text, record) => (<div>{(formatPrice(record.price) * formatPrice(record.filled)).toFixed(8) || '-'}</div>)
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
