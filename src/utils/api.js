const API_KEY = 'b39e7c93dbcfd0616fb93c016306877e';
const BASE_URL = `http://api.openweathermap.org/data/2.5`;

const get = url => {
  return fetch(`${BASE_URL}${url}&APPID=${API_KEY}`).then(res => {
    if (!res.ok) {
      throw new Error(res);
    }

    return res.json();
  });
};

const getTodayForecast = query => get(`/weather${query}`);
const getWeekForecast = query => get(`/forecast${query}`);

export const getForecast = city =>
  Promise.all([getTodayForecast(`?q=${city}`), getWeekForecast(`?q=${city}`)]);

export const getGeoForecast = (lat, lon) => {
  return Promise.all([
    getTodayForecast(`?lat=${lat}&lon=${lon}`),
    getWeekForecast(`?lat=${lat}&lon=${lon}`),
  ]);
};

// export const getTodayForecast = city => Promise.resolve(JSON.parse(today));
// export const getWeekForecast = city => Promise.resolve(JSON.parse(week));
