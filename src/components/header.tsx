'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Settings, Bell } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { CitySearch } from '@/components/city-search'
import { ThemeToggle } from '@/components/theme-toggle'
import { City } from '@/actions/search-cities'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
interface HeaderProps {
  selectedCity: City
  onCitySelect: (city: City | null) => void
  tempUnit: '°C' | '°F'
  setTempUnit: (unit: '°C' | '°F') => void
  tempPrecision: number
  setTempPrecision: (precision: number) => void
}
export function Header({
  selectedCity,
  onCitySelect,
  tempUnit,
  setTempUnit,
  tempPrecision,
  setTempPrecision,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const headerVariants = {
    initial: {
      borderRadius: '0px',
      width: '100%',
      left: '0%',
      right: '0%',
      top: '0px',
      boxShadow: 'none',
    },
    scrolled: {
      borderRadius: '9999px',
      width: 'calc(100% - 64px)',
      left: '32px',
      right: '32px',
      top: '16px',
    },
  }
  const opacity = useTransform(scrollY, [0, 100], [1, 0.98])
  const scale = useTransform(scrollY, [0, 100], [1, 0.98])
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])
  return (
    <motion.header
      className="fixed z-50 w-full"
      initial="initial"
      animate={isScrolled ? 'scrolled' : 'initial'}
      variants={headerVariants}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${isScrolled ? 'px-6 rounded-full' : 'px-4'}`}
        style={{ opacity, scale }}
      >
        <div
          className={`flex h-16 items-center ${isScrolled ? 'justify-between' : ''}`}
        >
          {/* Logo Section */}
          <div className="flex flex-none items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2 text-2xl text-primary">
              🌐
            </div>
            {!isScrolled && (
              <span className="text-lg font-semibold tracking-tight">
                Weather
              </span>
            )}
          </div>
          {/* Centered Search Section with enhanced styling */}
          <div
            className={`${isScrolled ? 'absolute left-1/2 w-full max-w-md -translate-x-1/2 transform' : 'absolute left-1/2 w-full max-w-md -translate-x-1/2 transform'} px-4`}
          >
            <div className="relative">
              <CitySearch
                selectedCity={selectedCity}
                onCitySelect={onCitySelect}
              />
            </div>
          </div>
          {/* Action Section with new notifications */}
          <div
            className={`flex flex-1 items-center ${isScrolled ? 'justify-end' : 'justify-end'} gap-4`}
          >
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </Button>

            <ThemeToggle />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={tempUnit === '°F'}
                        onCheckedChange={(checked) =>
                          setTempUnit(checked ? '°F' : '°C')
                        }
                      />
                      <span>Temperature Unit</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {tempUnit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={tempPrecision === 1}
                        onCheckedChange={(checked) =>
                          setTempPrecision(checked ? 1 : 0)
                        }
                      />
                      <span>Temperature Precision</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {tempPrecision}
                    </span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            {!isScrolled && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>TW</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">Tehnologii Web</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Favorites</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}
