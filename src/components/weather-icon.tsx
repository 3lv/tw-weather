import { cn } from '@/lib/utils';
interface DayNight {
	day: string,
	night: string,
}
type Entry = DayNight | string;
const weatherCodeToEmoji: Record<number, Entry> = {
    0: {
        day: '☀️',
        night: '🌙'
    },
    1: {
        day: '🌤️',
        night: '🌙'
    },
    2: {
        day: '⛅',
        night: '☁️'
    },
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌧️',
    53: '🌧️',
    55: '🌧️',
    56: '🌧️',
    57: '🌧️',
    61: {
        day: '🌦️',
        night: '🌧️'
    },
    63: '🌧️',
    65: '🌧️',
    66: '🌧️',
    67: '🌧️',
    71: '🌨️',
    73: '❄️',
    75: '❄️',
    77: '❄️',
    80: '🌧️',
    81: '🌧️',
    82: '🌧️',
    85: '❄️',
    86: '❄️',
    95: '⛈️',
    96: '⚡',
    99: '⚡'
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
