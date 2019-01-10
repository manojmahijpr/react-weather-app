import React, { Component } from 'react';

//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';




class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };

  getWeather = async (e) => {

    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    //const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const apiKey = '5b74970fe90df513fae5a38d33db56cf';

    const weather_api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`);
    //console.log(weather_api_call)
      const weather_json_data = await weather_api_call.json();
      if (city && country) {
        this.setState({
          temperature: weather_json_data.main.temp,
          city: weather_json_data.name,
          country: weather_json_data.sys.country,
          humidity: weather_json_data.main.humidity,
          description: weather_json_data.weather[0].description,
          error: ""
        });
      } 
      else {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "Please enter the values."
        });
    
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                    <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather 
                    temperature = {this.state.temperature}
                    city = {this.state.city}
                    country = {this.state.country}
                    humidity = {this.state.humidity}
                    description = {this.state.description}
                    error = {this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
