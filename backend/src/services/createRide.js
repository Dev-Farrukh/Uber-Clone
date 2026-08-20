import rideModel from "../model/ride.model.js";
import { getAddressCoordinate, getDistance } from "./getRideDetail.js"
import crypto from "crypto"

export async function generateFare ({pickup , destination}){
    
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
   const baseFare = {
        bike: 30,  // Base starting price
        auto: 50,
        car: 100
    };

    const farePerMin = {
        bike: 2,
        auto: 3,
        car: 5
    };

    const farePerKm = {
        bike: 15,  
        auto: 25,
        car: 40
    };

    const origin = await getAddressCoordinate(pickup)
    await delay(500);
    const dropoff = await getAddressCoordinate(destination)
    await delay(500);
    console.log(origin[0]?.lat , origin[0]?.lon , dropoff[0]?.lat , dropoff[0]?.lon);

    if (!origin || origin.length === 0 || !dropoff || dropoff.length === 0) {
     throw new Error("Could not geocode one or both addresses. Please enter a valid location.");
    }
    
    const response = await getDistance({
    pickupLat: origin[0].lat,
    pickupLong: origin[0].lon,
    destinationLat: dropoff[0].lat,
    destinationLong: dropoff[0].lon
    });
    
    const route = response.routes[0];

    // Raw Values from LocationIQ / OSRM
    const rawDistanceMeters = route.distance; // 6732.1 meters
    const rawDurationSeconds = route.duration; // 604.7 seconds
    
    // Conversions
    const distanceInKm = (rawDistanceMeters / 1000).toFixed(2); // "6.73" km
    const durationInMins = Math.round(rawDurationSeconds / 60);

    console.log(distanceInKm , durationInMins);
    

    const calculatedFare = {
        bike: Math.round(baseFare.bike + (distanceInKm * farePerKm.bike) + (durationInMins * farePerMin.bike)),
        auto: Math.round(baseFare.auto + (distanceInKm * farePerKm.auto) + (durationInMins * farePerMin.auto)),
        car: Math.round(baseFare.car + (distanceInKm * farePerKm.car) + (durationInMins * farePerMin.car))
    };
    
    return {
        distanceKm: Number(distanceInKm),
        durationMin: durationInMins,
        calculatedFare
    };
}

export const generateOTP = (length) => {

    const min = Math.pow(10, length - 1); 
    const max = Math.pow(10, length) - 1;  
    const otp = crypto.randomInt(min, max + 1);
    return otp;
};

const createRide = async ({vehicleType , pickup , destination , user}) => {
    try {
        const {distanceKm , durationMin , calculatedFare} = await generateFare({pickup ,destination})
        const otp = generateOTP(5)
        
        let fare = calculatedFare[vehicleType]
        console.log({
            user : user._id ,
            pickup ,
            destination , 
            fare ,
            distance : distanceKm,
            duration : durationMin,
            otp
        });
        
        
        const ride = await rideModel.create({
            user : user._id ,
            pickup ,
            destination , 
            fare ,
            distance : distanceKm,
            duration : durationMin,
            otp
        })
        return ride
        
    } catch (error) {
        throw new Error(`Failed to create ride: ${error.message}`, { cause: error });
    } 
}

export default createRide