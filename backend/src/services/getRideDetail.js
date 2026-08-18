import axios from 'axios'
const TOKEN = "pk.a7c03350869b92f19175e53d1ae42f4c"
// export const getTime = async () => {}
export const getAddressCoordinate = async (address) => {
    const url = `https://us1.locationiq.com/v1/search?key=${TOKEN}&q=${encodeURIComponent(address)}&format=json`
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error('Error fetching coordinates:', error)
        throw error
    }
}

export const getDistance = async ({ pickupLat, pickupLong, destinationLat, destinationLong }) => {
    const url = `https://us1.locationiq.com/v1/directions/driving/${pickupLong},${pickupLat};${destinationLong},${destinationLat}?key=${TOKEN}&alternatives=true&steps=true&geometries=geojson&overview=full&annotations=true`;
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        throw new Error("Error in getDistance", error)
    }
}
export const getSuggestion = async (query) => {
    const url = ` https://api.locationiq.com/v1/autocomplete?key=${TOKEN}&q=${query}`
    try {
        const response = await axios.get(url)
        return response.data

    } catch (error) {
        throw new Error("Error in getSuggestion " , error)
    }

}
