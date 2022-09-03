import './newsFeed.css';

import { useEffect, useRef } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint';

import { NewsCard } from './newsCard/NewsCard';
import { NewsCardSkeleton } from './newsCardSkeleton/NewsCardSkeleton';

import { getIsFavorite } from './utils/getIsFavorite';
import { addToFavorite } from './utils/addToFavorite';
import { removeFromFavorite } from './utils/removeFromFavorite';

export const NewsFeed = ({
	newsSet,
	favoriteNews,
	setFavoriteNews,
	keywords,
	startNews,
	loading,
	setNeedMoreNews,
	needScroll,
	setNeedScroll,
	message}) => {
	const currentRef = useRef(null)

	useEffect(() => {
		if (needScroll) {
			currentRef.current && currentRef.current.scrollIntoView({ block: "start" })
			setNeedScroll(false)
		}
	}, [needScroll, setNeedScroll])

	return (
		<section className='news-feed' >
			{loading ?
				<SkeletonTheme baseColor="#dce2e4" highlightColor="#b2c0c4">
					<NewsCardSkeleton skeletons={2} />
				</SkeletonTheme>
				: message ? message :
					<ul className='news-list' >
						{newsSet.map((news, index) =>
							<li
								className={`news-list-item`}
								key={index}
								ref={index === startNews ? currentRef : null}>
								<NewsCard
									news={news}
									keywords={keywords}
									isFavorite={getIsFavorite(favoriteNews, news.link)}
									addToFavorite={() => {
										addToFavorite(favoriteNews, setFavoriteNews, news)
									}}
									removeFromFavorite={() => {
										removeFromFavorite(favoriteNews, setFavoriteNews, news)
									}}
								/>
								{index === newsSet.length - 1
									&& <Waypoint
										onEnter={() => {
											setNeedMoreNews(true)
										}}
									/>}
							</li>
						)}
					</ul>
			}
		</section >
	);
};