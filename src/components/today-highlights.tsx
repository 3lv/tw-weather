import { Card, CardContent } from '@/components/ui/card'
import { Wind, Droplets } from 'lucide-react'
import { WeatherData } from '@/actions/weather-data'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'

interface TodayHighlightsProps {
  weatherData: WeatherData
  convertTemperature: (temp: number) => string
  openTemperatureDrawer: () => void
}

export function TodayHighlights({
  weatherData,
  convertTemperature,
  openTemperatureDrawer,
}: TodayHighlightsProps) {
  const currentWindSpeed = weatherData.current.wind_speed_10m
  const currentTemp = weatherData.current.temperature_2m

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <CardContainer className="mb-6 w-full">
      <CardBody className="w-full h-full bg-gray-50 dark:bg-black rounded-xl p-6 border border-black/[0.1] dark:border-white/[0.2]">
        <h2 className="text-xl mb-4 text-center">Today's Highlights</h2>
        <div className="grid grid-cols-2 gap-4 place-items-center">
          <CardItem
            className="h-full w-full"
            translateZ="100"
            translateY="-20"
            translateX="-20"
            rotateX="-20"
            rotateY="20"
          >
            <Card className="h-full w-full rounded-xl border border-black dark:border-white p-4">
              <CardContent>
                <h3 className="text-muted-foreground">Wind Status</h3>
                <div className="flex items-center mt-2">
                  <Wind className="h-8 w-8 mr-2" />
                  <span className="text-2xl">{currentWindSpeed} m/s</span>
                </div>
              </CardContent>
            </Card>
          </CardItem>

          <CardItem
            translateZ="100"
            translateY="-1000"
            translateX="-1000"
            rotateZ="5000"
            rotateY="20"
            className="duration-10000"
          >
            <Card className="p-4">
              <CardContent>
                <h3 className="text-muted-foreground">Humidity</h3>
                <div className="flex items-center mt-2">
                  <Droplets className="h-8 w-8 mr-2" />
                  <span className="text-2xl">
                    {weatherData.hourly.relative_humidity_2m[0]}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </CardItem>

          <CardItem
            translateZ="100"
            translateY="20"
            translateX="-20"
            rotateX="20"
            rotateY="20"
          >
            <Card
              className="p-4 cursor-pointer"
              onClick={openTemperatureDrawer}
            >
              <CardContent>
                <h3 className="text-muted-foreground">Temperature Range</h3>
                <div className="text-2xl mt-2">
                  {convertTemperature(
                    Math.min(...weatherData.hourly.temperature_2m.slice(0, 24))
                  )}
                  ° -{' '}
                  {convertTemperature(
                    Math.max(...weatherData.hourly.temperature_2m.slice(0, 24))
                  )}
                  °
                </div>
                <Button variant="link" className="p-0 h-auto mt-2">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </CardItem>

          <CardItem
            translateZ="1000"
            translateY="20"
            translateX="-20"
            rotateX="360"
            rotateY="20"
            className="duration-500 z-100"
          >
            <Card className="p-4">
              <CardContent>
                <h3 className="text-muted-foreground">Feels Like</h3>
                <div className="text-2xl mt-2">
                  {convertTemperature(currentTemp)}°
                </div>
              </CardContent>
            </Card>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}
