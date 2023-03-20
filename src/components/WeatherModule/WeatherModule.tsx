import { useEffect, useState } from "react";
import "./WeatherModule.scss";

const WeatherModule = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  function updateWeather() {
    navigator.geolocation.getCurrentPosition((position) => {
      let url = `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`;
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Weather data not available");
          }
          return res.json();
        })
        .then((data) => {
          setWeatherData(data);
          console.log(data);
        })
        .catch((err) => console.error(err));
    });
  }
  useEffect(() => {
    updateWeather();
  }, []);

  return (
    <div className="WeatherModule">
      {weatherData === null ? (
        <div className="loading"></div>
      ) : (
        <>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
          <p className="weather-temp">{Math.round(weatherData.main.temp)}º</p>
          <p className="weather-city">{weatherData.name}</p>
          <p className="weather-city">{weatherData.weather[0].main}</p>
          <p className="weather-city">
            High: {weatherData.main.temp_max.toFixed(0)}, Low:{" "}
            {weatherData.main.temp_min.toFixed(0)}
          </p>
        </>
      )}
    </div>
  );
};

export default WeatherModule;
