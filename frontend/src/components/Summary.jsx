import { MapPinHouse, MapPinCheckInside, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { buttonStyle } from "../utils/classes";
import bikeImage from "../assets/images/bike.png";
import autoImage from "../assets/images/auto.png";
import carImage from "../assets/images/car.svg";
const Summary = ({panelStates}) => {
  const navigate = useNavigate();
  const { ride } = panelStates;
  const captain = ride?.captain;
  const vehicle = captain?.vehicle;
  const riderName = [captain?.fullName?.firstName, captain?.fullName?.lastName]
    .filter(Boolean)
    .join(" ") || "Rider";
  const vehicleType = vehicle?.vehicleType || "car";
  const vehicleName = vehicleType === "rickshaw" ? "Auto" : vehicleType;
  const vehicleImage = vehicleType === "bike"
    ? bikeImage
    : vehicleType === "auto"
      ? autoImage
    : vehicleType === "car" 
    ? carImage
    : undefined
    

  return (
    <section className="px-4 h-full flex flex-col">
      <div className="flex justify-between py-4 items-center ">
        <img
          src={vehicleImage}
          alt={vehicleName}
          className="w-30 object-contain "
        />
        {/* Details */}
        <div className="flex flex-col items-end">
          <h4 className="text-base">{riderName}</h4>
          <h2 className="text-xl tracking-wide font-semibold">{vehicle?.plate || "Plate unavailable"}</h2>
          <p className="text-sm text-gray-500">Your otp is <b>{ride?.otp}</b></p>
        </div>
      </div>
      {/* Pickup  */}
      <div className="border-b border-gray-300 flex gap-4 items-center p-2 mt-4">
        <MapPinCheckInside />
        <div>
          <h3 className="text-[12px] tracking-wide font-semibold">{ride?.pickup || "Pickup unavailable"}</h3>
          <h6 className="text-xs text-gray-500">Pickup location</h6>
        </div>
      </div>
      {/* Destination  */}
      <div className="border-b border-gray-300 flex gap-4 items-center p-2 my-3">
        <MapPinHouse />
        <div>
          <h3 className="text-[12px] tracking-wide font-semibold">{ride?.destination || "Destination unavailable"}</h3>
          <h6 className="text-xs text-gray-500">Destination</h6>
        </div>
      </div>
      {/* Cash */}
      <div className="border-b border-gray-300 flex gap-4 items-center p-2 mb-4">
        <Wallet />
        <div>
          <h3 className="text-[18px] tracking-wide font-semibold">Rs {ride?.fare ?? "-"}</h3>
          <h6 className="text-xs text-gray-500">Cash</h6>
        </div>
      </div>
      {panelStates.showButton && (
        <button className={buttonStyle} onClick={() => navigate("/home")}>
          Make Payment
        </button>
      )}
    </section>
  );
};

export default Summary;
