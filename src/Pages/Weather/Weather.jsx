import { useState, useEffect } from 'react';
import './Weather.css';

const Weather = () => {
  const [searchCity, setSearchCity] = useState('');
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [majorCitiesWeather, setMajorCitiesWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Major cities with their coordinates
  const majorCities = [
    { name: 'Dhaka', lat: 23.8103, lon: 90.4125 },
    { name: 'Chittagong', lat: 22.3569, lon: 91.7832 },
    { name: 'Sylhet', lat: 24.8949, lon: 91.8687 },
    { name: 'Rajshahi', lat: 24.3745, lon: 88.6042 },
    { name: 'Khulna', lat: 22.8456, lon: 89.5403 },
    { name: 'Barisal', lat: 22.7010, lon: 90.3535 },
    { name: 'Rangpur', lat: 25.7439, lon: 89.2752 },
    { name: 'Mymensingh', lat: 24.7471, lon: 90.4203 }
  ];

  // Get coordinates from city name using free geocoding API
  const getCityCoordinates = async (cityName) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
      );
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error('City not found');
      }
      
      return {
        name: data.results[0].name,
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
        country: data.results[0].country
      };
    } catch (err) {
      throw err;
    }
  };

  // Fetch weather data using coordinates (NO API KEY NEEDED!)
  const fetchWeather = async (cityData) => {
    try {
      const { lat, lon, name, country } = cityData;
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl&timezone=auto`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      const current = data.current;
      
      // Map weather codes to conditions
      const weatherCode = current.weather_code;
      const weatherInfo = getWeatherInfo(weatherCode);
      
      return {
        name: name,
        country: country || 'BD',
        temp: Math.round(current.temperature_2m),
        feels_like: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        pressure: Math.round(current.pressure_msl),
        wind_speed: current.wind_speed_10m,
        condition: weatherInfo.condition,
        description: weatherInfo.description,
        icon: weatherInfo.icon
      };
    } catch (err) {
      throw err;
    }
  };

  // Convert WMO weather codes to readable conditions
  const getWeatherInfo = (code) => {
    const weatherCodes = {
      0: { condition: 'Clear', description: 'clear sky', icon: '☀️' },
      1: { condition: 'Clear', description: 'mainly clear', icon: '🌤️' },
      2: { condition: 'Clouds', description: 'partly cloudy', icon: '⛅' },
      3: { condition: 'Clouds', description: 'overcast', icon: '☁️' },
      45: { condition: 'Fog', description: 'foggy', icon: '🌫️' },
      48: { condition: 'Fog', description: 'depositing rime fog', icon: '🌫️' },
      51: { condition: 'Drizzle', description: 'light drizzle', icon: '🌦️' },
      53: { condition: 'Drizzle', description: 'moderate drizzle', icon: '🌦️' },
      55: { condition: 'Drizzle', description: 'dense drizzle', icon: '🌧️' },
      61: { condition: 'Rain', description: 'slight rain', icon: '🌧️' },
      63: { condition: 'Rain', description: 'moderate rain', icon: '🌧️' },
      65: { condition: 'Rain', description: 'heavy rain', icon: '⛈️' },
      71: { condition: 'Snow', description: 'slight snow', icon: '🌨️' },
      73: { condition: 'Snow', description: 'moderate snow', icon: '🌨️' },
      75: { condition: 'Snow', description: 'heavy snow', icon: '❄️' },
      77: { condition: 'Snow', description: 'snow grains', icon: '🌨️' },
      80: { condition: 'Rain', description: 'slight rain showers', icon: '🌦️' },
      81: { condition: 'Rain', description: 'moderate rain showers', icon: '🌧️' },
      82: { condition: 'Rain', description: 'violent rain showers', icon: '⛈️' },
      85: { condition: 'Snow', description: 'slight snow showers', icon: '🌨️' },
      86: { condition: 'Snow', description: 'heavy snow showers', icon: '❄️' },
      95: { condition: 'Thunderstorm', description: 'thunderstorm', icon: '⛈️' },
      96: { condition: 'Thunderstorm', description: 'thunderstorm with hail', icon: '⛈️' },
      99: { condition: 'Thunderstorm', description: 'thunderstorm with heavy hail', icon: '⛈️' }
    };
    
    return weatherCodes[code] || { condition: 'Clear', description: 'unknown', icon: '🌡️' };
  };

  // Fetch weather for all major cities
  useEffect(() => {
    const fetchMajorCities = async () => {
      setLoading(true);
      try {
        const weatherPromises = majorCities.map(city => 
          fetchWeather({ name: city.name, lat: city.lat, lon: city.lon, country: 'BD' })
        );
        const weatherData = await Promise.all(weatherPromises);
        setMajorCitiesWeather(weatherData);
      } catch (err) {
        console.error('Error fetching major cities weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMajorCities();
  }, []);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchCity.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const cityData = await getCityCoordinates(searchCity);
      const weather = await fetchWeather(cityData);
      setSearchedWeather(weather);
    } catch (err) {
      setError('City not found. Please try again.');
      setSearchedWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Get weather icon (using emoji icons now)
  const getWeatherIconUrl = (icon) => {
    return icon; // Return the emoji directly
  };

  // Get background class based on weather condition
  const getWeatherClass = (condition) => {
    const conditions = {
      'Clear': 'sunny',
      'Clouds': 'cloudy',
      'Rain': 'rainy',
      'Drizzle': 'rainy',
      'Thunderstorm': 'stormy',
      'Snow': 'snowy',
      'Mist': 'misty',
      'Smoke': 'misty',
      'Haze': 'misty',
      'Fog': 'misty'
    };
    return conditions[condition] || 'default';
  };

  // Weather card component
  const WeatherCard = ({ weather, isLarge = false }) => (
    <div className={`weather-card ${getWeatherClass(weather.condition)} ${isLarge ? 'large' : ''}`}>
      <div className="weather-card-header">
        <h3 className="city-name">{weather.name}</h3>
        <span className="country">{weather.country}</span>
      </div>
      
      <div className="weather-icon-container">
        <span className="weather-icon-emoji">{weather.icon}</span>
      </div>
      
      <div className="temperature">
        <span className="temp-value">{weather.temp}</span>
        <span className="temp-unit">°C</span>
      </div>
      
      <div className="weather-condition">
        <p className="condition-main">{weather.condition}</p>
        <p className="condition-desc">{weather.description}</p>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-icon">🌡️</span>
          <div>
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">{weather.feels_like}°C</p>
          </div>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon">💧</span>
          <div>
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weather.humidity}%</p>
          </div>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon">💨</span>
          <div>
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{weather.wind_speed} m/s</p>
          </div>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon">🔽</span>
          <div>
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{weather.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="weather-container">
      <div className="weather-header">
        <h1 className="weather-title">Weather Forecast</h1>
        <p className="weather-subtitle">Check weather conditions across the country</p>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for a city..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? '🔄' : '🔍'} Search
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>

      {/* Searched City Result */}
      {searchedWeather && (
        <div className="searched-weather">
          <h2 className="section-title">Search Result</h2>
          <div className="searched-weather-container">
            <WeatherCard weather={searchedWeather} isLarge={true} />
          </div>
        </div>
      )}

      {/* Major Cities Weather */}
      <div className="major-cities-section">
        <h2 className="section-title">Major Cities</h2>
        {loading && !searchedWeather && (
          <div className="loading">Loading weather data...</div>
        )}
        
        <div className="weather-grid">
          {majorCitiesWeather.map((weather, index) => (
            <WeatherCard key={index} weather={weather} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;