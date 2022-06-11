import './newsPage.css';

import { useState, useEffect, useRef, useCallback } from 'react'

import { getNews } from '../../businessLogic/news/getNews';

import { RightBar } from '../rightbar/RightBar';
import { NewsFeed } from './newsFeed/NewsFeed';
import { NewsControl } from './newsControl/NewsControl';

const defaultCountry = 'US';

export const NewsPage = () => {
	const [apiKey, setApiKey] = useState('')

	const [nextPage, setNextPage] = useState(0)
	const [totalResults, setTotalResults] = useState(0)
	const [needMoreNews, setNeedMoreNews] = useState(false)
	const [hasMoreNews, setHasMoreNews] = useState(true)

	const [selectedCountries, setSelectedCountries] = useState([defaultCountry]);

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const [news, setNews] = useState([])


	//Avoid multiple requests for
	const [requestCounter, setRequestCounter] = useState(0)

	useEffect(() => {
		setError('')
		setNextPage(0)
	}, [apiKey, selectedCountries])

	const newsFeedRef = useRef(null)
	useEffect(() => {
		newsFeedRef.current && newsFeedRef.current.scrollIntoView({ block: "start" });
	}, [selectedCountries])

	useEffect(() => {
		if (news.length < totalResults) {
			setHasMoreNews(true)
		} else {
			setHasMoreNews(false)
		}
	}, [news, totalResults]);

	useEffect(() => {
		const getDefaultNews = async () => {
			try {
				setLoading(true)
				const response = await getNews(apiKey, selectedCountries, 0)
				if (response) {
					//Avoid multiple requests for
					setRequestCounter(requestCounter => requestCounter + 1)

					setNews(response.data.results)

					setNextPage(response.data.nextPage)
					setTotalResults(response.data.totalResults)
				}
				setLoading(false)
			} catch (error) {
				setError(error.message)
			}
		}

		apiKey && getDefaultNews()
	}, [apiKey, selectedCountries]);

	useEffect(() => {
		const getMoreNews = async () => {
			setNeedMoreNews(false)
			try {
				setLoading(true)
				const response = await getNews(apiKey, selectedCountries, nextPage)
				if (response) {
					//Avoid multiple requests for
					setRequestCounter(requestCounter => requestCounter + 1)

					setNextPage(response.data.nextPage)
					setTotalResults(response.data.totalResults)

					setNews((news) => { return [...new Set([...news, ...response.data.results])] })
				}
				setLoading(false)

			} catch (error) {
				setError(error.message)
			}
		}

		if (needMoreNews && hasMoreNews) {
			getMoreNews()
		}
	}, [apiKey, selectedCountries, nextPage, needMoreNews, hasMoreNews])

	// In develop purpose
	useEffect(() => {
		if (news.length > 0) {
			console.log(news);
		}
	}, [news]);

	//Avoid multiple requests for
	useEffect(() => {
		if (requestCounter > 5) {
			setApiKey('')
			console.log('Multiple Request Happened!');
		}
	}, [requestCounter])
	// End of In develop purpose

	const observer = useRef()
	const lastNewsRef = useCallback(node => {
		if (loading) return
		if (observer.current) observer.current.disconnect()
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setNeedMoreNews(true);
			};
		})
		if (node) observer.current.observe(node)
	}, [loading])

	return (<>
		<section className='content-container'>
			<NewsFeed newsSet={news} apiKey={apiKey} setApiKey={setApiKey} lastNewsRef={lastNewsRef} newsFeedRef={newsFeedRef} />
		</section>
		<RightBar content={(news.length > 0 || error) && <NewsControl news={news} error={error} selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} />} />
	</>)
};
