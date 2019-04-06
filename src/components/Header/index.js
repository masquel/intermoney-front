import React from 'react';

import classNames from '../../utils/classNames';

import './Header.css';

const Leafs = ({children}) => {
	return (
		<div className="hackathon-leafs">
			{children}
		</div>
	)
}

const Leaf = ({index}) => {
	return (
		<div 
			className={classNames("hackathon-leaf", {
				["hackathon-leaf--" + index]: index
			})} 
		/>
	);
};

class Header extends React.Component {
	render(){
		return (
			<header className="header">
				<a href="http://hackathon.dsxt.uk" className="header__hackathon-link" target="_blank">
					<img
						src="https://static.tildacdn.com/tild3037-6531-4436-a337-616534373064/dsxt-logo-small.svg"
						className="header__hackathon-logo"
						alt=""
					/>
				</a>
				<Leafs>
					<Leaf index={1} />
					<Leaf index={2} />
					<Leaf index={3} />
					<Leaf index={4} />
					<Leaf index={5} />
					<Leaf index={6} />
				</Leafs>
			</header>
		)
	}
}

export default Header;