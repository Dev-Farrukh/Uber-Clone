import { headingStyle } from "../utils/classes"
import { ChevronDown, MapPinHouse, MapPinCheckInside, Wallet } from "lucide-react"

const LookingForRider = ({ panelStates }) => {
    const { pickup, destination, selectedVehicle, vehicleData } = panelStates
    const fare = vehicleData?.data?.fare?.calculatedFare?.[selectedVehicle?.type]

    return (
        <section className="px-4 h-full flex flex-col">
            <ChevronDown onClick={() => panelStates.setLookingforRider(false)}
                className="cursor-pointer text-gray-600 hover:text-black transition-colors mx-auto my-2 " />

            <h1 className={headingStyle}>Looking For Rider</h1>
            <img src={selectedVehicle?.image || "/src/assets/images/bike.png"}
                alt={selectedVehicle?.name || "Bike"}
                className="w-[30%] object-contain mx-auto "
            />
            <div className="w-40 h-8 bg-yellow-100 rounded-full mx-auto mt-3 relative overflow-hidden" >
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-16 rounded-full bg-yellow-400 animate-loading" />
        </div>

            {/* Pickup  */}
            <div className="border-b border-gray-300 flex gap-4 items-center p-2 mt-4">
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
        </section>
    )
}

export default LookingForRider