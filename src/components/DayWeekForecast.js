import React from 'react';

const DayWeekForecast = ({ main }) => {
  const { temp, humidity, pressure } = main;

  return (
    <div className="forecast">
      <h3 className="temperature">{temp} F</h3>
      <p className="humidity">humidity: {humidity}</p>
      <p className="pressure">pressure: {pressure}</p>
    </div>
  );
};

export default DayWeekForecast;
