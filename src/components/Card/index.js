import React from 'react';

import classNames from '../../utils/classNames';

import './Card.css';

const Card = ({children, flat, fullHeight, ...props}) => {
	return (
		<div className={classNames("card", {"card--full-height": fullHeight, "card--flat": flat})}>
			{children}
		</div>
	)
}

export default Card;