import { ChevronDown, Info, MapPinHouse } from "lucide-react";
import { buttonStyle, headingStyle } from "../utils/classes";
import apiClient from "../api/axiosClient.js";
import { useNavigate } from "react-router-dom";
import profileAvatar from "../assets/images/profile-avatar.svg";

const FinishRide = ({ panelStates }) => {
  const navigate = useNavigate()
  async function endRide() {
    const response = await apiClient.post("end-ride", {
      rideId: panelStates?.ride?._id,
    })
    if(response.status === 200){
      navigate("/rider")
      panelStates.setFinishRide(false)
      panelStates.setRide(null)
      
    }
  }
  
  return (
    <section className="px-4 h-full flex flex-col">
      <ChevronDown
        onClick={() => panelStates.setFinishRide(false)}
        className="cursor-pointer text-gray-600 hover:text-black transition-colors mx-auto my-2 "
      />

      <h1 className={headingStyle}>Finish Ride</h1>
      <div className="flex gap-2 items-center my-3 flex-row">
          <img
            src={profileAvatar}
          alt="PP"
          className="size-15 rounded-full object-cover "
        />
        <h2 className="text-xl tracking-wide font-semibold">{panelStates?.ride?.user?.fullName?.firstName}</h2>
      </div>

      {/* Destination  */}
      <div className="border-b border-gray-300 flex gap-4 items-center p-2 my-3">
        <MapPinHouse />
        <div>
          <h3 className="text-[18px] tracking-wide  font-semibold">
            {panelStates?.ride?.destination.split(" ").slice(0, 3).join(" ")}
          </h3>
          <h6 className="text-xs text-gray-500">
            {panelStates?.ride?.destination}
          </h6>
        </div>
      </div>
      <button
        className={buttonStyle}
        onClick={() => {
          endRide()
        }}
      >
        Finish
      </button>
      <h4 className="text-red-500 text-xs my-5 flex gap-2">
        <Info className="text-xs" size={15} />
        Only click above if you recives the complete payment
      </h4>
    </section>
  );
};

export default FinishRide;
