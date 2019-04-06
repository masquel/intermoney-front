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

const mapStateToProps = (state, ownProps) => ({
    ...state.Orders.activeOrders
});

const mapDispatchToProps = {
    fetchActiveOrderList,
    cancelOrder,
    processApiError,
    fetchWallets
}

class ActiveOrderList extends Component {
    state = {
        filter: null
    }
    onCancelOrder = (orderId) => {
        const { cancelOrder, processApiError, fetchWallets } = this.props;
        return () => {
            return cancelOrder(orderId)
                .then((response) => {
                    fetchWallets();
                    message.success(`Order ${response.data.id} canceled`);
                })
                .catch(error => {
                    processApiError(error)
                });
        }
    }
    onCancelAllOrders = () => {
        const { auth, processApiError } = this.props;
        cancelAllOrders()
            .then(() => {
                this.props.fetchWallets();
                this.props.fetchActiveOrderList(auth.idToken);
            })
            .catch(error => {
                processApiError(error)
            });
    }
    render() {
    	const { fetchActiveOrderList, instruments,  ...props } = this.props;
        const columns = [ {
            title: "Date",
            render: (text, record) => {
                return(<div>{formatOrderDate(record.created_at/ 1000000)}</div>)
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
            },
            filters: [{
                text: "All",
                value: 'all'
            },{
                text: "Limit order",
                value: 'limit'
            },{
                text: "Market order",
                value: 'market'
            }],
            filterMultiple: false,
            onFilter: (value, record) => {
                if(value === 'all') return true;
                return value === record.execution_type
            }
        }, /*{
            title: "Order Id",
            key: "orderId",
            render: (text, record) => (
                <span title={record.id}>
                    {record.id.substring(0,11)}...
                </span>
            )
        }*/];
        const title = (<span>Open orders{" "}({props.pagination.total})</span>);
        return(
    		<OrderList 
                title={title}
                fetch={fetchActiveOrderList}
                limit={5}
                columns={columns}
                {...props}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveOrderList);
