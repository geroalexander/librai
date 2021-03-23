import { getRecommendations } from '../../ApiClientService/Book';
import { SET_RECOMMENDATIONS } from './ActionTypes';

import { AppDispatch } from '../../App';

const accessToken: string = localStorage.getItem('accessToken');

export const _getRecommendations = () => async (dispatch: AppDispatch) => {
  const { data } = await getRecommendations(accessToken);
  dispatch({ type: SET_RECOMMENDATIONS, payload: data });
};
