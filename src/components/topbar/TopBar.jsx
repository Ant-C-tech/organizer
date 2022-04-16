import './topbar.css';

import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { BigHead } from '@bigheads/core';

import { Link } from '../Common/link/Link';

export const TopBar = () => {
	return (
		<div className='topbar-container'>
			<div className='topbar-left'>
				<span className='logo'>React Social</span>
			</div>
			<div className='topbar-center'>
				<div className='search-bar'>
					<Search />
					<input type='text' className='search-input' placeholder='Happy hacking...' />
				</div>
			</div>
			<div className='topbar-right'>
				<div className='topbar-links'>
					<Link text='Home Page' />
					<Link text='Time Line' />
				</div>
				<div className='topbar-icons'>
					<div className='topbar-icon'>
						<Person />
						<span className='topbar-icon-badge'>1</span>
					</div>
					<div className='topbar-icon'>
						<Chat />
						<span className='topbar-icon-badge'>2</span>
					</div>
					<div className='topbar-icon'>
						<Notifications />
						<span className='topbar-icon-badge'>1</span>
						<div className='profile-image-container'>
							<BigHead />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
