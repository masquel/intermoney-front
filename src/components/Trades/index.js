import React, { Component } from 'react';
import { connect } from "react-redux";
import { List, Spin, Table, Radio } from "antd";
import moment from 'moment';

import { getTradeLog, getUserTradeLog } from '../../reducers/Trades';


import { Row, Col } from '../Grid';

import './Trades.css';

const keyAccessor = r => r.id;

const timeFormatter = date => moment(date).format('HH:mm:ss');

const formatPrice = number => number / 1000000000000000000;

const sortTrades = data => data.sort((a, b) => b.created_at - a.created_at);

const getRowClassName = (record, index) => {
    let classes = ["trade-log__item"]; 
    if(record.side === -1){ 
        classes.push('trade-log__item--sell');
    }else{
        classes.push('trade-log__item--buy');
    }
    return classes.join(" ");
}


const columns = ({onClick}) => [{
    render: (text, {side, price}) => {
        const type = side;
        const onColumnClick = () => onClick(price);
        return (
            <div
                className={`trade-log__item--${type}`}
                onClick={onColumnClick}
            >
                {formatPrice(price)  || "—"}
            </div>
        )
    }
},{
    render: (text, { side, size, price }) => {
        const type = side;
        const onColumnClick = () => onClick(price);
        return (
            <div
                
                className="text-right"
                onClick={onColumnClick}
            >
                {formatPrice(size) || "-"}
            </div>
        )
    }
},{
    render: (text, {created_at, price}) => {
        const onColumnClick = () => onClick(price);
        return (
            <div className="text-right" onClick={onColumnClick}>
                {created_at ? timeFormatter(created_at) : "—"}
            </div>
        )
    }
}];

class TradeLog extends Component {
    render() {
        const { data, loading } = this.props;
        const sortedData = sortTrades(data);
        return(
            <div className="trade-log">
                <div className="trade-log__items">
                    <Table
                        className="trade-log__table"
                        showHeader={false}
                        columns={columns({})}
                        dataSource={sortedData}
                        loading={loading}
                        scroll={{y: 230}}
                        pagination={false}
                        size="small"
                    />
                </div>
            </div>
        );
    }
}

TradeLog.defaultProps = {
    loading: false,
    data: []
}

export default TradeLog;
