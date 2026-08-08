"use client";

import { useEffect, useState } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";
export type TimeOfDay = "dawn" | "day" | "dusk" | "night";
export type Weather = "clear" | "cloudy" | "rain" | "snow";

export interface AmbientState {
  season: Season;
  timeOfDay: TimeOfDay;
  weather: Weather;
  temperature: number | null;
  greeting: string;
  seasonalName: string;
  seasonalEmoji: string;
  weatherEmoji: string;
  special: string | null;
  dateLabel: string;
}

function getSeason(date: Date): Season {
  const m = date.getMonth();
  if (m >= 2 && m <= 4) return "spring";
  if (m >= 5 && m <= 7) return "summer";
  if (m >= 8 && m <= 10) return "autumn";
  return "winter";
}

function getTimeOfDay(date: Date): TimeOfDay {
  const h = date.getHours();
  if (h >= 5 && h < 8) return "dawn";
  if (h >= 8 && h < 17) return "day";
  if (h >= 17 && h < 20) return "dusk";
  return "night";
}

function getGreeting(timeOfDay: TimeOfDay): string {
  switch (timeOfDay) {
    case "dawn": return "Good morning";
    case "day": return "Good afternoon";
    case "dusk": return "Good evening";
    case "night": return "Good night";
  }
}

function getSpecial(date: Date): string | null {
  const m = date.getMonth();
  const d = date.getDate();
  if (m === 11 && d >= 24 && d <= 26) return "christmas";
  if (m === 9 && d === 31) return "halloween";
  if (m === 0 && d === 1) return "newyear";
  if (m === 4 && d === 10) return "mc-birthday";
  if (m === 11 && d === 31) return "newyear-eve";
  return null;
}

function getDefaultWeather(season: Season): Weather {
  if (season === "winter") return "snow";
  if (season === "autumn") return "cloudy";
  return "clear";
}

const SEASONAL_NAMES: Record<Season, string> = {
  spring: "Spring",
  summer: "Summer",
  autumn: "Autumn",
  winter: "Winter",
};

const SEASONAL_EMOJI: Record<Season, string> = {
  spring: "\u{1F33C}",
  summer: "\u{2600}\u{FE0F}",
  autumn: "\u{1F342}",
  winter: "\u{2744}\u{FE0F}",
};

const WEATHER_EMOJI: Record<Weather, string> = {
  clear: "\u{2600}\u{FE0F}",
  cloudy: "\u{2601}\u{FE0F}",
  rain: "\u{1F327}\u{FE0F}",
  snow: "\u{1F328}\u{FE0F}",
};

function wmoToWeather(code: number): Weather {
  if (code === 0 || code === 1) return "clear";
  if (code >= 2 && code <= 3) return "cloudy";
  if (code >= 45 && code <= 48) return "cloudy";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return "snow";
  if (code >= 95) return "rain";
  return "clear";
}

function getDateLabel(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function useAmbient(): AmbientState {
  const [state, setState] = useState<AmbientState>(() => {
    const now = new Date();
    const season = getSeason(now);
    const tod = getTimeOfDay(now);
    const weather = getDefaultWeather(season);
    return {
      season,
      timeOfDay: tod,
      weather,
      temperature: null,
      greeting: getGreeting(tod),
      seasonalName: SEASONAL_NAMES[season],
      seasonalEmoji: SEASONAL_EMOJI[season],
      weatherEmoji: WEATHER_EMOJI[weather],
      special: getSpecial(now),
      dateLabel: getDateLabel(now),
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const tod = getTimeOfDay(now);
      setState((prev) => ({
        ...prev,
        timeOfDay: tod,
        greeting: getGreeting(tod),
        special: getSpecial(now),
        dateLabel: getDateLabel(now),
      }));
    }, 60000);

    const fetchWeather = async () => {
      try {
        const cached = localStorage.getItem("drift-weather-cache");
        if (cached) {
          const data = JSON.parse(cached);
          if (Date.now() - data.timestamp < 30 * 60 * 1000) {
            setState((prev) => ({
              ...prev,
              weather: data.weather,
              temperature: data.temperature,
              weatherEmoji: WEATHER_EMOJI[data.weather as Weather],
            }));
            return;
          }
        }

        let lat = 50.0;
        let lon = 10.0;
        try {
          const geoResp = await fetch("https://ipapi.co/json/");
          if (geoResp.ok) {
            const geo = await geoResp.json();
            if (geo.latitude && geo.longitude) {
              lat = geo.latitude;
              lon = geo.longitude;
            }
          }
        } catch {
          /* keep defaults */
        }

        const weatherResp = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        if (weatherResp.ok) {
          const data = await weatherResp.json();
          const weather = wmoToWeather(data.current.weather_code);
          const temperature = Math.round(data.current.temperature_2m);

          localStorage.setItem(
            "drift-weather-cache",
            JSON.stringify({ weather, temperature, timestamp: Date.now() })
          );

          setState((prev) => ({
            ...prev,
            weather,
            temperature,
            weatherEmoji: WEATHER_EMOJI[weather],
          }));
        }
      } catch {
        /* keep defaults */
      }
    };

    fetchWeather();
    return () => clearInterval(interval);
  }, []);

  return state;
}

export const SEASONAL_ACCENTS: Record<
  Season,
  { h: number; s: number; l: number; name: string }
> = {
  spring: { h: 120, s: 60, l: 45, name: "Minecraft Green" },
  summer: { h: 172, s: 70, l: 45, name: "Drift Teal" },
  autumn: { h: 190, s: 75, l: 50, name: "Diamond Cyan" },
  winter: { h: 210, s: 65, l: 55, name: "Winter Ice" },
};
