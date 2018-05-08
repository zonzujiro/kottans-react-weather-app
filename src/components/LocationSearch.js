import React from 'react';

class LocationSearch extends React.Component {
  state = {
    isValid: true,
    value: this.props.inputValue,
  };

  isValidCityName(name) {
    return !!name && !/\d/.test(name);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.inputValue !== prevState.value
      ? {
          value: nextProps.inputValue,
        }
      : null;
  }

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  onSubmit = ev => {
    ev.preventDefault();

    const city = ev.target.elements.city.value.trim();

    if (this.isValidCityName(city)) {
      this.props.onSubmit(city);

      if (!this.state.isValid) {
        this.updateState({ isValid: true });
      }
    } else {
      this.updateState({ isValid: false });
    }
  };

  render() {
    const { isValid, value } = this.state;

    return (
      <form
        className={
          !isValid ? '"location-search -invalid"' : '"location-search"'
        }
        onSubmit={this.onSubmit}
      >
        <input
          required
          name="city"
          type="text"
          placeholder="City name"
          className="location-search-input"
          value={value}
          onChange={this.handleChange}
        />
        <button className="location-search-submit">Find</button>
      </form>
    );
  }
}

export default LocationSearch;
