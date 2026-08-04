import { headingStyle , buttonStyle} from "../utils/classes"
import { ChevronDown , MapPinHouse , MapPinCheckInside ,Wallet} from "lucide-react"


const ConfirmRide = ({ panelStates }) => {
    return (
        <section className="px-4 h-full flex flex-col">
            <ChevronDown onClick={() => panelStates.setConfirmRideOpen(false)}
                className="cursor-pointer text-gray-600 hover:text-black transition-colors mx-auto my-2 " />

            <h1 className={headingStyle}>Confirm your Ride</h1>
             <img src={'src/assets/images/bike.png'}
                        alt="Bike"
                        className="w-[30%] object-contain mx-auto "
            />
            {/* Pickup  */}
            <div className="border-b border-gray-300 flex gap-4 items-center p-2">
                <MapPinCheckInside />
                <div>
                    <h3 className="text-[18px] tracking-wide  font-semibold">B-564 , Sector 35/A</h3>
                    <h6 className="text-xs text-gray-500">Umar Farooq Masjid , Korangi</h6>
                </div>
            </div> 
            {/* Destination  */}
             <div className="border-b border-gray-300 flex gap-4 items-center p-2 my-3">
                <MapPinHouse />
                <div>
                    <h3 className="text-[18px] tracking-wide  font-semibold">D-484 , Sector 25/D</h3>
                    <h6 className="text-xs text-gray-500">The Educators School , Korangi</h6>
                </div>
            </div> 
            {/* Cash */}
             <div className="border-b border-gray-300 flex gap-4 items-center p-2 mb-4">
                <Wallet />
                <div>
                    <h3 className="text-[18px] tracking-wide  font-semibold">4563.66</h3>
                    <h6 className="text-xs text-gray-500">Karachi</h6>
                </div>
            </div> 
            <button className={buttonStyle}> Confirm Ride</button>
        </section>

    )
}

export default ConfirmRide