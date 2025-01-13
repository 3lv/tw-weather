import { client } from '@/lib/pexels'
export async function fetchCityImage(
  cityName: string,
  weather: string,
  isNight?: boolean,
) {
  let query = ''
    .concat(cityName, ' buildings ')
    .concat(weather, ' ')
    .concat(isNight ? 'night' : '')
  const queryAlt1 = ''
    .concat(cityName, ' building ')
    .concat(weather, ' ')
    .concat(isNight ? 'night' : '')
  if (cityName === 'Bucharest') {
    query = queryAlt1
  }
  const response = await client.photos.search({
    query,
    per_page: 1,
  })
  console.log('DEBUG fetchCityImage:', query, response)
  if ('photos' in response && Array.isArray(response.photos)) {
    return response.photos[0].src.original
  } else {
    return 'https://img.freepik.com/free-vector/circles-background-dark-tones_60389-166.jpg?semt=ais_hybrid'
  }
}
