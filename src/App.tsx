import { useState, useEffect } from 'react';
import { fetchData, getCoordsByName } from './weatherService';

interface WeatherData {
  data_1h: {
    time: string[];
    temperature: number[];
    relativehumidity: number[];
    windspeed: number[];
    uvindex: number[];
  };
}

function App() {
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });
  const [cityKey, setCityKey] = useState('');
  const [search, setSearch] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getPlace = async () => {
    if (!cityKey.trim()) return;
    setSearch(true);
    setError(null);
    try {
      const newCoords = await getCoordsByName(cityKey);
      setCoords(newCoords);
    } catch {
      setError('Місто не знайдено');
      setWeatherData(null);
      setSearch(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') getPlace();
  };

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:00`;
  const currentIndex = weatherData?.data_1h?.time.indexOf(formattedDate) ?? -1;

  useEffect(() => {
    if (coords.lat === 0 && coords.lon === 0) return;

    const getWeather = async () => {
      setSearch(true);
      setError(null);
      try {
        const response = await fetchData(coords);
        const data = await response.json();
        setWeatherData(data);
      } catch {
        setError('Не вдалося завантажити погоду');
      } finally {
        setSearch(false);
      }
    };

    getWeather();
  }, [coords]);

  const temp = currentIndex !== -1 ? Math.round(weatherData!.data_1h.temperature[currentIndex]) : null;
  const humidity = currentIndex !== -1 ? weatherData!.data_1h.relativehumidity[currentIndex] : null;
  const wind = currentIndex !== -1 ? Math.round(weatherData!.data_1h.windspeed[currentIndex] * 3.6) : null;
  const uv = currentIndex !== -1 ? weatherData!.data_1h.uvindex[currentIndex] : null;

  const getUvLabel = (uv: number) => {
    if (uv <= 2) return 'Низький';
    if (uv <= 5) return 'Помірний';
    if (uv <= 7) return 'Високий';
    return 'Дуже високий';
  };

  return (
    <main>
      <div className="app-header">
        <h1>Weather App</h1>
        <p className="app-subtitle">Прогноз погоди в реальному часі</p>
      </div>

      <div className="search-box">
        <input
          placeholder="Введіть місто (Kyiv, Cherkasy)..."
          value={cityKey}
          onChange={(e) => setCityKey(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={getPlace} disabled={search}>
          {search ? 'Пошук...' : 'Search'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="weather-card">
        {search && (
          <div className="loading">
            <div className="spinner" />
            <p>Завантаження...</p>
          </div>
        )}

        {!search && temp !== null ? (
          <div className="weather-content">
            <div className="city-row">
              <h2 className="city-name">{cityKey}</h2>
              <span className="time-badge">{formattedDate}</span>
            </div>

            <div className="temp-row">
              <span className="temp-big">{temp}</span>
              <span className="temp-unit">°C</span>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <span className="detail-label">Вологість</span>
                <span className="detail-value">{humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <span className="detail-label">Вітер</span>
                <span className="detail-value">{wind} км/г</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">☀️</span>
                <span className="detail-label">UV індекс</span>
                <span className="detail-value">{uv} · {getUvLabel(uv!)}</span>
              </div>
            </div>
          </div>
        ) : (
          !search && !error && (
            <div className="empty-state">
              <span className="empty-icon">🌤</span>
              <p>Введіть місто для прогнозу</p>
            </div>
          )
        )}
      </div>
    </main>
  );
}

export default App;