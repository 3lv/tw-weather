'use client';
import { useEffect, useState, useRef } from 'react';
import { CardContent } from '@/components/ui/card';
import { AnimatedCard } from '@/components/animated-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import { TemperatureRangeChart } from '@/components/temperature-range-chart';
import { WeatherIcon } from '@/components/weather-icon';
import { HourlyForecast, SunsetForecast, SunriseForecast, NowForecast, DateTZ } from '@/components/hourly-forecast';
import { TemperatureRange } from '@/components/temperature-range';
import { CityImage } from '@/components/city-image';
import { City } from '@/actions/search-cities';
import { fetchWeatherData, WeatherData } from '@/actions/weather-data';
import { Header } from '@/components/header';
import { CurrentWeather } from '@/components/current-weather';
import { TodayHighlights } from '@/components/today-highlights';
import { FavoriteCities } from '@/components/favorite-cities';
import { TemperatureRangeDetails } from '@/components/temperature-range-details';
const DEFAULT_CITY = {
  lat: 44.4268,
  lng: 26.1025,
  name: 'Bucharest',
  label: 'Bucharest, RO',
}
export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<City>(DEFAULT_CITY);
  const [tempUnit, setTempUnit] = useState<'°C' | '°F'>('°C');
  const [tempPrecision, setTempPrecision] = useState(0);
  const [favoriteCities, setFavoriteCities] = useState<City[]>([]);
  const [isTemperatureDrawerOpen, setIsTemperatureDrawerOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const springScale = useSpring(scale, { stiffness: 100, damping: 10 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 10 });
  const isFavorite = (city: City): boolean =>
    favoriteCities.some((c) => c.label === city.label);
  const toggleFavorite = (city: City) => {
    setFavoriteCities((prev) =>
      isFavorite(city)
        ? prev.filter((item) => item.label !== city.label)
        : [...prev, city]
    );
  };
  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favoriteCities') || '[]'
    );
    if (Array.isArray(savedFavorites)) {
      setFavoriteCities(savedFavorites);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
  }, [favoriteCities]);
  useEffect(() => {
    async function loadWeatherData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(selectedCity.lat, selectedCity.lng);
        setWeatherData(data);
      } catch (err) {
        setError('Failed to load weather data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadWeatherData();
  }, [selectedCity]);
  const handleCitySelect = (city: City | null) => {
    setSelectedCity(city || DEFAULT_CITY);
  };
  const convertTemperature = (temp: number): string => {
    let result = tempUnit === '°F' ? (temp * 9) / 5 + 32 : temp;
    result = Number(result.toFixed(tempPrecision));
    return result.toString();
  };
  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        Loading weather data...
      </div>
    );
  }
  if (error) {
    return (
      <div className='flex h-screen items-center justify-center text-red-500'>
        {error}
      </div>
    );
  }
  if (!weatherData) {
    return null;
  }
  const isNight = (time: string | Date): boolean => {
    let dateTime = DateTZ(time);
    for (let i = 0; i < weatherData.daily.sunrise.length; ++i) {
      let sunrise = DateTZ(weatherData.daily.sunrise[i]);
      let sunset = DateTZ(weatherData.daily.sunset[i]);
      if (sunrise <= dateTime && dateTime <= sunset) {
        return false;
      }
    }
    return true;
  };
  const totalTempMin = Math.min(...weatherData.daily.temperature_2m_min);
  const totalTempMax = Math.max(...weatherData.daily.temperature_2m_max);
  const currentDateTime = DateTZ(weatherData.current.time);
  const currentTemp = weatherData.current.temperature_2m;
  const currentHumidity = weatherData.current.relative_humidity_2m;
  const currentWindSpeed = weatherData.current.wind_speed_10m;
  const currentWeatherCode = weatherData.current.weather_code;
  const hourlyForecasts = weatherData.hourly.time.map((time, index) => ({
    dateTime: DateTZ(time),
    temp: convertTemperature(weatherData.hourly.temperature_2m[index]),
    humidity: weatherData.hourly.relative_humidity_2m[index],
    windSpeed: weatherData.hourly.wind_speed_10m[index],
    weatherCode: weatherData.hourly.weather_code[index],
    type: '',
  } as HourlyForecast));
  const sunriseSunsetEntries = weatherData.daily.time.flatMap((_, i) => [
    {
      dateTime: DateTZ(weatherData.daily.sunrise[i]),
      type: 'sunrise',
    } as SunriseForecast,
    {
      dateTime: DateTZ(weatherData.daily.sunset[i]),
      type: 'sunset',
    } as SunsetForecast,
  ]);
  const enhancedHourlyForecasts = [
    {
      dateTime: DateTZ(weatherData.current.time),
      temp: convertTemperature(currentTemp),
      humidity: currentHumidity,
      windSpeed: currentWindSpeed,
      weatherCode: currentWeatherCode,
      type: 'now',
    } as NowForecast,
    ...hourlyForecasts,
    ...sunriseSunsetEntries,
  ].sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
  return (
    <div
      className='min-h-screen bg-background pt-16 text-foreground'
      ref={containerRef}
    >
      <Header
        selectedCity={selectedCity}
        onCitySelect={handleCitySelect}
        tempUnit={tempUnit}
        setTempUnit={setTempUnit}
        tempPrecision={tempPrecision}
        setTempPrecision={setTempPrecision}
      />
      <motion.div style={{ scale: springScale, opacity: springOpacity }}>
        <CityImage
          className={String(weatherData.current.time)}
          cityName={selectedCity.name}
          weatherCode={currentWeatherCode}
          isNight={isNight(weatherData.current.time)}
        >
          <CurrentWeather
            selectedCity={selectedCity}
            weatherData={weatherData}
            convertTemperature={convertTemperature}
            tempUnit={tempUnit}
            isNight={isNight}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        </CityImage>
      </motion.div>
      <div className='flex flex-col p-6'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-8'>
            <AnimatedCard direction='left' className='mt-6'>
              <CardContent className='p-4'>
                <div className='mt-4 flex items-center gap-2'>
                  <div className='text-6xl'>
</div>
                  <div>
                    <div className='text-2xl'>Hourly Forecast</div>
                  </div>
                </div>
                <HourlyForecast
                  forecasts={enhancedHourlyForecasts
                    .filter((entry) => entry.dateTime >= currentDateTime)
                    .slice(0, 24 + 3)}
                  isNight={isNight}
                />
              </CardContent>
            </AnimatedCard>
            <AnimatedCard direction='left' className='mt-6'>
              <CardContent className='p-4'>
                <h3 className='mb-2 text-lg font-semibold'>7-Day Forecast</h3>
                <Accordion type='single' collapsible className='w-full'>
                  {weatherData.daily.time.map((date, index) => (
                    <AccordionItem key={date} value={date}>
                      <AccordionTrigger>
                        <div className='flex w-full items-center justify-between'>
                          <span className='pl-2 text-xl'>
                            {index === 0
                              ? 'Today'
                              : new Date(date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                })}
                          </span>
                          <div className='flex flex-row items-center'>
                            <WeatherIcon
                              weatherCode={
                                weatherData.daily.weather_code[index]
                              }
                              isNight={false}
                              className='mr-2 text-2xl'
                            />
                            <TemperatureRange
                              currentMin={parseFloat(
                                convertTemperature(
                                  weatherData.daily.temperature_2m_min[index]
                                )
                              )}
                              currentMax={parseFloat(
                                convertTemperature(
                                  weatherData.daily.temperature_2m_max[index]
                                )
                              )}
                              totalMin={parseFloat(
                                convertTemperature(totalTempMin)
                              )}
                              totalMax={parseFloat(
                                convertTemperature(totalTempMax)
                              )}
                            />
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <HourlyForecast
                          forecasts={enhancedHourlyForecasts.filter(
                            (forecast) => {
                              return (
                                DateTZ(forecast.dateTime).getUTCDay() ===
                                DateTZ(date + 'T00:00').getUTCDay()
                              );
                            }
                          )}
                          isNight={isNight}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </AnimatedCard>
          </div>
          <div className='col-span-4'>
            <TodayHighlights
              weatherData={weatherData}
              convertTemperature={convertTemperature}
              openTemperatureDrawer={() => setIsTemperatureDrawerOpen(true)}
            />
            <AnimatedCard direction='right' className='mt-6'>
              <CardContent className='pt-4'>
                <FavoriteCities
                  favoriteCities={favoriteCities}
                  handleCitySelect={handleCitySelect}
                />
              </CardContent>
            </AnimatedCard>
          </div>
        </div>
      </div>
      <Drawer
        open={isTemperatureDrawerOpen}
        onOpenChange={setIsTemperatureDrawerOpen}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Temperature Range Details</DrawerTitle>
          </DrawerHeader>
          <div className='p-4'>
            <TemperatureRangeDetails
              hourlyForecasts={hourlyForecasts}
              tempUnit={tempUnit}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
  }
