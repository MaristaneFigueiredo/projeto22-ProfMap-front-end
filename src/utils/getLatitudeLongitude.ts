import axios from 'axios'

type Coordinates = {
    latitude: number,
    longitude: number
}

async function getLatitudeLongitude(address: string): Promise<Coordinates> {
    const apiKey = process.env.REACT_APP_BINGMAP_KEY
    const {data} = await axios.get(`${process.env.REACT_APP_GET_COORDINATES_URL}?query=${address}&key=${apiKey}`)
    return {
        latitude: Number(data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0]),
        longitude: Number(data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1])
    }
}

export default getLatitudeLongitude