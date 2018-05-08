const MIDNIGHT_HOURS = '00:00:00';

export const noop = () => {};

export const getCoordinates = (resolve, reject) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve);
  });
};

export const getMidnightWeather = list => {
  return list.filter(({ dt_txt: date }) => date.includes(MIDNIGHT_HOURS));
};
