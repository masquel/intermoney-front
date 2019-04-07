import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Row, Col } from '../../components/Grid';
import Card from '../../components/Card';

import { fetchTickers } from '../../reducers/Tickers';
import { fetchOrderBook } from '../../reducers/Orderbook';
import { fetchHistoryOrderList, fetchActiveOrderList } from '../../reducers/Orders';

import SymbolInfo from '../../components/SymbolInfo';
import SymbolList from '../../components/SymbolList';
import Orderbook from '../../components/Orderbook';
import OrderAction from '../../components/OrderAction';
import ActiveOrdersList from '../../components/ActiveOrderList';
import HistoryOrdersList from '../../components/HistoryOrderList';


import './Dashboard.css';


const mapStateToProps = (state) => {
	return {
		tickers: state.Tickers.tickers,
		orderBook: state.Orderbook.data
	}
};

const mapDispatchToProps = {
	fetchTickers,
	fetchOrderBook,
	fetchHistoryOrderList
};

class Dashboard extends React.Component {
	fetchData = () => {
		const { match } = this.props;
		const { pair } = match.params;
 		const { web3 } = window;
		if(web3){
			const { accounts } = web3.eth;
			this.props.fetchTickers(accounts[0]);
		}
		//this.props.fetchOrderBook(pair);
	}
	componentDidMount(){
		this.fetchData();
	}
	componentDidUpdate(prevProps){
		if(prevProps.match.params.pair !== this.props.match.params.pair){
			this.fetchData();
		}
	}
	render(){
		const { match, tickers, orderBook } = this.props;
		const { pair } = match.params;
		const ticker = tickers[pair] || {};
		const lastPrice = ticker.lastPrice || 0;
		return (
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
									/>
								</Card>
							</Col>
						</Row>
					</Col>
					<Col md={6} sm={24} xs={24}>
						<Card fullHeight flat>
							<SymbolList tickers={tickers} ticker={ticker} />
						</Card>
					</Col>
				</Row>
				<Row>
					<Col md={24} sm={24} xs={24}>
						<Card>
							<ActiveOrdersList />	
						</Card>
						<Card>
							<HistoryOrdersList />
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));