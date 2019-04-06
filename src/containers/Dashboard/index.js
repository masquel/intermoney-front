import React from 'react';

import { Row, Col } from '../../components/Grid';
import Card from '../../components/Card';

import SymbolInfo from '../../components/SymbolInfo';
import Orderbook from '../../components/Orderbook';
import OrderAction from '../../components/OrderAction';
import ActiveOrdersList from '../../components/ActiveOrderList';
import HistoryOrdersList from '../../components/HistoryOrderList';


import './Dashboard.css';

class Dashboard extends React.Component {
	render(){
		return (
			<div className="dashboard">
				<Row>
					<Col md={24} sm={24} xs={24}>
						<Card>
							<SymbolInfo />
						</Card>
					</Col>
				</Row>
				<Row>
					<Col md={6} sm={24} xs={24}>
						<Orderbook />
					</Col>
					<Col md={12} sm={24} xs={24}>
						<Card>
							<OrderAction />
						</Card>
					</Col>
					<Col md={6} sm={24} xs={24}>
						<Card fullHeight>
							
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

export default Dashboard;