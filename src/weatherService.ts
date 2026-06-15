export interface Coords {
lat: number;
lon: number;
}

export const fetchData = async ({ lat, lon }: Coords) => {
const response = await fetch(
    `https://my.meteoblue.com/packages/basic-1h?lat=${lat}&lon=${lon}&tz=UTC&apikey=t3GXCgj0wFlNd2R7`
);
if (!response.ok) {
    throw new Error('Error with fetch');
}
return response;
};

export const getCoordsByName = async (cityName: string) => {
const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`
);
const data = await res.json();

if (!data || data.length === 0) {
    throw new Error('City not found');
}

return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
};