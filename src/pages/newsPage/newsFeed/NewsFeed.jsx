import './newsFeed.css';

import { useEffect } from 'react'
import uuid from 'react-uuid'
import { SkeletonTheme } from 'react-loading-skeleton'

import { useScrollTo } from '../hooks/useScrollTo';

import { News } from './news/News';
import { Message } from '../../../components/common/message/Message';
import { NewsSkeleton } from './newsSkeleton/NewsSkeleton';

export const NewsFeed = ({ newsSet, lastNewsRef, focusNewsIndex, loading }) => {
	const [targetScrollRef, scrollToRef] = useScrollTo()

	useEffect(() => {
		scrollToRef()
	}, [scrollToRef])

	return (
		<section className='news-feed' >
			{loading ?
				<SkeletonTheme baseColor="#dce2e4" highlightColor="#96a9af">
					<NewsSkeleton skeletons={3} />
				</SkeletonTheme>
				: newsSet.length > 0 ? <ul className='news-list' >
					{newsSet.map((news, index) => {
						return <li
							key={uuid()}
							className='news-list-item'
							ref={index === newsSet.length - 1 ? lastNewsRef : index === focusNewsIndex - 2 ? targetScrollRef : null}>
							<News
								categories={news.category}
								countries={news.country}
								title={news.title}
								image={news.image_url}
								text={news.description}
								pubDate={news.pubDate}
								creators={news.creator}
								link={news.link}
								video={news.video_url}
								language={news.language}
							/>
						</li>
					})}
				</ul> : <Message type={'info'} title={'Nothing was found according to your request.'}>
					<p>Try to change your search parameters.</p>
					<p>Happy news!</p>
				</Message>
			}
		</section>
	);
};
