import './topbar.css';

import { Person, Chat, Notifications } from '@material-ui/icons';
import { BigHead } from '@bigheads/core';

import { CustomLink } from '../common/customLink/CustomLink';
import { SearchBar } from '../common/searchbar/SearchBar';

const topBarLinks = [{ text: 'Home Page', path: 'homePage' }, { text: 'Time Line', path: 'timeLine' }];
const topBarIconLinks = [
	{ icon: Person, path: 'person', messageCounter: '1' },
	{ icon: Chat, path: 'chat', messageCounter: '2' },
	{ icon: Notifications, path: 'notifications', messageCounter: '6' },
];

export const TopBar = () => {
	return (
		<header className='topbar container-flex'>
			<div className='topbar-left'>
				<CustomLink content='OrganiZeR' href='homePage' target='_self' modification='logo hover-underline' active='' />
			</div>
			<div className='topbar-center'>
				<div className='topbar-links'>
					{topBarLinks.map((link, index) => (
						<CustomLink key={index} content={link.text} href={link.path} target='_self' modification='hover-underline' active='' />
					))}
				</div>
				<div className='topbar-icons'>
					{topBarIconLinks.map((iconLink, index) => {
						const Icon = iconLink['icon'];
						return (
							<CustomLink
								key={index}
								content={<><Icon /><span className='icon-badge'>{iconLink.messageCounter}</span></>}
								href={iconLink.path}
								target='_self'
								modification='hover-left-line'
								active=''
							/>
						);
					})}
					<CustomLink
						content={<BigHead className='profile-image' />}
						href='profile'
						target='_self'
						modification='hover-left-line'
					/>
				</div>
			</div>
			<div className='topbar-right'>
				<SearchBar />
			</div>
		</header>
	);
};
