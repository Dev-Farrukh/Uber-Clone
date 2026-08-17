import { validationResult } from "express-validator"
import { getAddressCoordinate } from "../services/getRideDetail"

export const getCoordinate = async (req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() })
    }
    const { address } = req.body
    const response = await getAddressCoordinate(address)
    res.json(response)
}