import { validationResult } from "express-validator"
import { getAddressCoordinate, getDistance, getSuggestion } from "../services/getRideDetail.js"

export const getCoordinate = async (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() })
    }
    const { address } = req.query
    const response = await getAddressCoordinate(address)
    res.json(response)
}

export const getTotalDistance = async (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() })
    }
    const { pickupLat, pickupLong, destinationLat, destinationLong } = req.query
    const response = await getDistance({pickupLat, pickupLong, destinationLat, destinationLong})
    res.json(response)
}

export const getAutoCompleteSuggestion = async (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() })
    }
    const { input } = req.query
    const response = await getSuggestion(input)
    res.json(response)
}