import './sidebar.css';

import {
	Announcement,
	Chat,
	VideoLibrary,
	Notes,
	Bookmark,
	WorkOutline,
	Event,
	School,
	Translate,
	FormatListNumbered,
	MusicNote
} from '@material-ui/icons';

import { BigHead } from '@bigheads/core';

import { CustomLink } from '../common/customLink/CustomLink';
import { Button } from '../common/button/Button';

const sideBarNavItems = [
	{ icon: Announcement, path: 'news', text: 'My News' },
	{ icon: FormatListNumbered, path: 'todos', text: 'My ToDo' },
	{ icon: Notes, path: 'notes', text: 'My Notes' },
	{ icon: Event, path: 'events', text: 'My Events' },
	{ icon: Translate, path: 'translation', text: 'My Translation' },
	{ icon: Bookmark, path: 'bookmarks', text: 'My Bookmarks' },
	{ icon: VideoLibrary, path: 'videos', text: 'My Videos' },
	{ icon: MusicNote, path: 'music', text: 'My Music' },
	{ icon: WorkOutline, path: 'jobs', text: 'My Jobs' },
	{ icon: School, path: 'courses', text: 'My Courses' },
	{ icon: Chat, path: 'chat', text: 'My Chats' },
];

// Mock data for friends list
const rug = require('random-username-generator');
rug.setSeperator(' ');

const getRandomNameToUpper = () => {
	const randomName = rug.generate();
	return randomName
		.split(' ')
		.map((word) => {
			return `${word[0].toUpperCase()}${word.slice(1)}`;
		})
		.join(' ');
};

const friendsCounter = 7;
const friends = [];
for (let index = 0; index < friendsCounter; index++) {
	friends.push(getRandomNameToUpper());
}
// End of Mock data for friends list

export const SideBar = () => {
	return (
		<nav className='sidebar'>
			<ul className='sidebar-nav'>
				{sideBarNavItems.map((navItem, index) => {
					const Icon = navItem['icon'];
					return (
						<li key={index} className='sidebar-nav-item'>
							<CustomLink
								content={<><Icon /><span className='link-add-text'>{navItem.text}</span></>}
								href={navItem.path}
								target='_self'
								modification='hover-left-line'
								active={index === 0 ? 'active' : ''}
							/>
						</li>
					);
				})}
			</ul>
			<hr />
			<Button text='Show More' />
			{friends.length > 0 && <ul className='sidebar-friends'>
				{friends.map((friend, index) => (
					<li key={index} className='sidebar-friend'>
						<CustomLink
							content={<><BigHead className='sidebar-friend-image' /><span className='link-add-text'>{friend}</span></>}
							href='friend-page'
							target='_self'
							modification='hover-left-line'
							text={friend}
							active=''
						/>
					</li>
				))}
			</ul>
			}
		</nav>
	);
};
