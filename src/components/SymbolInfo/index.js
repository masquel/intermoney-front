import React from 'react';

import { Row, Col } from '../Grid';

import './SymbolInfo.css';


class SymbolInfo extends React.Component {
	render(){
		const { symbol, instrumentObject, tickers } = this.props;
		const instrument = instrumentObject[symbol] || {};
		const ticker = tickers[symbol] || {};
		return (
			<div className="symbol-info">
				<Row gutter={0}>
					<Col md={5} sm={24} xs={24}>
						<span className="symbol-info__lead-currency">{instrument.base_currency}</span>/{instrument.quote_currency}
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
							<div className="symbol-info__item-value">{ticker.change_value || "—"}</div>
						</div>
					</Col>
					<Col md={3} sm={24} xs={24}>
						<div className="symbol-info__item">
							<div className="symbol-info__item-label">24 High</div>
							<div className="symbol-info__item-value">{ticker.high || "—"}</div>
						</div>
					</Col>
					<Col md={3} sm={24} xs={24}>
						<div className="symbol-info__item">
							<div className="symbol-info__item-label">24 Low</div>
							<div className="symbol-info__item-value">{ticker.low || "—"}</div>
						</div>
					</Col>
					<Col md={3} sm={24} xs={24}>
						<div className="symbol-info__item">
							<div className="symbol-info__item-label">24 Volume</div>
							<div className="symbol-info__item-value">{ticker.volume || "—"}</div>
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