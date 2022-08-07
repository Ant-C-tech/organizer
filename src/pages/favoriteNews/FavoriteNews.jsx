import { useState, useEffect } from 'react'

import { useLocalStorage } from '../../hooks/useLocalStorage';

import { ControlBar } from '../../components/sections/controlbar/ControlBar';
import { NewsControls } from '../../components/common/newsControls/NewsControls';
import { NoFavoriteNewsMessage } from './noFavoriteNewsMessage/NoFavoriteNewsMessage';
import { NewsFeed } from '../../components/common/newsFeed/NewsFeed';
import { NothingWasFoundMessage } from '../../components/common/nothingWasFoundMessage/NothingWasFoundMessage';

import { getCountriesAvailableForFilterFavoriteNews } from './utils/getCountriesAvailableForFilterFavoriteNews';
import { getNewsSortByDate } from './utils/getNewsSortByDate';
import { getCategoriesAvailableForFilterFavoriteNews } from './utils/getCategoriesAvailableForFilterFavoriteNews';
import { getCategoriesObject } from './utils/getCategoriesObject';
import { getNewsFilteredByCountry } from './utils/getNewsFilteredByCountry';
import { getNewsFilteredByCategory } from './utils/getNewsFilteredByCategory';


export const FavoriteNews = () => {
  const [favoriteNews, setFavoriteNews] = useLocalStorage('favoriteNews', [])
  const [news, setNews] = useState([])
  // const [newsRemovedFromFavorite, setNewsRemovedFromFavorite] = useState(false)

  const [startNews, setStartNews] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [needMoreNews, setNeedMoreNews] = useState(false)
  const [hasMoreNews, setHasMoreNews] = useState(true)
  const [needScroll, setNeedScroll] = useState(false)

  const [selectedCountries, setSelectedCountries] = useState(['all']);
  const [countriesAvailableForFilterFavoriteNews, setCountriesAvailableForFilterFavoriteNews] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [categoriesAvailableForFilterFavoriteNews, setCategoriesAvailableForFilterFavoriteNews] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState(['all']);
  const [keyword, setKeyword] = useState('')

  const newsForPage = 10

  const minParametersLength = 1
  const maxParametersLength = 5

  // Manage scroll
  useEffect(() => {
    setNeedScroll(true)
    setStartNews(0)
    setCurrentPage(1)
    setNeedMoreNews(false)
  }, [selectedCountries, selectedCategories])

  // Manage of News Controls
  useEffect(() => {
    setCountriesAvailableForFilterFavoriteNews(
      getCountriesAvailableForFilterFavoriteNews(favoriteNews, selectedCategories)
    )
    setCategoriesAvailableForFilterFavoriteNews(
      getCategoriesAvailableForFilterFavoriteNews(favoriteNews, selectedCountries)
    )
  }, [favoriteNews, selectedCategories, selectedCountries])

  // Filtering news
  useEffect(() => {
    const newsFilteredByCountry = selectedCountries[0] === 'all' ?
      favoriteNews :
      getNewsFilteredByCountry(favoriteNews, selectedCountries)

    const newsFilteredByCategory = selectedCategories[0] === 'all' ?
      newsFilteredByCountry :
      getNewsFilteredByCategory(newsFilteredByCountry, selectedCategories)

    const newsSortedByDate = getNewsSortByDate(newsFilteredByCategory)

    const newsFilteredByPage = [...newsSortedByDate.filter(
      (_currentNewsFilteredByCountry, index) => index < currentPage * newsForPage)
    ]
    setNews(newsFilteredByPage)

    if (newsFilteredByPage.length < newsFilteredByCategory.length) {
      setHasMoreNews(true)
    } else {
      setHasMoreNews(false)
    }
  }, [favoriteNews, currentPage, selectedCountries, selectedCategories])

  // Manage of News Controls
  useEffect(() => {
    if (countriesAvailableForFilterFavoriteNews.length > 0 &&
      selectedCountries.filter(
        (country) => !countriesAvailableForFilterFavoriteNews.includes(country)).length > 0
    ) {
      setSelectedCountries(
        selectedCountries.filter(
          (country) => countriesAvailableForFilterFavoriteNews.includes(country)
        ).length > 0 ?
          selectedCountries.filter(
            (country) => countriesAvailableForFilterFavoriteNews.includes(country)
          ) : ['all']
      )
    }

    if (categoriesAvailableForFilterFavoriteNews.length > 0 &&
      selectedCategories.filter(
        (category) => !categoriesAvailableForFilterFavoriteNews.includes(category)
      ).length > 0
    ) {
      setSelectedCategories(
        selectedCategories.filter(
          (category) => categoriesAvailableForFilterFavoriteNews.includes(category)
        ).length > 0 ?
          selectedCategories.filter(
            (category) => categoriesAvailableForFilterFavoriteNews.includes(category)
          ) : ['all']
      )
    }
  }, [
    countriesAvailableForFilterFavoriteNews,
    categoriesAvailableForFilterFavoriteNews,
    selectedCountries,
    selectedCategories])

  // Get more news
  useEffect(() => {
    if (needMoreNews && hasMoreNews) {
      setCurrentPage(page => page + 1)
      setNeedMoreNews(false)
    }
  }, [needMoreNews, hasMoreNews, favoriteNews]);

  return (
    <>
      <section className='content-container'>
        {<NewsFeed
          newsSet={news}
          favoriteNews={favoriteNews}
          setFavoriteNews={setFavoriteNews}
          keywords={['']}
          startNews={startNews}
          loading={false}
          setNeedMoreNews={setNeedMoreNews}
          needScroll={needScroll}
          setNeedScroll={setNeedScroll}
          // setNewsRemovedFromFavorite={setNewsRemovedFromFavorite}
          message={favoriteNews.length === 0 ?
            <NoFavoriteNewsMessage /> : news.length === 0 ?
              <NothingWasFoundMessage /> : null}
        />
        }
      </section>
      <ControlBar
        content={favoriteNews.length > 0 &&
          <NewsControls
            news={news}
            error={''}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            keyword={keyword}
            setKeyword={setKeyword}
            loading={false}
            countriesAvailableForFilterNews={countriesAvailableForFilterFavoriteNews}
            minCountriesAvailableForFilterNews={minParametersLength}
            maxCountriesAvailableForFilterNews={
              countriesAvailableForFilterFavoriteNews.length - 1 > maxParametersLength ? maxParametersLength :
                countriesAvailableForFilterFavoriteNews.length - 1
            }
            categoriesAvailableForFilterNews={getCategoriesObject(categoriesAvailableForFilterFavoriteNews)}
            minCategoriesAvailableForFilterNews={minParametersLength}
            maxCategoriesAvailableForFilterNews={
              categoriesAvailableForFilterFavoriteNews.length - 1 > maxParametersLength ? maxParametersLength :
                categoriesAvailableForFilterFavoriteNews.length - 1
            }
          />
        } />
    </>
  )
};
