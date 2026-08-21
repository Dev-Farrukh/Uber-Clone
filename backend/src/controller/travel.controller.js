import { validationResult } from "express-validator"
import { getAddressCoordinate, getDistance, getSuggestion } from "../services/getRideDetail.js"
import createRide, { generateFare, getRiderinRadius , confirmRide, rideStart, rideEnd } from "../services/createRide.js"
import { sendMessageToSocketId } from "../../socket.js"
import riderModel from "../model/rider.model.js"
import rideModel from "../model/ride.model.js"

export const getCoordinate = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    const { address } = req.query
    const response = await getAddressCoordinate(address)
    res.json(response)
}

export const getTotalDistance = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    const { pickupLat, pickupLong, destinationLat, destinationLong } = req.query
    const response = await getDistance({ pickupLat, pickupLong, destinationLat, destinationLong })
    res.json(response)
}

export const getAutoCompleteSuggestion = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    const { input } = req.query
    const response = await getSuggestion(input)
    res.json(response)
}

export const generateRide = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    const { vehicleType , pickup, destination } = req.query
    const user = req.user

    const pickupCoordinates = await getAddressCoordinate(pickup)
    if (!pickupCoordinates?.length) {
        return res.status(400).json({ message: "Could not find pickup coordinates" })
    }

    const pickupLocation = pickupCoordinates[0]
    const riderInRadius = await getRiderinRadius(pickupLocation.lat, pickupLocation.lon, 10)

    console.log("DSS",riderInRadius)
    const ride = await createRide({ vehicleType ,pickup, destination, user})
    ride.otp = ""
    const rideWithUser = await  rideModel.findOne({_id : ride._id}).populate('user')
    riderInRadius.map(captain => {
        sendMessageToSocketId(captain.socketId , {
            event : "new-ride",
            data : rideWithUser
        })
    })
    return res.status(201).json({
        message: " Ride created successfully",
        ride
    })
}

export const getFare = async (req , res ) => {
    const error = validationResult(req)
     if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }
    const { pickup, destination } = req.query
    try {
        const fare = await generateFare({pickup, destination})
        return res.status(200).json({
        message: "Fare fetched successfully",
        fare
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to calculate fare."
        });
        
    }
    



}

export const confirmThisRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        console.log('Confirming ride:', rideId, 'for rider:', req.rider._id);
        const ride = await confirmRide({ rideId, rider: req.rider });
        console.log('Ride confirmed:', ride._id, 'User socketId:', ride.user.socketId);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        console.error('Error confirming ride:', err);
        return res.status(500).json({ message: err.message });
    }
}

export const startRide = async (req, res) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideStart({ rideId, otp, captain: req.rider });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export const endRide = async (req, res) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId} = req.body
    try {
        const ride = await rideEnd({rideId , captain : req.rider})
        sendMessageToSocketId(ride.user.socketId , {
            event : "ride-ended",
            data : ride
        })
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({message : error.message })
    }
}