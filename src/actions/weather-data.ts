export interface WeatherData {
  current: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    wind_speed_10m: number
    weather_code: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    wind_speed_10m: number[]
    weather_code: number[]
  }
  daily: {
    time: string[]
    temperature_2m_min: number[]
    temperature_2m_max: number[]
    weather_code: number[]
    sunrise: string[]
    sunset: string[]
  }
}

export async function fetchWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_min,temperature_2m_max,weather_code,sunrise,sunset`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }
  return response.json()
}
