import { useState } from "react"
import { headingStyle, buttonStyle } from "../utils/classes"
import { ChevronDown, MapPinHouse, MapPinCheckInside, Wallet } from "lucide-react"


const ConfirmRide = ({ panelStates }) => {
    const [isCreatingRide, setIsCreatingRide] = useState(false)
    const [error, setError] = useState("")
    const { pickup, destination, selectedVehicle, vehicleData } = panelStates
    const fare = vehicleData?.data?.fare?.calculatedFare?.[selectedVehicle?.type]

    const handleConfirmRide = async () => {
        setIsCreatingRide(true)
        setError("")

        try {
            await panelStates.createRide()
            panelStates.setLookingforRider(true)
            panelStates.setConfirmRideOpen(false)
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not create the ride. Please try again.")
        } finally {
            setIsCreatingRide(false)
        }
    }
    return (
        <section className="px-4 h-full flex flex-col">
            <ChevronDown onClick={() => panelStates.setConfirmRideOpen(false)}
                className="cursor-pointer text-gray-600 hover:text-black transition-colors mx-auto my-2 " />

            <h1 className={headingStyle}>Confirm your Ride</h1>
             <img src={selectedVehicle?.image}
                        alt={selectedVehicle?.name}
                        className="w-[30%] object-contain mx-auto "
            />
            {/* Pickup  */}
            <div className="border-b border-gray-300 flex gap-4 items-center p-2">
                <MapPinCheckInside />
                <div>
                    <h3 className="text-[12px] tracking-wide font-semibold">{pickup}</h3>
                    <h6 className="text-xs text-gray-500">Pickup location</h6>
                </div>
            </div> 
            {/* Destination  */}
             <div className="border-b border-gray-300 flex gap-4 items-center p-2 my-3">
                <MapPinHouse />
                <div>
                    <h3 className="text-[12px] tracking-wide font-semibold">{destination}</h3>
                    <h6 className="text-xs text-gray-500">Destination</h6>
                </div>
            </div> 
            {/* Cash */}
             <div className="border-b border-gray-300 flex gap-4 items-center p-2 mb-4">
                <Wallet />
                <div>
                    <h3 className="text-[18px] tracking-wide font-semibold">Rs {fare}</h3>
                    <h6 className="text-xs text-gray-500">Cash</h6>
                </div>
            </div> 
              {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
              <button className={buttonStyle} disabled={isCreatingRide} onClick={handleConfirmRide}>
                  {isCreatingRide ? "Creating ride..." : "Confirm Ride"}
            </button>
        </section>

    )
}

export default ConfirmRide