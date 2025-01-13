import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { City } from '@/actions/search-cities'

interface FavoriteCitiesProps {
  favoriteCities: City[]
  handleCitySelect: (city: City) => void
}

export function FavoriteCities({
  favoriteCities,
  handleCitySelect,
}: FavoriteCitiesProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl">Favorite Cities</h2>
        <Button variant="ghost" className="text-sm text-muted-foreground">
          Show All
        </Button>
      </div>
      <div className="space-y-4">
        {favoriteCities.map((city) => (
          <Card key={city.name}>
            <CardContent className="p-0 flex items-center justify-between">
              <Button
                variant="ghost"
                className="h-full w-full p-4"
                onClick={() => handleCitySelect(city)}
              >
                <div>
                  <div>{city.name}</div>
                  <div className="text-sm text-muted-foreground">{`H${city.lat}° L${city.lng}°`}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl">🌡️</div>
                  <div className="text-xl">{69}</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
