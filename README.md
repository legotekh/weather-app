# 🌤️ Weather Forecast Application

A responsive Single Page Application (SPA) built with React and TypeScript that provides real-time hourly weather forecasts based on geographical coordinates. 

This project demonstrates handling asynchronous operations, integrating multiple third-party APIs, and managing complex application state using modern React hooks.

## 🚀 Features

- **Location Geocoding:** Integrates with OpenStreetMap (Nominatim API) to convert user-entered city names into precise latitude and longitude coordinates.
- **Real-Time Weather Data:** Fetches comprehensive atmospheric metrics from the Meteoblue API.
- **Dynamic Time Matching:** Automatically calculates and displays weather parameters for the current hour using local system time synchronization.
- **Robust Error Handling:** Gracefully manages invalid city inputs, empty API responses, and network failures with informative UI feedback.
- **Strictly Typed:** Written completely in TypeScript with custom interfaces to eliminate `any` types and enforce compile-time safety.
- **Environment Security:** API keys are securely managed using environment variables.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Styling:** CSS3 (Custom properties, responsive design)
- **Build Tool:** Vite
- **APIs:** - OpenStreetMap Nominatim API (Geocoding)
  - Meteoblue Data Packages (Weather metrics)

## 📦 Installation & Setup

To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/](https://github.com/)[твій-юзернейм]/weather-app.git
   cd weather-app