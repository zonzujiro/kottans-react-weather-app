import React from 'react';

import { getForecast, getGeoForecast } from './utils/api';
import { bindAll, getMidnightWeather, getCoordinates } from './utils';

import LocationSearch from './components/LocationSearch';
// import TodayForecast from './components/TodayForecast';
import WeekForecast from './components/WeekForecast';

class App extends React.Component {
  state = {
    inputValue: 'Paris',
    hasError: false,
    todayForecast: null,
    weekForecast: [],
  };

  // componentDidMount() {
  //   this.getCityForecast(this.state.inputValue).then(state => {
  //     this.setState(state);
  //   });
  // }

  handleSearchSubmit = city => {
    this.getCityForecast(city).then(state => {
      this.setState(state);
    });
  };

  getCityForecast(city) {
    return getForecast(city)
      .then(this.computeNextState)
      .catch(this.handleError);
  }

  render() {
    const { weekForecast, inputValue } = this.state;

    console.trace();

    return (
      <div className="weather-application">
        <h1>Weather Application</h1>
        <LocationSearch
          inputValue={inputValue}
          onSubmit={this.handleSearchSubmit}
        />
        <WeekForecast forecast={weekForecast} />
      </div>
    );
  }
}

export default App;
