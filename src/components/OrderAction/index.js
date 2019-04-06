import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message, Tabs } from 'antd';

import { fetchWallets } from '../../reducers/Wallets';
import { Row, Col } from '../Grid';

import LimitBuy from './limitBuy';
import LimitSell from './limitSell';
import MarketBuy from './marketBuy';
import MarketSell from './marketSell';

const TabPane = Tabs.TabPane;


class OrderAction extends Component {
    componentDidMount(){
        this.props.fetchWallets();
    }
    render() {
        const {
            candles,
            idToken,
            defaultSymbol,
            instrumentObject,
            wallets,
            tickers,
            language,
            selectedPrice
        } = this.props;
        //const lastCandle = candles[candles.length - 1];
        //const lastPrice = lastCandle ? lastCandle.close : 0;
        const lastPrice = tickers[defaultSymbol] ? tickers[defaultSymbol].last_price : 0;
        const instrument = instrumentObject[defaultSymbol];
        const buyWallet = wallets.find(wallet => {
            const currency = instrument ? instrument.quote_currency : null;
            return wallet.type === "exchange" && wallet.currency === currency;
        });
        const sellWallet = wallets.find(wallet => {
            const currency = instrument ? instrument.base_currency : null;
            return wallet.type === "exchange" && wallet.currency === currency;
        });
        return (
            <Tabs animated={false}>
                <TabPane tab="Limit" key="1">
                    <Col md={12} sm={24} xs={24}>
                        <LimitBuy
                            lastPrice={lastPrice}
                            selectedPrice={selectedPrice}
                            instrument={instrument}
                            wallet={buyWallet}
                        />
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                        <LimitSell
                            lastPrice={lastPrice}
                            selectedPrice={selectedPrice}
                            instrument={instrument}
                            wallet={sellWallet}
                        />
                    </Col>
                </TabPane>
                <TabPane tab="Market" key="2">
                    <Col md={12} sm={24} xs={24}>
                        <MarketBuy
                            lastPrice={lastPrice}
                            selectedPrice={selectedPrice}
                            instrument={instrument}
                            wallet={buyWallet}
                        />
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                        <MarketSell
                            lastPrice={lastPrice}
                            selectedPrice={selectedPrice}
                            instrument={instrument}
                            wallet={sellWallet}
                        />
                    </Col>
                </TabPane>
            </Tabs>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        //wallets: state.Wallets.data,
        wallets: [],
        tickers: {},
        instrumentObject: {}
    };
}

const mapDispatchToProps = {
    fetchWallets
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderAction);
