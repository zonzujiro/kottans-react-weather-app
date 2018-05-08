import React from 'react';

import { connect } from 'react-redux';

import { getForecast } from './modules/forecast';

import LocationSearch from './components/LocationSearch';
// import TodayForecast from './components/TodayForecast';
import WeekForecast from './components/WeekForecast';

const mapStateToProps = state => ({
  todayForecast: state.forecast.todayForecast,
  weekForecast: state.forecast.weekForecast,
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
