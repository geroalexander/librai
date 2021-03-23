import { getRecommendations } from '../../ApiClientService/Book';
import { SET_RECOMMENDATIONS } from './ActionTypes';

import { AppDispatch } from '../../App';

const accessToken: string | null = localStorage.getItem('accessToken');

export const _getRecommendations = () => async (dispatch: AppDispatch) => {
  let data;
  if (accessToken) data = await getRecommendations(accessToken);
  if (data)
    dispatch({ type: SET_RECOMMENDATIONS, payload: data.recommendations });
};
