import { ChevronDown, Info, MapPinHouse } from "lucide-react";
import { buttonStyle, headingStyle } from "../utils/classes";
import apiClient from "../api/axiosClient.js";
import { useNavigate } from "react-router-dom";

const FinishRide = ({ panelStates }) => {
  const navigate = useNavigate()
  async function endRide() {
    const response = await apiClient.post("end-ride", {
      rideId: panelStates?.ride?._id,
    })
    if(response.status === 200){
      panelStates.setFinishRide(false)
      panelStates.setRide(null)
      navigate("/rider")
      
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
          src={
            "https://imgs.search.brave.com/vETsjfyRHQZNvoyfI26SD9n2agjVrTIrEHeZDpKFRjA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vcG9ydHJhaXQt/cGVyc29uLW1hbi0z/MHMtYmxvbmRlLWhh/aXIteWVsbG93LWds/YXNzZXMtYnJpZ2h0/LWNvbG9yZnVsLWNs/b3RoZXMtc2xpZ2h0/LXNtaWxlXzExOTg5/MTktMzc3LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA"
          }
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
          panelStates.setLookingforRider(true);
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
