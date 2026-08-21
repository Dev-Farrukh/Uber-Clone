import { MapPinHouse, MapPinCheckInside, Wallet } from "lucide-react";
import { buttonStyle , headingStyle} from "../utils/classes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../api/axiosClient";
import toast from "react-hot-toast";
import profileAvatar from "../assets/images/profile-avatar.svg";

const RideAvailable = ({ panelStates }) => {
  const { ride } = panelStates
  const [otp , setOtp] = useState("")
  const [isConfirming, setIsConfirming] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const navigate = useNavigate()

  const riderName = [ride?.user?.fullName?.firstName, ride?.user?.fullName?.lastName]
    .filter(Boolean)
    .join(" ") || "User"

  const acceptRideHandler = async () => {
    setIsConfirming(true)
    try {
      await panelStates.confirmRideAPI()
      panelStates.setIsConfirm(true)
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to confirm ride")
    } finally {
      setIsConfirming(false)
    }
  }

  const confirmHandler = async (e) => {
    e.preventDefault()

    if (isStarting) return

    if (!otp || otp.length < 4 || otp.length > 6) {
      toast.error("Invalid OTP")
      return
    }

    try {
      setIsStarting(true)
      const response = await apiClient.get("start-ride", {
        params: {
          rideId: ride._id,
          otp
        }
      })

      if (response.status === 200) {
        console.log("response" , response);
        
        navigate("/riding", { state: { ride: response.data } })
      }
    } catch (error) {
      console.error("Error starting ride:", error)
      toast.error(error.response?.data?.message || "Invalid OTP")
    } finally {
      setIsStarting(false)
    }
  }

  return (
    <section className="px-4 h-full flex flex-col">
      <h1 className={`${headingStyle} my-3 pt-3 `}>{ panelStates.isConfirm ? "Confirm Ride" : "New Ride Available !!"} </h1>
      <div className="flex justify-between py-4 items-center bg-[#edaf10] px-3 rounded-md">
        <div className="flex gap-2 items-center justify-center  ">
          <img
            src={profileAvatar}
            alt="PP"
            className="size-15 rounded-full object-cover"
          />
          <h2 className="text-xl tracking-wide font-semibold text-white">{riderName}</h2>
        </div>

        <div className="flex flex-col items-end">
          <h2 className="text-xl tracking-wide font-semibold text-white">Rs {ride?.fare ?? "-"}</h2>
          <p className="text-sm text-gray-100">{ride?.distance ?? "-"} km</p>
        </div>
      </div>
      {/* Pickup  */}
      <div className="border-b border-gray-300 flex gap-4 items-center py-2 mt-4">
        <MapPinCheckInside />
        <div>
          <h3 className="text-[12px] tracking-wide  font-semibold">
            {ride?.pickup ?? "Pickup location"}
          </h3>
          <h6 className="text-xs text-gray-500">
            Pickup location
          </h6>
        </div>
      </div>
      {/* Destination  */}
      <div className="border-b border-gray-300 flex gap-4 items-center py-2 my-3">
        <MapPinHouse />
        <div>
          <h3 className="text-[12px] tracking-wide  font-semibold">
            {ride?.destination ?? "Destination"}
          </h3>
          <h6 className="text-xs text-gray-500">
            Destination
          </h6>
        </div>
      </div>
      {/* Cash */}
      <div className="border-b border-gray-300 flex gap-4 items-center py-2 mb-4">
        <Wallet />
        <div>
          <h3 className="text-[18px] tracking-wide  font-semibold">Rs {ride?.fare ?? "-"}</h3>
          <h6 className="text-xs text-gray-500">Cash</h6>
        </div>
      </div>
      <div className={`flex justify-end items-center gap-4 my-2 ${panelStates.isConfirm ? "flex-col" : "flex-row"} bg-white`}>
        {panelStates.isConfirm && 
          <input 
          type="text"  
          placeholder="Enter the Otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="flex-1 w-full border-2 border-gray-300 rounded-sm p-3 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EDAF10] focus:border-none"/>
        }
        {panelStates.isConfirm ?
        //  <Link className={`${buttonStyle} px-12 hover:bg-green-500 w-full text-center `} to="/riding" >Confirm</Link>
         <button disabled={isStarting} onClick={(e)=>confirmHandler(e)} className={`${buttonStyle} px-12 hover:bg-green-500 w-full text-center `} to="/riding" >
          {isStarting ? "Starting..." : "Confirm"}
          </button>
         :
         <button
          className={`${buttonStyle} px-12 hover:bg-green-500`}
          disabled={isConfirming}
          onClick={acceptRideHandler}
        >
          {isConfirming ? "Confirming..." : "Accept"}
        </button>
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
