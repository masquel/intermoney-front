import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button, Select } from "antd";

import axios from "axios";

import { fetchOrderBook } from "../../reducers/Orderbook";

import "./Orderbook.css";

const Option = Select.Option;



const typeClassNames = {
    "ask": "orderbook-row orderbook-ask-row",
    "bid": "orderbook-row orderbook-bid-row"
}

const parsePrice = (price, stepValue) => parseFloat(parseFloat(price).toFixed(stepValue));

const getOrderBookFromArray = (array, type, options) => {
    const { stepValue, depth } = options;
    let firstIndex = null;
    let objectByPrice = {};
    let keyList = [];

    for (let i = 0; i < array.length; i++) {;
        const itemPrice = array[i][0];

        if(!firstIndex){
          firstIndex = i;
        } else {
          const firstIndexPrice = array[firstIndex][0];
          if(firstIndexPrice > itemPrice){
            firstIndex = i;
          }
        }

        objectByPrice[itemPrice] = array[i];
        keyList.push(itemPrice);
    }

    keyList = keyList.sort((a, b) => {
      return type === "bid" ? b - a : a - b;
    });

    let filledPriceLevel = [];
    let list = [];

    let k = 0;

    while (list.length < depth) {
        if (typeof keyList[k] !== 'undefined') {
            let priceLevel = parsePrice(keyList[k], stepValue);

            const levelIndex = filledPriceLevel.indexOf(priceLevel);
            const amount = parseFloat(objectByPrice[keyList[k]][1]);
            if (levelIndex == -1) {
                if(type === "bid"){
                    list.push({
                        price: priceLevel,
                        amount
                    });
                    filledPriceLevel.push(priceLevel);
                }else{
                    list.unshift({
                        price: priceLevel,
                        amount
                    });
                    filledPriceLevel.unshift(priceLevel);
                }
            } else {
                list[levelIndex].amount += parseFloat(amount);
            }
        } else {
            if(type === "bid"){
                list.push({ price: 0, amount: 0 });
            }else{
                list.unshift({ price: 0, amount: 0 });
            }
        }        

        k++;
    }
    return list;
};

const OrderBookCell = ({ type, price, amount, total, fillPercent, onClick }) => {
    const typeClassName = typeClassNames[type];
    return (
        <Row
            className={typeClassName}
            gutter={0}
            justify="start"
        >
            <div
                className="orderbook-row__fill"
                style={{ width: fillPercent + "%" }}
            />
            <Col md={9}>
                <div className="order-book-cell order-book-cell--price" onClick={onClick}>
                    {price || "—"}
                </div>
            </Col>
            <Col md={6}>
                <div className="order-book-cell order-book-cell--amount" onClick={onClick}>
                    {amount ? amount.toFixed(6) : "—"}
                </div>
            </Col>
            <Col md={9}>
                <div className="order-book-cell order-book-cell--total" onClick={onClick}>
                    {total || "—"}
                </div>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state, ownProps) => ({
    orderBook: state.Orderbook.data
});

const mapDispatchToProps = { fetchOrderBook };

class OrderBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxAmount: 100,
            localOrderBook: {
                ask: [],
                bid: []
            },
            show: "all",
            stepValue: 2,
            depth: 30
        };
    }

    buildOrderBook = () => {
        this.props.fetchOrderBook();
    };

    componentDidMount() {
        this.buildOrderBook();
    }
    renderPriceList = type => {
        const { orderBook } = this.props;
        const { maxAmount, show, stepValue, depth } = this.state;
        let price_list = getOrderBookFromArray(orderBook[type], type, {stepValue, depth});
        if (show === "all") {
            if (type === "bid") {
                price_list = price_list.slice(0, 8);
            } else {
                price_list = price_list.slice(-8);
            }
        }

        return (
            <div className="order-book__price-list">
                {
                    price_list.map((listItem, index) => {

                        let { amount, price } = listItem;
                        let fillPercent = 0;
                        if (amount !== "-") {
                            fillPercent = parseInt(parseFloat(amount) / maxAmount * 100);
                            amount = parseFloat(amount);
                        }
                        const onClick = () => {
                            if(amount !== "-"){
                                this.props.onSelectPrice(price);    
                            }
                        }
                        return (
                            <OrderBookCell
                                key={index}
                                type={type}
                                price={price}
                                amount={amount}
                                fillPercent={fillPercent}
                                onClick={onClick}
                            />
                        );
                    })
                }
            </div>
        )
    };

    onListButtonClick = e => {
        e.preventDefault();
        const { value } = e.target;
        this.setState({ show: value });
    };

    onChangeStepValue = value => {
        this.setState({stepValue: value});
    }
    render() {
        const { orderBook } = this.props;
        const { show } = this.state;
        const showAll = show === "all";
        const showAsks = show === "asks";
        const showBids = show === "bids";
        return (
            <div className="order-book">
                <div className="order-book__header">
                    <Row gutter={0} justify="start">
                        <Col md={12}>
                            <Button
                                onClick={this.onListButtonClick}
                                disabled={showAll}
                                value="all"
                                size="small"
                            >
                                All
                            </Button>{" "}
                            <Button
                                onClick={this.onListButtonClick}
                                disabled={showBids}
                                value="bids"
                                size="small"
                            >
                                Bids
                            </Button>{" "}
                            <Button
                                onClick={this.onListButtonClick}
                                disabled={showAsks}
                                value="asks"
                                size="small"
                            >
                                Asks
                            </Button>
                        </Col>
                        <Col md={12} className="text-right">
                            Groups
                            {" "}
                            <Select
                                name="stepValue"
                                value={this.state.stepValue}
                                onChange={this.onChangeStepValue}
                                size="small"
                                style={{minWidth: '100px'}}
                            >
                                <Option value={0}>0 decimals</Option>
                                <Option value={1}>1 decimals</Option>
                                <Option value={2}>2 decimals</Option>
                                <Option value={3}>3 decimals</Option>
                                <Option value={4}>4 decimals</Option>
                                <Option value={5}>5 decimals</Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div className="order-book__inner-header">
                    <Row gutter={0} justify="start">
                        <Col md={9}>
                            Price
                        </Col>
                        <Col md={6} className="text-center">
                            Amount
                        </Col>
                        <Col md={9} className="text-right">
                            Total
                        </Col>
                    </Row>
                </div>
                <div className="order-book__inner">
                    {(showAll || showAsks) && this.renderPriceList("ask")}
                    <div className="order-book__last-price">
                        {"—"}
                    </div>
                    {(showAll || showBids) && this.renderPriceList("bid")}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);
