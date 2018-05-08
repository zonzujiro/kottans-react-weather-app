import * as api from '../utils/api';
import { getMidnightWeather } from '../utils';

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

const forecastSuccess = payload => {
  console.log(payload);
  return {
    type: FORECAST_SUCCESS,
    payload,
  };
};

export const forecast = (state = initState, action) => {
  switch (action.type) {
    case FORECAST_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case FORECAST_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };

    case FORECAST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

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
