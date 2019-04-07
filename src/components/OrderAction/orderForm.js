import React, { Component } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import Web3 from 'web3';

import { createOrder, getWallets, getActiveOrders, getHistoryOrders } from '../../api';

import { Row, Col } from '../Grid';

import './OrderForm.css';

const FormItem = Form.Item;

const parseFloatValue = value => {
    let newValue = value;
    if (typeof newValue === "number") newValue = newValue.toString();
    newValue = newValue
        .replace(/[^0-9.,]/g, "")
        .replace(/\,/g, ".")
        .replace(/(\..*)\./g, "$1");
    newValue = newValue ? newValue : "";
    if (newValue) {
        const dotIndex = newValue.indexOf(".");
        if (dotIndex > -1) {
            newValue = `${newValue.slice(0, dotIndex)}${newValue.slice(
                dotIndex,
                dotIndex + 6
            )}`;
        }
    }
    return newValue;
};

const roundTotal = total => Math.round(total * 100000) / 100000;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
    }
};

const orderActions = {
    sell: "Sell",
    buy: "Buy"
};

const buttonStyle = {
    width: "100%"
};

const orderButtonsProps = {
    sell: {
        type: "danger",
        style: buttonStyle
    },
    buy: {
        type: "success",
        style: buttonStyle
    }
};

const balancePercentButtons = ["25", "50", "75", "100"];

const WalletBalance = ({ wallet }) => {
    if (!wallet) return null;
    return (
        <span className="order-form__wallet-balance">
            {wallet.balance_available} {wallet.currency}
        </span>
    );
};

const getHashParams = (nonce, amount, price, direction) => {
    return [
        {t: 'uint256', v: nonce}, // nonce
        {t: 'uint256', v: amount}, // amount
        {t: 'uint256', v: price}, // price
        {t: 'bool', v: direction} // direction (sell - 0, buy - 1)
    ];
}


class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userHasInputPrice: false,
            loading: false,
            price: props.lastPrice
        };
    }

    handleFormInput = e => {
        const { name, value } = e.target;
        if (name === "price") {
            this.setState({
                userHasInputPrice: true,
                [name]: parseFloatValue(value)
            });
        } else {
            this.setState({
                [name]: parseFloatValue(value)
            });
        }
    };
    handleSignOrder = (e) => {
        e.preventDefault();
        const { ticker, type, side } = this.props;
        let { amount, price } = this.state;
        if(amount <= 0 ){
            return;
        }
        if(price <= 0){
            return;
        }
        this.setState({ loading: true });
        if(!window.web3){
            alert('No web3!');
            this.setState({ loading: false });
        }else{
            amount = window.web3.toWei(amount);
            price = window.web3.toWei(price);

            const web3 = new Web3(window.web3.currentProvider);
            web3.eth.getAccounts().then(accounts => {
                const direction = side === "sell" ? false : true;

                const nonce = 1;
                

                // const hashParams = [
                //     {t: 'uint256', v: 0}, // nonce
                //     {t: 'uint256', v: 5000}, // amount
                //     {t: 'uint256', v: 2}, // price
                //     {t: 'bool', v: 1} // direction (sell - false, buy - true)
                // ];
                //const hashParams = getHashParams(0, 5000, 20000, true);
                const hashParams = getHashParams(nonce, amount, price, direction);

                console.log('hashParams', hashParams);
                const soliditySha3 = web3.utils.soliditySha3(...hashParams);
                
                return web3.eth.sign(soliditySha3, accounts[0])
            }).then(signature => {
                console.log(signature);
                //message.success(signature);
                
                createOrder({
                    market: ticker.id,
                    size: amount,
                    type: type.toLowerCase(),
                    price: type.toLowerCase() === "market" ? undefined : price,
                    hash_signature: signature,
                    side
                })
                    .then(response => {
                        this.setState({
                            loading: false,
                            amount: 0.0
                        });
                        this.props.fetchOrders();
                        message.success("Order added successfully.");
                    })
                    .catch(error => {
                        if (error.response && error.response.data) {
                            console.log(error.response.data);
                            message.error(error.response.data.error.message);
                        } else {
                            message.error(
                                `Something wrong. Order didn't create. ${error}`
                            );
                        }
                        console.error(error);
                        this.setState({
                            loading: false
                        });
                    });
            }).catch(error => {
                console.error(error);
                console.log(error.message);
                message.error(error.message);
                this.setState({ loading: false });    
            })
        }
    }
    onBalancePercentClick = e => {
        e.preventDefault();
        const { value } = e.target;
        const { price } = this.state;
        const { wallet, side } = this.props;
        const balance_available = wallet ? wallet.balance_available : 0;
        let amount = (value / 100) * balance_available;
        if (side === "sell") {
            this.setState({ amount: parseFloatValue(amount) });
        } else {
            this.setState({ amount: parseFloatValue(amount / price) });
        }
    };

    componentWillReceiveProps(nextProps) {
        if (
            nextProps.lastPrice !== this.props.lastPrice &&
            !nextProps.selectedPrice &&
            !this.state.userHasInputPrice
        ) {
            this.setState({
                price: nextProps.lastPrice
            });
        }
        if (nextProps.selectedPrice !== this.props.selectedPrice) {
            this.setState({
                price: nextProps.selectedPrice,
                amount: "",
                total: ""
            });
        }
    }

    render() {
        const { price, amount, loading } = this.state;
        const { ticker, lastPrice, type, side, wallet, intl } = this.props;

        const isMarket = type === "MARKET";
        let buyCurrency = null;
        let sellCurrency = null;

        if (ticker != null) {
            // if(side == "sell") {
            buyCurrency = ticker.base_currency_display;
            sellCurrency = ticker.quote_currency_display;
            // } else {
            //     buyCurrency = instrument["base_currency"];
            //     sellCurrency = instrument["quote_currency"];
            // }
        }
        let total = parseFloat(price * amount);
        total = roundTotal(total);
        const orderAction = orderActions[side];
        const orderButtonProps = orderButtonsProps[side];
        const canSubmit = !loading && (amount > 0 && price > 0 );
        return (
            <Form onSubmit={this.handleSignOrder} className="order-form">
                <h3 className="order-form__title">
                    {orderAction} {buyCurrency}{" "}
                    <WalletBalance wallet={wallet} />
                </h3>
                {!isMarket && (
                    <FormItem
                        label="Price:"
                        {...formItemLayout}
                    >
                        <Input
                            disabled={loading}
                            placeholder="price"
                            name="price"
                            value={price}
                            onChange={this.handleFormInput}
                            addonAfter={<span>{sellCurrency}</span>}
                            style={{ width: "100%" }}
                        />
                    </FormItem>
                )}
                <FormItem
                    label="Amount:"
                    {...formItemLayout}
                >
                    <Input
                        disabled={loading}
                        placeholder="Amount"
                        name="amount"
                        value={amount}
                        onChange={this.handleFormInput}
                        addonAfter={<span>{buyCurrency}</span>}
                        style={{ width: "100%" }}
                    />
                    <div className="order-form__balance-buttons">
                        {balancePercentButtons.map((balancePercent, index) => {
                            return (
                                <Button
                                    key={index}
                                    className="order-form__balance-button"
                                    value={balancePercent}
                                    size="small"
                                    onClick={this.onBalancePercentClick}
                                >
                                    {balancePercent}%
                                </Button>
                            );
                        })}
                    </div>
                </FormItem>
                <FormItem
                    label="Total"
                    {...formItemLayout}
                >
                    <Input
                        disabled={loading}
                        placeholder="Total"
                        name="total"
                        value={total || ""}
                        readOnly
                        addonAfter={<span>{sellCurrency}</span>}
                        style={{ width: "100%" }}
                    />
                </FormItem>
                <Row gutter={0} justify="start">
                    <Col md={24} sm={24} xs={24}>
                        <Button
                            className={`order-form__button order-form__button--${side}`}
                            htmlType="submit"
                            loading={loading}
                            {...orderButtonProps}
                            disabled={!canSubmit}
                        >
                            {orderAction}{" "}{buyCurrency}
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default OrderForm;
