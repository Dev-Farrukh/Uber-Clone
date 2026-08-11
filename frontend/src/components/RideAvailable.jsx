import { MapPinHouse, MapPinCheckInside, Wallet } from "lucide-react";
import { buttonStyle , headingStyle} from "../utils/classes";
import { Link } from "react-router-dom";

const RideAvailable = ({ panelStates }) => {
  return (
    <section className="px-4 h-full flex flex-col">
      <h1 className={`${headingStyle} my-3 pt-3 `}>{ panelStates.isConfirm ? "Confirm Ride" : "New Ride Available !!"} </h1>
      <div className="flex justify-between py-4 items-center bg-[#edaf10] px-3 rounded-md">
        <div className="flex gap-2 items-center justify-center  ">
          <img
            src="https://imgs.search.brave.com/vETsjfyRHQZNvoyfI26SD9n2agjVrTIrEHeZDpKFRjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vcG9ydHJhaXQt/cGVyc29uLW1hbi0z/MHMtYmxvbmRlLWhh/aXIteWVsbG93LWds/YXNzZXMtYnJpZ2h0/LWNvbG9yZnVsLWNs/b3RoZXMtc2xpZ2h0/LXNtaWxlXzExOTg5/MTktMzc3LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA"
            alt="PP"
            className="size-15 rounded-full object-cover"
          />
          <h2 className="text-xl tracking-wide font-semibold text-white">Chris Parker</h2>
        </div>

        <div className="flex flex-col items-end">
          <h2 className="text-xl tracking-wide font-semibold text-white">Rs 450.24</h2>
          <p className="text-sm text-gray-100"> 2.2 km</p>
        </div>
      </div>
      {/* Pickup  */}
      <div className="border-b border-gray-300 flex gap-4 items-center py-2 mt-4">
        <MapPinCheckInside />
        <div>
          <h3 className="text-[18px] tracking-wide  font-semibold">
            B-564 , Sector 35/A
          </h3>
          <h6 className="text-xs text-gray-500">
            Umar Farooq Masjid , Korangi
          </h6>
        </div>
      </div>
      {/* Destination  */}
      <div className="border-b border-gray-300 flex gap-4 items-center py-2 my-3">
        <MapPinHouse />
        <div>
          <h3 className="text-[18px] tracking-wide  font-semibold">
            D-484 , Sector 25/D
          </h3>
          <h6 className="text-xs text-gray-500">
            The Educators School , Korangi
          </h6>
        </div>
      </div>
      {/* Cash */}
      <div className="border-b border-gray-300 flex gap-4 items-center py-2 mb-4">
        <Wallet />
        <div>
          <h3 className="text-[18px] tracking-wide  font-semibold">4563.66</h3>
          <h6 className="text-xs text-gray-500">Karachi</h6>
        </div>
      </div>
      <div className={`flex justify-end items-center gap-4 my-2 ${panelStates.isConfirm ? "flex-col" : "flex-row"} bg-white`}>
        {panelStates.isConfirm && 
          <input 
          type="text"  
          placeholder="Enter the Otp"
          className="flex-1 w-full border-2 border-gray-300 rounded-sm p-3 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EDAF10] focus:border-none"/>
        }
        {panelStates.isConfirm ?
         <Link className={`${buttonStyle} px-12 hover:bg-green-500 w-full text-center `} to="/riding" >Confirm</Link>
         :
         <button className={`${buttonStyle} px-12 hover:bg-green-500 `} onClick={()=> panelStates.setIsConfirm(true)} > Accept</button>
         }
        <button 
        className={`${buttonStyle} px-12 bg-gray-400 hover:bg-red-500 ${panelStates.isConfirm && "w-full"}`} 
        onClick={()=> {panelStates.setIsConfirm(false) ; panelStates.setRideAvailable(false) }}> 
          Ignore
        </button>

      </div>
      
    </section>
  );
};

export default RideAvailable;
