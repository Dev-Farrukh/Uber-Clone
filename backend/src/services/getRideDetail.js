import axios from 'axios'
// pk.a7c03350869b92f19175e53d1ae42f4c
export const getAddressCoordinate = async (address) => {
    const url = `https://us1.locationiq.com/v1/search?key=YOUR_API_KEY&q=${encodeURIComponent(address)}&format=json`
    try{
        const response = await axios.get(url)
        return response.data
    }catch(error){
        console.error('Error fetching coordinates:', error)
        throw error
    }
}

export const getTime = async () => {}
export const getDistance = async () => {}
export const getSuggestion = async () => {}
