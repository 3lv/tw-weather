'use client'

import * as React from "react"
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { City } from '@/actions/search-cities'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { searchCities } from "@/actions/search-cities"

interface CitySearchProps {
	selectedCity: City
  onCitySelect?: (city: City) => void
}

export function CitySearch({selectedCity, onCitySelect}: CitySearchProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [cities, setCities] = React.useState<City[]>([])
  const [loading, setLoading] = React.useState(false)

  const debouncedSearch = React.useCallback(
    (value: string) => {
      console.log("Debounced search called with value:", value)
      if (value.length < 3) {
        console.log("Search value too short, clearing cities")
        setCities([])
        return
      }
      
      setLoading(true)
      searchCities(value)
        .then((results) => {
          console.log("Search results:", results)
          setCities(results)
        })
        .catch((error) => {
          console.error("Error in searchCities:", error)
          setCities([])
        })
        .finally(() => {
          setLoading(false)
        })
    },
    []
  )

  React.useEffect(() => {
    console.log("useEffect triggered with value:", value)
    const timer = setTimeout(() => {
      debouncedSearch(value)
    }, 300)

    return () => clearTimeout(timer)
  }, [value, debouncedSearch])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {selectedCity ? selectedCity.label : "Search city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder={"Search city..."}
            className="h-9"
            value={value}
            onValueChange={(newValue: string) => {
              console.log("Input value changed:", newValue)
              setValue(newValue)
            }}
          />
          {loading && (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Searching...
            </div>
          )}
          <CommandEmpty className="text-muted-foreground">No city found.</CommandEmpty>
          <CommandGroup>
            {cities.map((city) => (
              <CommandItem
                key={city.label}
                value={city.label}
                onSelect={(selectedCity: City) => {
                  console.log("City selected:", selectedCity)
                  setValue(selectedCity.name)
                  onCitySelect?.(selectedCity)
                  setOpen(false)
                }}
              >
                {city.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === city.label ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
