import { DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS } from '@constants';

export const getLanguagesObject = (languagesAvailableForFilterFavoriteNews) => {
  const languagesObject = {};

  languagesAvailableForFilterFavoriteNews.forEach((language) => {
    languagesObject[language] =
      DEFAULT_LANGUAGES_AVAILABLE_FOR_FILTERING_NEWS[language];
  });

  return languagesObject;
};
