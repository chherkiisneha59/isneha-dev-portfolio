# ☁️ SkyCast — Modern Weather App

<div align="center">

![SkyCast](https://img.shields.io/badge/SkyCast-Weather_App-6366f1?style=for-the-badge&logo=cloud&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=flat-square&logo=pwa&logoColor=white)

A beautiful, production-ready weather application built with React, Tailwind CSS, and Framer Motion. Features real-time weather data, 5-day forecasts, geolocation, favorites, and stunning weather-based dynamic backgrounds.

[Live Demo →](skycast-live-weather-app.vercel.app) · [Report Bug →](../../issues) · [Request Feature →](../../issues)

</div>

---

## ✨ Features

### 🌦️ Core Weather
- **Real-time weather data** — Temperature, humidity, wind speed, pressure, visibility
- **5-day forecast** with daily high/low temperature range bars
- **Hourly forecast** with horizontal scroll cards (mobile-optimized)
- **Weather icons** from OpenWeatherMap API
- **Sunrise & sunset times** with timezone support

### 🎨 Visual Experience
- **Dynamic backgrounds** — Changes based on weather condition (clear, rain, clouds, snow, thunderstorm, mist)
- **Animated particles** — Rain drops, snow flakes, sparkles, floating orbs
- **Glassmorphism UI** — Frosted glass cards with backdrop blur
- **Dark & Light mode** — Smooth theme toggling with persistence
- **Framer Motion animations** — Staggered reveals, floating icons, smooth transitions

### 📱 Mobile-First Design
- **Fully responsive** — Optimized for phones, tablets, and desktops
- **Touch-friendly** — Large tap targets, horizontal scroll with snap
- **No scroll bars** on forecast carousels
- **Thumb-friendly** layout with bottom-reachable controls

### 🔍 Smart Search
- **Debounced search input** — Prevents excessive API calls
- **City autocomplete** — Geocoding-powered suggestions as you type
- **Recent search history** — Quickly access previously searched cities
- **Clear search history** button

### 📍 Location Features
- **Auto-detect location** — Uses browser Geolocation API
- **One-tap location button** in search bar and dropdown
- **Reverse geocoding** for location-based city names

### ⭐ Personalization
- **Favorite cities** — Save up to 10 cities (persisted to localStorage)
- **Unit toggle** — Switch between °C (metric) and °F (imperial)
- **Theme preference** — Dark/light mode saved to localStorage

### 📲 PWA Support
- **Installable** — Add to home screen on mobile devices
- **Offline support** — Cached weather data for offline access
- **Service worker** — Background caching of API responses
- **App-like experience** — Standalone display mode

### 🛡️ Error Handling
- **Friendly error messages** — City not found, network errors, API limits
- **Dismissible error banners** with clear call-to-action
- **Graceful degradation** — Cached data shown when offline
- **Skeleton loading states** — Shimmer animations while fetching

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI library with hooks & context |
| **Vite 6** | Lightning-fast build tool |
| **Tailwind CSS 3** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Axios** | HTTP client for API calls |
| **React Icons** | Icon library |
| **vite-plugin-pwa** | Progressive Web App support |
| **OpenWeatherMap API** | Weather data provider |

---

## 📁 Project Structure

```
WEATHER-APP/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CurrentWeather.jsx    # Main weather display
│   │   ├── DailyForecast.jsx     # 5-day forecast
│   │   ├── EmptyState.jsx        # Welcome screen
│   │   ├── ErrorState.jsx        # Error banner
│   │   ├── Favorites.jsx         # Saved cities
│   │   ├── Footer.jsx            # App footer
│   │   ├── Header.jsx            # App header + controls
│   │   ├── HourlyForecast.jsx    # Hourly scrollable forecast
│   │   ├── LoadingState.jsx      # Skeleton loaders
│   │   ├── SearchBar.jsx         # Search with autocomplete
│   │   └── WeatherParticles.jsx  # Canvas particle effects
│   ├── context/
│   │   ├── ThemeContext.jsx       # Dark/light mode state
│   │   └── WeatherContext.jsx     # Weather data state
│   ├── hooks/
│   │   ├── useDebounce.js         # Debounced input hook
│   │   └── useGeolocation.js      # Browser geolocation hook
│   ├── services/
│   │   └── weatherApi.js          # API service layer
│   ├── utils/
│   │   ├── helpers.js             # Formatting & utility functions
│   │   └── storage.js             # localStorage abstraction
│   ├── App.jsx                    # Main app component
│   ├── index.css                  # Global styles & Tailwind
│   └── main.jsx                   # React entry point
├── .env.example                   # Environment template
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **OpenWeatherMap API Key** (free tier works!)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/skycast-weather.git
cd skycast-weather
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```
VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
```

### 4. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000` 🎉

### 5. Build for Production

```bash
npm run build
npm run preview

## 📱 Screenshots

| Mobile (Dark) | Mobile (Light) | Desktop |
|---|---|---|
| Dark mode on phone | Light mode on phone | Full desktop view |


<div align="center">

**Built with ❤️ by [Isneha Chherki]

⭐ Star this repo if you found it useful!

</div>
