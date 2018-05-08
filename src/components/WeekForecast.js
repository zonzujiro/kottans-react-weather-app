import React, { Fragment } from 'react';

const WeekForecast = ({ forecast }) => {
  return (
    <Fragment>
      <h3>Forecast for 5 days</h3>
      <div className="week-forecast">
        {forecast.map(({ main }, index) => {
          const { temp, humidity, pressure } = main;

          return (
            <div className="forecast" key={index}>
              <h3 className="temperature">{temp} F</h3>
              <p className="humidity">humidity: {humidity}</p>
              <p className="pressure">pressure: {pressure}</p>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default WeekForecast;
