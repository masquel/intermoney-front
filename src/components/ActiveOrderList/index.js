import React, { Component } from 'react';
import { connect } from "react-redux";
import {message, Icon, Button, Popconfirm} from "antd";
import moment from "moment/moment";

import { processApiError } from "../../reducers/helpers";

import { cancelOrder, cancelAllOrders } from "../../api";
import { fetchWallets } from "../../reducers/Wallets/";
import { fetchActiveOrderList } from "../../reducers/Orders";

import OrderList from "../OrderList";


const formatOrderDate = date => moment(date).format("DD/MM/YYYY HH:mm:ss");


class ActiveOrderList extends Component {
    state = {
        filter: null
    }
    onCancelOrder = (orderId) => {
        const { cancelOrder, processApiError, fetchWallets } = this.props;
        return () => {
            const { web3 } = window;
            const { account } = web3.eth;
            if(web3){
                return cancelOrder(orderId, account[0])
                    .then((response) => {
                        fetchWallets(account[0]);
                        message.success(`Order ${response.data.id} canceled`);
                    })
                    .catch(error => {
                        processApiError(error)
                    });
            }else{
                return Promise.reject("No Web3");
            }
        }
    }
    onCancelAllOrders = () => {
        const { auth, processApiError } = this.props;
        const { web3 } = window;
        if(web3){
            const { account } = web3.eth;
            cancelAllOrders()
                .then(() => {
                    this.props.fetchWallets(account[0]);
                    this.props.fetchActiveOrderList(account[0]);
                })
                .catch(error => {
                    processApiError(error)
                });
        }
    }
    render() {
    	const { tickers,  ...props } = this.props;
        const columns = [ {
            title: "Date",
            render: (text, record) => {
                return(<div>{formatOrderDate(record.created_at/ 1000000)}</div>)
            }
        }, {
            title: "Pair",
            render: (text, record) => {
                const ticker = tickers[record.market_display];
                const base_currency = ticker ? ticker.base_currency : '';
                const quote_currency = ticker ? ticker.quote_currency : '';
                return <div>{base_currency}/{quote_currency}</div>;
            }
        }, {
            title: "Type",
            dataIndex: "execution_type"
        }, {
            title: "Side",
            dataIndex: "side"
        }, {
            title: "Price",
            render: (text, record) => (<div>{record.price || '-'}</div>)
        }, {
            title: "Amount",
            dataIndex: "amount"
        }, {
            title: "Filled",
            dataIndex: "filled"
        }, {
            title: "Total",
            render: (text, record) => (<div>{record.price * record.filled || '-'}</div>)
        }, {
            className: 'text-center',
            title: (
                <Popconfirm
                    placement="right"
                    title="Cancel all orders?"
                    onConfirm={this.onCancelAllOrders}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button>Cancel all</Button>
                </Popconfirm>
            ),
            key: 'operation',
            render: (text, record) => {
                return (
                    <div className="text-right">
                        <Popconfirm
                            placement="right"
                            title="Cancel order?"
                            onConfirm={this.onCancelOrder(record.id)}
                            okText="yes"
                            cancelText="no"
                        >
                            <Button
                                type="danger"
                                ghost
                            >
                                <Icon type="close" />
                            </Button>
                        </Popconfirm>    
                    </div>
                )
            }
        }];
        const title = (<span>Open orders</span>);
        return(
    		<OrderList 
                title={title}
                columns={columns}
                {...props}
            />
        );
    }
}

export default ActiveOrderList;
