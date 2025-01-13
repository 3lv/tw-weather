import Image from 'next/image'
import { fetchCityImage } from '@/actions/city-image'
import { useEffect, useState, useMemo, memo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { cn } from '@/lib/utils'

interface CityImageProps {
  cityName: string
  className?: string
  weatherCode: number
  isNight: boolean
  children: React.ReactNode
}

export function CityImage({
  cityName,
  className,
  weatherCode,
  isNight,
  children,
}: CityImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const { scrollY } = useScroll()

  const scale = useTransform(scrollY, [0, 300], [1.1, 1])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const blur = useTransform(scrollY, [0, 300], [0, 5])

  useEffect(() => {
    async function loadCityImage() {
      try {
        const url = await fetchCityImage(cityName, weatherCode, isNight)
        setImageUrl(url)
      } catch (error) {
        console.error('Failed to load city image:', error)
      }
    }

    loadCityImage()
  }, [cityName, weatherCode, isNight])

  return (
    <div className={cn('relative w-full h-screen overflow-hidden', className)}>
      <motion.div
        style={{
          scale,
          opacity,
          filter: `blur(${blur.get()}px)`,
        }}
        className="absolute inset-0"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={cityName}
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        )}
      </motion.div>

      {/* Weather Overlay Animations */}
      <WeatherOverlay weatherCode={weatherCode} isNight={isNight} />

      {children}
    </div>
  )
}

function WeatherOverlay({
  weatherCode,
  isNight,
}: {
  weatherCode: number
  isNight: boolean
}) {
  const getWeatherElements = () => {
    if (weatherCode >= 95 && weatherCode <= 99) {
      return <ThunderstormOverlay />
    } else if (
      (weatherCode >= 51 && weatherCode <= 57) ||
      (weatherCode >= 61 && weatherCode <= 67) ||
      (weatherCode >= 80 && weatherCode <= 82)
    ) {
      return <RainOverlay />
    } else if (
      (weatherCode >= 71 && weatherCode <= 77) ||
      (weatherCode >= 85 && weatherCode <= 86)
    ) {
      return <SnowOverlay />
    } else if (weatherCode === 45 || weatherCode === 48) {
      return <FogOverlay />
    } else if (weatherCode === 0 || weatherCode === 800) {
      return isNight ? <NightOverlay /> : <SunnyOverlay />
    } else if (weatherCode >= 1 && weatherCode <= 3) {
      const cloudDensity = Math.pow(weatherCode, 2) * 10 // Calculate cloud density
      return <CloudyOverlay clouds={cloudDensity} />
    } else {
      return <SunnyOverlay />
    }
  }
  return (
    <div className="absolute inset-0 pointer-events-none">
      {getWeatherElements()}
    </div>
  )
}

function ThunderstormOverlay() {
  const thunderVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1.2, rotate: [0, -15, 15, 0] },
    exit: { opacity: 0, scale: 0.5 },
  }

  const flyingImageVariants = {
    initial: { opacity: 0, x: '-100vw', rotate: -45 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    exit: { opacity: 0, x: '100vw', rotate: 45 },
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 overflow-hidden">
      {/* Scary white background pulse */}
      <div className="absolute inset-0 bg-white opacity-10 animate-pulse-fast" />

      {/* Thunder emojis */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-6xl text-yellow-500"
        variants={thunderVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        ⚡
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/3 text-6xl text-yellow-500"
        variants={thunderVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.7,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        ⚡
      </motion.div>

      {/* Lightning McQueen Car */}
      <motion.img
        src="https://toppng.com/uploads/preview/lightning-mcqueen-lightning-mcqueen-clipart-11563265704fcfsnw740b.png"
        alt="Lightning McQueen"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-40"
        initial={{ opacity: 0, x: '-100vw' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100vw' }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />

      {/* Flying POW! Image */}
      <motion.img
        src="https://i.pinimg.com/originals/9a/28/a9/9a28a9f78b3e0cf3628d3b9781ca189d.png"
        alt="POW!"
        className="absolute top-1/4 left-10 w-24"
        variants={flyingImageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 1.5,
          delay: 0.5,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 overflow-hidden">
        {/* Lightning McQueen Car */}
        <motion.img
          src="/mcqueen.png"
          alt="Lightning McQueen"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-vh animate-mcqueen"
          initial={{ opacity: 1, x: '100vh' }}
          animate={{ opacity: 1, x: '-200vw' }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      </div>
    </div>
  )
}

function RainOverlay() {
  return (
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-8 bg-blue-200 opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ['0%', '100%'],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function SnowOverlay() {
  return (
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ['0%', '100%'],
            x: ['-10%', '10%'],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

function NightOverlay() {
  return (
    <div className="absolute inset-0 bg-blue-900 opacity-30">
      {/* Moon */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-yellow-100 rounded-full opacity-80 shadow-lg" />

      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function SunnyOverlay() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-30 animate-pulse" />
    </div>
  )
}

const CloudyOverlay = memo(({ clouds }: { clouds: number }) => {
  const cloudProperties = useMemo(
    () =>
      Array.from({ length: clouds }).map(() => ({
        width: 100 + Math.random() * 100,
        height: 50 + Math.random() * 50,
        top: Math.random() * 20 - 3,
        left: Math.random() * 100,
        duration: 10 + Math.random() * 20,
      })),
    [clouds]
  )

  return (
    <div className="absolute inset-0">
      {cloudProperties.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute bg-white opacity-60 rounded-full"
          style={{
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
})

export default CloudyOverlay

function FogOverlay() {
  return (
    <div className="absolute inset-0">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-gradient-to-b from-gray-300 to-transparent opacity-70"
          animate={{
            y: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 10 + i * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
