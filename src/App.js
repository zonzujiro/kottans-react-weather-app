import React from 'react';

import { connect } from 'react-redux';

import {
  getForecast,
  midnightWeatherForecastSelector,
} from './modules/forecast';

import { getMidnightWeather } from './utils';

import LocationSearch from './components/LocationSearch';
import WeekForecast from './components/WeekForecast';

const mapStateToProps = state => ({
  todayForecast: state.forecast.todayForecast,
  // weekForecast: getMidnightWeather(state.forecast.weekForecast),
  weekForecast: midnightWeatherForecastSelector(state),
});

const mapDispatchToProps = {
  getForecast,
};

class App extends React.Component {
  state = {
    inputValue: 'Paris',
  };

  componentDidMount() {
    this.props.getForecast(this.state.inputValue);
  }

  handleSearchSubmit = city => {
    this.props.getForecast(city);
  };

  render() {
    const { inputValue } = this.state;
    const { weekForecast } = this.props;

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
