import {
  getRecommendations,
  getBookByCover,
  getBookBySearch,
  viewBookDetails,
} from '../../ApiClientService/Book';

import {AppDispatch} from '../../App'

export const _getRecommendations = () => async (dispatch: AppDispatch)