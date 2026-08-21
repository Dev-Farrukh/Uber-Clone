import { MapPinHouse, MapPinCheckInside, Wallet } from "lucide-react";
import { buttonStyle } from "../utils/classes";
const Summary = ({panelStates}) => {
  const { ride } = panelStates;
  const captain = ride?.captain;
  const vehicle = captain?.vehicle;
  const riderName = [captain?.fullName?.firstName, captain?.fullName?.lastName]
    .filter(Boolean)
    .join(" ") || "Rider";
  const vehicleType = vehicle?.vehicleType || "car";
  const vehicleName = vehicleType === "rickshaw" ? "Auto" : vehicleType;
  const vehicleImage = vehicleType === "bike"
    ? "/src/assets/images/bike.png"
    : vehicleType === "auto"
      ? "/src/assets/images/auto.png"
    : vehicleType === "car" 
    ? "https://imgs.search.brave.com/5dI1XjS7et0fBxAWF_crbf9sSiDgNk2YKJLK8PGvA5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E3LzQ0/L2JiL2E3NDRiYjY2/NDBjOTg1Y2Y3MjM5/NWFlN2M2MWYzZWVk/LmpwZw"
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
          <p className="text-sm text-gray-500">Your otp is <b>{ride.otp}</b></p>
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
      {panelStates.showButton && <button className={buttonStyle}> Make Payment</button>}
    </section>
  );
};

export default Summary;
