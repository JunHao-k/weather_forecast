//import { render } from '@testing-library/react';
import axios from 'axios'
import React from 'react'
import './App.css';


class App extends React.Component{

  state = {
    api_key: 'fd7205e566330a9390744831f90972ea',
    url: "https://api.openweathermap.org/data/2.5/weather",
    city: '',
    dataObject: {},
    cityName: '----',
    weatherType: '----',
    currentTemp: '--.-°',
    minTemp: '--.-°',
    maxTemp: '--.-°'
  }
 
  searchCity =  (event) => {
    this.setState({
      city: event.target.value,
    })
  }

  getweatherData = async () => {
    let endpoint =  `${this.state.url}?q=${this.state.city}&appid=${this.state.api_key}&units=imperial`
    let response = await axios.get(endpoint)
    console.log(response)

    let data = response.data;
    console.log(data)

    this.setState({
      dataObject: data
    })
    
    console.log(this.state.dataObject)

    this.fillData();
  }

  toCelsius = (temp) => {
    let ans = (temp - 32)*(5/9);
    let final_ans = ans.toFixed(1);
  return final_ans
  }
  
  fillData = () => {

    let celsiusCurrent = this.toCelsius(this.state.dataObject.main.temp)
    let celsiusMin = this.toCelsius(this.state.dataObject.main.temp_min)
    let celsiusMax = this.toCelsius(this.state.dataObject.main.temp_max)

    this.setState({
      cityName: this.state.dataObject.name,
      weatherType: this.state.dataObject.weather[0].main,
      currentTemp: celsiusCurrent,
      minTemp: celsiusMin,
      maxTemp: celsiusMax,
    })
    
  }
  

  render(){
    return(
      <div class = 'main'>
        <h1 class = 'banner'> Weather </h1>
            
        <div class = 'interactions'>
          <input type = 'text' id = 'textbar' value = {this.state.city} placeholder = "Search city or country" onChange = {this.searchCity}></input>
          <button id = 'check' onClick = {this.getweatherData}>Check</button>
        </div>

        

        <div class = 'outcome'>
          <div class = 'display'>
            <div class = 'cityName'>{this.state.cityName}</div>
            <div class = 'weatherContents'>
              <h1 class = 'weatherType'>{this.state.weatherType}</h1>
              <ul class = 'temperature'>
                  <li>Temperature: {this.state.currentTemp}°</li>
                  <li>Lowest Temperature: {this.state.minTemp}°</li>
                  <li>Highest Temperature: {this.state.maxTemp}°</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    )
  }
}



export default App;
