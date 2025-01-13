export interface City {
  lat: number
  lng: number
  name: string
  label: string
}

export async function searchCities(search: string): Promise<City[]> {
  console.log('Searching for:', search)
  if (search.length < 3) {
    console.log('Search string too short, returning empty array')
    return []
  }

  try {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?name_startsWith=${search}&maxRows=5&username=yomer&cities=cities15000`
    )
    const data = await response.json()

    console.log('API response:', data)

    if (!data.geonames || !Array.isArray(data.geonames)) {
      console.error('Unexpected API response structure:', data)
      return []
    }

    return data.geonames.map(
      (city: {
        lng: string
        lat: string
        name: string
        countryCode: string
      }) => ({
        lng: city.lng,
        lat: city.lat,
        value: `${city.name}`,
        label: `${city.name}, ${city.countryCode}`,
      })
    )
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}
