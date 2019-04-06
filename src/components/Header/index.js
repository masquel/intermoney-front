import React from 'react';

import './Header.css';

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
			</header>
		)
	}
}

export default Header;