import { Card, CardContent } from "@/components/ui/card"
import { Wind, Droplets } from 'lucide-react'
import { WeatherData } from '@/actions/weather-data'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'

interface TodayHighlightsProps {
  weatherData: WeatherData;
  convertTemperature: (temp: number) => string;
  openTemperatureDrawer: () => void;
}

const MotionCard = motion(Card);

export function TodayHighlights({ weatherData, convertTemperature, openTemperatureDrawer }: TodayHighlightsProps) {
  const currentWindSpeed = weatherData.current.wind_speed_10m;
  const currentTemp = weatherData.current.temperature_2m;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
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
      className="mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xl mb-4">Today's Highlights</h2>
      <div className="grid grid-cols-2 gap-4">
        <MotionCard variants={cardVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <CardContent className="p-4">
            <h3 className="text-muted-foreground">Wind Status</h3>
            <div className="flex items-center mt-2">
              <Wind className="h-8 w-8 mr-2" />
              <span className="text-2xl">{currentWindSpeed} m/s</span>
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <CardContent className="p-4">
            <h3 className="text-muted-foreground">Humidity</h3>
            <div className="flex items-center mt-2">
              <Droplets className="h-8 w-8 mr-2" />
              <span className="text-2xl">{weatherData.hourly.relative_humidity_2m[0]}%</span>
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <CardContent className="p-4 cursor-pointer" onClick={openTemperatureDrawer}>
            <h3 className="text-muted-foreground">Temperature Range</h3>
            <div className="text-2xl mt-2">
              {convertTemperature(Math.min(...weatherData.hourly.temperature_2m.slice(0, 24)))}° - {convertTemperature(Math.max(...weatherData.hourly.temperature_2m.slice(0, 24)))}°
            </div>
            <Button variant="link" className="p-0 h-auto mt-2">View Details</Button>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <CardContent className="p-4">
            <h3 className="text-muted-foreground">Feels Like</h3>
            <div className="text-2xl mt-2">
              {convertTemperature(currentTemp)}°
            </div>
          </CardContent>
        </MotionCard>
      </div>
    </motion.div>
  )
}
