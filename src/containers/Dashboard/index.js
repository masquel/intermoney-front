import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Row, Col } from '../../components/Grid';
import Card from '../../components/Card';

import { fetchTickers } from '../../reducers/Tickers'; 

import SymbolInfo from '../../components/SymbolInfo';
import SymbolList from '../../components/SymbolList';
import Orderbook from '../../components/Orderbook';
import OrderAction from '../../components/OrderAction';
import ActiveOrdersList from '../../components/ActiveOrderList';
import HistoryOrdersList from '../../components/HistoryOrderList';


import './Dashboard.css';


const mapStateToProps = (state) => {
	return {
		tickers: state.Tickers.tickers
	}
};

const mapDispatchToProps = {
	fetchTickers
};

class Dashboard extends React.Component {
	fetchData = () => {
		const { web3 } = window;
		if(web3){
			const { accounts } = web3.eth;
			this.props.fetchTickers(accounts[0]);
		}
	}
	componentDidMount(){
		this.fetchData();
	}
	render(){
		console.log(this.props);
		return (
			<div className="dashboard">
				<Row>
					<Col md={18} sm={24} xs={24}>
						<Row>
							<Col xs={24}>
								<Card>
									<SymbolInfo />
								</Card>
							</Col>
							<Col md={8} sm={24} xs={24}>
								<Orderbook />
							</Col>
							<Col md={16} sm={24} xs={24}>
								<Card fullHeight>
									<OrderAction />
								</Card>
							</Col>
						</Row>
					</Col>
					<Col md={6} sm={24} xs={24}>
						<Card fullHeight>
							<SymbolList />
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