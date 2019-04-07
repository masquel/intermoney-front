import React, { Component } from 'react';
import { message, Tabs } from 'antd';

import { Row, Col } from '../Grid';

import LimitBuy from './limitBuy';
import LimitSell from './limitSell';
import MarketBuy from './marketBuy';
import MarketSell from './marketSell';

const TabPane = Tabs.TabPane;


class OrderAction extends Component {
    render() {
        const { ticker, wallets } = this.props;
        const lastPrice = ticker.last_price || 0;
        const buyWallet = wallets.find(wallet => {
            const currency = ticker ? ticker.quote_currency_display : null;
            return wallet.type === "exchange" && wallet.currency === currency;
        });
        const sellWallet = wallets.find(wallet => {
            const currency = ticker ? ticker.base_currency_display : null;
            return wallet.type === "exchange" && wallet.currency === currency;
        });
        return (
            <Tabs animated={false}>
                <TabPane tab="Limit" key="1">
                    <Col md={12} sm={24} xs={24}>
                        <LimitBuy
                            lastPrice={lastPrice}
                            ticker={ticker}
                            wallet={buyWallet}
                        />
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                        <LimitSell
                            lastPrice={lastPrice}
                            ticker={ticker}
                            wallet={sellWallet}
                        />
                    </Col>
                </TabPane>
                <TabPane tab="Market" key="2">
                    <Col md={12} sm={24} xs={24}>
                        <MarketBuy
                            lastPrice={lastPrice}
                            ticker={ticker}
                            wallet={buyWallet}
                        />
                    </Col>
                    <Col md={12} sm={24} xs={24}>
                        <MarketSell
                            lastPrice={lastPrice}
                            ticker={ticker}
                            wallet={sellWallet}
                        />
                    </Col>
                </TabPane>
            </Tabs>
        );
    }
};

OrderAction.defaultProps = {
    ticker: {},
    wallets: []
}

export default OrderAction;
