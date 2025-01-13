import { Button } from "@/components/ui/button"
import { WeatherIcon } from '@/components/weather-icon'
import { City } from '@/actions/search-cities'
import { WeatherData } from '@/actions/weather-data'
import { motion, useScroll, useTransform } from 'framer-motion'

interface CurrentWeatherProps {
  selectedCity: City;
  weatherData: WeatherData;
  convertTemperature: (temp: number) => string;
  tempUnit: '°C' | '°F';
  isNight: (time: string | Date) => boolean;
  toggleFavorite: (city: City) => void;
  isFavorite: (city: City) => boolean;
}

export function CurrentWeather({ 
  selectedCity, 
  weatherData, 
  convertTemperature, 
  tempUnit, 
  isNight, 
  toggleFavorite, 
  isFavorite 
}: CurrentWeatherProps) {
  const currentTemp = weatherData.current.temperature_2m;
  const currentWeatherCode = weatherData.current.weather_code;
  const { scrollY } = useScroll()

  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const y = useTransform(scrollY, [0, 300], [0, 100])

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center text-white z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ opacity, y }}
    >
      <motion.div 
        className="text-6xl font-bold mb-4 text-shadow-lg"
        variants={itemVariants}
      >
        {selectedCity.name}
      </motion.div>
      <motion.div 
        className="flex items-center mb-6"
        variants={itemVariants}
      >
        <WeatherIcon
          weatherCode={currentWeatherCode}
          isNight={isNight(weatherData.current.time)}
          className="text-9xl mr-4 drop-shadow-lg"
        />
        <div className="text-9xl font-bold text-shadow-lg">{convertTemperature(currentTemp)}{tempUnit}</div>
      </motion.div>
      <motion.div 
        className="text-2xl mb-8 text-shadow"
        variants={itemVariants}
      >
        {new Date(weatherData.current.time).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: false 
        })}
      </motion.div>
      <motion.div
        variants={itemVariants}
      >
        <Button 
          className="bg-white/20 text-white hover:bg-white/30 rounded-full px-6 py-2 text-lg backdrop-blur-sm transition-all duration-300"
          onClick={() => toggleFavorite(selectedCity)}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          {isFavorite(selectedCity) ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </motion.div>
    </motion.div>
  )
}
