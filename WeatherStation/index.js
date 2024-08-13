const mainTag = document.getElementById('main')
const form = document.getElementById('form')

const weatherStation = {
  temperature : 0,
  humidity: 0,
  atmosphericPressure: 0,
  updateWeatherData : function(temp, hum, presure) {
    this.temperature = temp
    this.humidity = hum
    this.atmosphericPressure = presure
  },
  displayWeatherForecast: function() {
    const displayData = document.getElementById('display-data')
    const weatherIcon = document.getElementById('weather-icon')
    const weatherDescription = document.getElementById('weather-description')
  
    displayData.innerHTML = `
    <p>temperature is ${this.temperature} °C</p>
    <p>${this.humidity}% of humidity</p>
    <p>pressure: ${this.atmosphericPressure} mm</p>
    `

    const { weatherState, icon } = getWeatherState(this.humidity)
    weatherDescription.textContent = weatherState
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
    weatherIcon.setAttribute('alt', weatherState)
  }
}

const getWeatherState = (humidity) => {
  let weatherState = ''
  let icon = ''
  switch (true) {
    case humidity <= 10:
      weatherState = 'It is sunny'
      icon = '01d'
      break
    case humidity <= 25:
      weatherState = 'scattered clouds'
      icon = '03d'
      break
    case humidity < 40:
      weatherState = 'broken clouds'
      icon = '04d'
      break
    case humidity >= 40:
      weatherState = 'shower rain'
      icon = '09d'
      break
  }
  return { weatherState, icon }
}

const fetchWeather = async () => {
  try {
    const data = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=49.0672&lon=33.4135&units=metric&appid=f1fd3856206c681676ff654428346ad6')
    const result = await data.json()
    const weather = result.main

    weatherStation.updateWeatherData(weather.temp, weather.humidity, weather.pressure)
    weatherStation.displayWeatherForecast()
  }
  catch (err) {
    console.error(err)
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const temperature = document.getElementById('temperature').value
  const humidity = document.getElementById('humidity').value
  const pressure = document.getElementById('pressure').value

  weatherStation.updateWeatherData(temperature, humidity, pressure)
  weatherStation.displayWeatherForecast()
})

document.getElementById('current-weather-button').addEventListener('click', ()=> {
  fetchWeather()
})

weatherStation.updateWeatherData(20, 50, 600)
weatherStation.displayWeatherForecast()
