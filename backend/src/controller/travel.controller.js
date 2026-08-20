import { validationResult } from "express-validator"
import { getAddressCoordinate, getDistance, getSuggestion } from "../services/getRideDetail.js"
import createRide, { generateFare } from "../services/createRide.js"

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
    console.log("DSS",user)
    const ride = await createRide({ vehicleType ,pickup, destination, user})
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