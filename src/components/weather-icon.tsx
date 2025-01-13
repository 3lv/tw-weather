import { cn } from '@/lib/utils';
interface DayNight {
	day: string,
	night: string,
}
type Entry = DayNight | string;
const weatherCodeToEmoji: Record<number, string | DayNight> = {
  0: { day: '☀️', night: '🌙' }, // Clear sky
  1: { day: '🌤️', night: '🌙' },  // Mainly clear
  2: { day: '⛅', night: '☁️' },  // Partly cloudy
  3: '☁️',   // Cloudy
  45: '🌫️',  // Fog
  48: '🌫️',  // Freezing fog
  51: '🌧️',  // Light drizzle
  53: '🌧️',  // Moderate drizzle
  55: '🌧️',  // Heavy drizzle
  56: '🌧️',  // Freezing drizzle
  57: '🌧️',  // Heavy freezing drizzle
  61: { day: '🌦️', night: '🌧️' },  // Light rain
  63: '🌧️',  // Moderate rain
  65: '🌧️',  // Heavy rain
  66: '🌧️',  // Freezing rain
  67: '🌧️',  // Heavy freezing rain
  71: '🌨️',  // Light snow
  73: '❄️',  // Moderate snow
  75: '❄️',  // Heavy snow
  77: '❄️',  // Snow grains
  80: '🌧️',  // Light shower rain
  81: '🌧️',  // Moderate shower rain
  82: '🌧️',  // Heavy shower rain
  85: '❄️',  // Light snow showers
  86: '❄️',  // Heavy snow showers
  95: '⛈️',  // Thunderstorm
  96: '⚡',   // Thunderstorm with hail
  99: '⚡',   // Severe thunderstorm with hail
};

interface WeatherIconProps {
	weatherCode: number,
	className?: string,
	isNight?: boolean,
}
export const WeatherIcon = ({weatherCode, className, isNight}: WeatherIconProps) => {
    // Look up the emoji based on the weather code
    const emojiEntry = weatherCodeToEmoji[weatherCode] || '🌥️'; // Default to a cloud emoji if not found
    let emoji;
    if (typeof emojiEntry === 'string') {
        emoji = emojiEntry;
    } else {
        emoji = isNight === true ? emojiEntry.night : emojiEntry.day;
    }
    return (
	    <div className={cn("", className)}>
		    {emoji}
	    </div>
    )
};
