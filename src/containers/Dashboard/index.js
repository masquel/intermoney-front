import React from 'react';

import { Row, Col } from '../../components/Grid';
import Card from '../../components/Card';

import Orderbook from '../../components/Orderbook';
import OrderAction from '../../components/OrderAction';


import './Dashboard.css';

class Dashboard extends React.Component {
	render(){
		return (
			<div className="dashboard">
				<Row>
					<Col md={10} sm={24} xs={24}>
						<Card>
							<Orderbook />	
						</Card>
					</Col>
					<Col md={14} sm={24} xs={24}>
						<Card>
							Graph	
						</Card>
						<Card>
							<OrderAction />
						</Card>
					</Col>
				</Row>
				<Row>
					<Col md={25} sm={24} xs={24}>
						<Card>
							Orders	
						</Card>
					</Col>
				</Row>
			</div>
		)
	}
}

export default Dashboard;