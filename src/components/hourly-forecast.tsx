import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { WeatherIcon } from '@/components/weather-icon';

export interface HourlyForecast {
  dateTime: Date;
  temp: string;
  weatherCode: number;
  type: '';
}

export interface SunriseForecast {
  dateTime: Date;
  type: 'sunrise';
}

export interface SunsetForecast {
  dateTime: Date;
  type: 'sunset';
}

export interface NowForecast {
  dateTime: Date;
  temp: string;
  weatherCode: number;
  type: 'now';
}

export type AnyForecast =
  | HourlyForecast
  | SunriseForecast
  | SunsetForecast
  | NowForecast;

interface HourlyForecastProps {
  forecasts: AnyForecast[];
  isNight: (time: string | Date) => boolean;
}

function formatTime(date: Date) {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedTime;
}

export function DateTZ(date: Date | string, utcOffsetSeconds?: number) {
  if (typeof date === 'string') {
    date = new Date(date + ':00Z');
  }
  return new Date(date.getTime() - (utcOffsetSeconds || 0) * 1000);
}

export function HourlyForecast({ forecasts, isNight }: HourlyForecastProps) {
  return (
    <ScrollArea className='w-full whitespace-nowrap'>
      <div className='flex w-max space-x-4 p-4'>
        {forecasts.map((forecast, index) => {
          if (forecast.type === 'sunrise') {
            return (
              <Card
                key={`sunrise-${index}`}
                className='w-24 bg-yellow-100 text-black'
              >
                <CardContent className='p-4 text-center'>
                  <div className='text-sm'>{formatTime(forecast.dateTime)}</div>
                  <div className='my-2 text-2xl'>🌅</div>
                  <div className='text-lg'>Sunrise</div>
                </CardContent>
              </Card>
            );
          }
          if (forecast.type === 'sunset') {
            return (
              <Card
                key={`sunset-${index}`}
                className='w-24 bg-orange-200 text-black'
              >
                <CardContent className='p-4 text-center'>
                  <div className='text-sm'>{formatTime(forecast.dateTime)}</div>
                  <div className='my-2 text-2xl'>🌇</div>
                  <div className='text-lg'>Sunset</div>
                </CardContent>
              </Card>
            );
          }
          if (forecast.type === 'now') {
            return (
              <Card key={`now-${index}`} className='w-24 bg-accent'>
                <CardContent className='p-4 text-center'>
                  <div className='text-sm'>Now</div>
                  <WeatherIcon
                    weatherCode={forecast.weatherCode}
                    isNight={isNight(forecast.dateTime)}
                    className='my-2 text-2xl'
                  />
                  <div className='text-lg'>{forecast.temp}°</div>
                </CardContent>
              </Card>
            );
          }
          return (
            <Card key={`${forecast.dateTime}`} className='w-24'>
              <CardContent className='p-4 text-center'>
                <div className='text-sm'>{formatTime(forecast.dateTime)}</div>
                <WeatherIcon
                  weatherCode={forecast.weatherCode}
                  isNight={isNight(forecast.dateTime)}
                  className='my-2 text-2xl'
                />
                <div className='text-lg'>{forecast.temp}°</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
