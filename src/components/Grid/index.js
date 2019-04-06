import React from 'react';
import { Row as AntRow, Col as AntCol } from 'antd';

const style = {
	row: {
		width: '100%',
		display: 'flex',
		flexFlow: 'row wrap',	
	},
	col: {
		marginBottom: '10px'
	}
	
};


export const Col = ({children, ...props}) => {
	return (
		<AntCol style={style.col} {...props}>
			{children}
		</AntCol>
	)
}

export const Row = ({children, ...props}) => {
	return (
		<AntRow style={style.row} gutter={12} justify="start" {...props}>
			{children}
		</AntRow>
	)
}