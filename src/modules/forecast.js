import * as api from '../utils/api';
import { getMidnightWeather, createReducer } from '../utils';

const FORECAST_LOADING = 'FORECAST_LOADING';
const FORECAST_ERROR = 'FORECAST_ERROR';
const FORECAST_SUCCESS = 'FORECAST_SUCCESS';

const initState = {
  hasError: false,
  error: null,
  todayForecast: null,
  isLoading: false,
  weekForecast: [],
};

const forecastLoading = () => ({
  type: FORECAST_LOADING,
});

const forecastError = error => ({
  type: FORECAST_ERROR,
  payload: { error },
});

const forecastSuccess = payload => ({
  type: FORECAST_SUCCESS,
  payload,
});

export const forecast = createReducer(initState, {
  [FORECAST_LOADING]: () => ({
    isLoading: true,
  }),

  [FORECAST_ERROR]: (state, error) => ({
    isLoading: false,
    hasError: true,
    error,
  }),

  [FORECAST_SUCCESS]: (state, payload) => ({
    ...payload,
    isLoading: false,
  }),
});

export const getForecast = city => async (dispatch, getState) => {
  dispatch(forecastLoading());

  try {
    const [todayForecast, weekForecast] = await api.getForecast(city);
    //TODO: Show error in getMidnightWeather - remove .list
    dispatch(
      forecastSuccess({
        todayForecast,
        weekForecast: getMidnightWeather(weekForecast.list),
      })
    );
  } catch (e) {
    // console.log(e);
    forecastError(e);
  }
};
