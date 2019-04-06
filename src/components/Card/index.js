import React from 'react';

import classNames from '../../utils/classNames';

import './Card.css';

const Card = ({children, fullHeight, ...props}) => {
	return (
		<div className={classNames("card", {"card--full-height": fullHeight})}>
			{children}
		</div>
	)
}

export default Card;