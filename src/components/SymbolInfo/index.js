import React from 'react';

import { Row, Col } from '../Grid';

import './SymbolInfo.css';


class SymbolInfo extends React.Component {
	render(){
		const { ticker } = this.props; 
		return (
			<div className="symbol-info">
				<Row gutter={0}>
					<Col md={5} sm={24} xs={24}>
						<span className="symbol-info__lead-currency">{ticker.base_currency_display}</span>/{ticker.quote_currency_display}
					</Col>
					<Col md={3} sm={24} xs={24}>
						<div className="symbol-info__item">
							<div className="symbol-info__item-label">Last price</div>
							<div className="symbol-info__item-value">{ticker.last_price || "—"}</div>
						</div>
					</Col>
					<Col md={3} sm={24} xs={24}>
						<div className="symbol-info__item">
							<div className="symbol-info__item-label">24 Change</div>
							<div className="symbol-info__item-value">{ticker.change_24 || "—"}</div>
						</div>
					</Col>
					<Col md={3} sm={24} xs={24}>
						<div className="symbol-info__item">
							<div className="symbol-info__item-label">24 High</div>
							<div className="symbol-info__item-value">{ticker.max_24_price || "—"}</div>
						</div>
					</Col>
					<Col md={3} sm={24} xs={24}>
						<div className="symbol-info__item">
							<div className="symbol-info__item-label">24 Low</div>
							<div className="symbol-info__item-value">{ticker.min_24_price || "—"}</div>
						</div>
					</Col>
					<Col md={3} sm={24} xs={24}>
						<div className="symbol-info__item">
							<div className="symbol-info__item-label">24 Volume</div>
							<div className="symbol-info__item-value">{ticker.volume_24 || "—"}</div>
						</div>
					</Col>
				</Row>
			</div>
		)
	}
}

SymbolInfo.defaultProps = {
	symbol: '',
	instrumentObject: {},
	tickers: {}
}

export default SymbolInfo;