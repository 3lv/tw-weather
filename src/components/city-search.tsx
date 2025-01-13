'use client'

import { useState, useEffect, useCallback } from 'react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { searchCities, City } from '@/actions/search-cities'

interface CitySearchProps {
  selectedCity: City | null
  onCitySelect: (city: City | null) => void
}

export function CitySearch({ selectedCity, onCitySelect }: CitySearchProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)

  const debouncedSearch = useCallback((value: string) => {
    if (value.length < 3) {
      setCities([])
      return
    }

    setLoading(true)
    searchCities(value)
      .then((results) => {
        setCities(results || [])
      })
      .catch((error) => {
        console.error('Error in searchCities:', error)
        setCities([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchValue, debouncedSearch])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {selectedCity ? selectedCity.label : 'Select city...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        {/* @ts-ignore */}
        <Command>
          <CommandInput
            // @ts-ignore
            placeholder={selectedCity ? selectedCity.label : 'Search city...'}
            value={searchValue}
            onValueChange={(newValue: string) => {
              setSearchValue(newValue)
            }}
          />
          {loading && (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </div>
          )}
          {/* @ts-ignore */}
          <CommandList>
            {/* @ts-ignore */}
            <CommandEmpty>No city found.</CommandEmpty>
            {/* @ts-ignore */}
            <CommandGroup>
              {cities.map((city, index) => (
                /* @ts-ignore */
                <CommandItem
                  key={`${city.label}-${index}`}
                  value={city.label}
                  onSelect={(currentValue: string) => {
                    if (currentValue === selectedCity?.label) {
                      onCitySelect(null)
                    } else {
                      const city =
                        cities.find((city) => city.label == currentValue) ||
                        null
                      onCitySelect(city)
                    }
                    setOpen(false)
                  }}
                >
                  {city.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedCity && selectedCity.label === city.label
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
