import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import web3 from '../../web3';

import { Row, Col } from '../../components/Grid';
import Card from '../../components/Card';

import { fetchTickers } from '../../reducers/Tickers';
import { fetchOrderBook } from '../../reducers/Orderbook';
import { fetchHistoryOrderList, fetchActiveOrderList } from '../../reducers/Orders';
import { processApiError } from '../../reducers/helpers';
import { fetchTrades } from '../../reducers/Trades';

import SymbolInfo from '../../components/SymbolInfo';
import SymbolList from '../../components/SymbolList';
import Orderbook from '../../components/Orderbook';
import OrderAction from '../../components/OrderAction';
import ActiveOrdersList from '../../components/ActiveOrderList';
import HistoryOrdersList from '../../components/HistoryOrderList';
import TradeLog from '../../components/Trades';

import Header from '../../components/Header';
import Footer from '../../components/Footer';


import './Dashboard.css';


const Web3Provider = web3.Web3Provider;

const mapStateToProps = (state) => {
	return {
		tickers: state.Tickers.tickers,
		orderBook: state.Orderbook.data,
		...state.Orders,
		trades: state.Trades
	}
};

const mapDispatchToProps = {
	fetchTickers,
	fetchOrderBook,
	fetchHistoryOrderList,
	fetchActiveOrderList,
	processApiError,
	fetchTrades
};

class Dashboard extends React.Component {
	fetchOrders = () => {
		this.props.fetchHistoryOrderList();
		this.props.fetchActiveOrderList();
	}
	fetchData = () => {
		const { match } = this.props;
		const { pair } = match.params;
 		const { web3 } = window;
		this.props.fetchTickers().then((tickers) => {
			if(tickers){
				const ticker = tickers[pair];
				if(ticker){
					this.props.fetchOrderBook(ticker.id);	
				}
			}
		});
		this.fetchOrders();	
		this.props.fetchTrades();
	}
	fetchDataTick = () => {
		let interval = 15 * 1000;
		let _that = this;
		_that.fetchData();
		this.timerId = setTimeout(function tick() {
			_that.fetchData();
			_that.timerId = setTimeout(tick, interval);
		}, interval);
	}
	componentDidMount(){
		this.fetchDataTick();
	}
	componentDidUpdate(prevProps){
		if(prevProps.match.params.pair !== this.props.match.params.pair){
			clearInterval(this.timerId);
			this.fetchDataTick();
		}
	}
	onChangeAccount = () => {
		clearInterval(this.timerId);
		this.fetchDataTick();
	}
	render(){
		const { match, tickers, orderBook, activeOrders, orders, processApiError, trades } = this.props;
		const { pair } = match.params;
		const ticker = tickers[pair] || {};
		const lastPrice = ticker.lastPrice || 0;
		return (
		    <Web3Provider onChangeAccount={this.onChangeAccount}>
		    	<Header />
				<div className="dashboard">
					<Row>
						<Col md={18} sm={24} xs={24}>
							<Row>
								<Col xs={24}>
									<Card>
										<SymbolInfo ticker={ticker} />
									</Card>
								</Col>
								<Col md={8} sm={24} xs={24}>
									<Orderbook
										orderBook={orderBook}
										lastPrice={lastPrice}
									/>
								</Col>
								<Col md={16} sm={24} xs={24}>
									<Card fullHeight>
										<OrderAction
											ticker={ticker}
											lastPrice={lastPrice}
											fetchOrders={this.fetchOrders}
										/>
									</Card>
								</Col>
							</Row>
						</Col>
						<Col md={6} sm={24} xs={24}>
							<Card flat>
								<SymbolList tickers={tickers} ticker={ticker} />
							</Card>
							<Card flat>
								<TradeLog {...trades} />
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={24} sm={24} xs={24}>
							<Card>
								<ActiveOrdersList
									{...activeOrders}
									tickers={tickers}
									ticker={ticker}
									processApiError={processApiError}
								/>	
							</Card>
							<Card>
								<HistoryOrdersList {...orders} tickers={tickers} ticker={ticker}/>
							</Card>
						</Col>
					</Row>
				</div>
				<Footer />
			</Web3Provider>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));