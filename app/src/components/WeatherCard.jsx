import { useEffect, useState, useContext } from "react";
import { getWeather } from "../services/weather";
import { WeatherCache } from "../services/weatherCache";

import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations/translations";

function WeatherCard({ setWeather }) {
  const { language } = useContext(LanguageContext);
  const text = translations[language];

  const [weather, setLocalWeather] = useState(null);
  const cachedWeather = WeatherCache.load();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWeather() {
         const cached = WeatherCache.load();

        if (cached?.weather) {

            setLocalWeather(cached.weather);
            setWeather(cached.weather);
            setLoading(false);

        }
      try {
        if (!navigator.geolocation) {
          throw new Error("Geolocation not supported");
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const data = await getWeather(latitude, longitude);

              setLocalWeather(data);
              setWeather(data);
              WeatherCache.save(data);
            } catch (error) {

    console.log("Weather API Error:", error);

    const cached = WeatherCache.load();

    console.log("Cached Weather:", cached);

    if (cached?.weather) {

        console.log("Using cached weather.");

        setLocalWeather(cached.weather);
        setWeather(cached.weather);

    } else {

        console.log("No cached weather found.");

    }
}

            setLoading(false);
          },
          async () => {
            try {
              const data = await getWeather(20.5937, 78.9629);

              setLocalWeather(data);
              setWeather(data);
              WeatherCache.save(data);
            } catch (error) {

    console.log("Weather API Error:", error);

    const cached = WeatherCache.load();

    console.log("Cached Weather:", cached);

    if (cached?.weather) {

        console.log("Using cached weather.");

        setLocalWeather(cached.weather);
        setWeather(cached.weather);

    } else {

        console.log("No cached weather found.");

    }
}

            setLoading(false);
          }
        );
      } catch (error) {
        console.log("Using cached weather...");

        const cached = WeatherCache.load();

        if (cached?.weather) {
          setLocalWeather(cached.weather);
          setWeather(cached.weather);
        } else {
          console.log("No cached weather available.");
        }

        setLoading(false);
      }
    }

    loadWeather();
  }, [setWeather]);

  if (loading) {
    return <div className="weather-card">Loading weather...</div>;
  }

  if (!weather) {
    return (
      <div className="weather-card">
        <h2>🌦 Weather</h2>
        <p>📡 Weather unavailable (Offline)</p>
        <p>Connect to the internet for live weather updates.</p>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <h2>🌦 {text.weatherTitle}</h2>

      {cachedWeather?.updatedAt && (
        <p>
          🕒 <strong>Last Updated:</strong>{" "}
          {new Date(cachedWeather.updatedAt).toLocaleString()}
        </p>
      )}
      {!navigator.onLine && (
    <p className="offline-cache-message">
      📡 Offline Mode — Showing last saved weather data
    </p>
)}


      <p>
        <strong>{text.city}:</strong> {weather.name}
      </p>

      <p>
        <strong>🌡 {text.temperature}:</strong> {weather.main.temp} °C
      </p>

      <p>
        <strong>💧 {text.humidity}:</strong> {weather.main.humidity}%
      </p>

      <p>
        <strong>☁ {text.weatherCondition}:</strong>{" "}
        {weather.weather[0].main}
      </p>

      <div className="weather-advice">
        <h3>🌾 {text.farmingAdvice}</h3>

        {weather.main.humidity > 80 && <p>💧 {text.humidityAdvice}</p>}

        {weather.weather[0].main === "Rain" && <p>🌧 {text.rainAdvice}</p>}

        {weather.weather[0].main === "Clear" && <p>☀ {text.clearAdvice}</p>}

        {weather.weather[0].main === "Clouds" && <p>☁ {text.cloudAdvice}</p>}
      </div>
    </div>
  );
}


export default WeatherCard;