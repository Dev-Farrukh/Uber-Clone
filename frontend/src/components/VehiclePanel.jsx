import { ChevronDown, User } from "lucide-react"
import { headingStyle } from "../utils/classes"
import bikeImage from "../assets/images/bike.png"
import autoImage from "../assets/images/auto.png"

const VehiclePanel = ({ panelStates }) => {
  const isLoading = panelStates?.isFareLoading || !panelStates?.vehicleData?.data?.fare;
  const fareData = panelStates?.vehicleData?.data?.fare;

  const vehicles = [
    {
      type: "bike",
      name: "Bike",
      capacity: 1,
      eta: "10 mins away",
      description: "Fast Ride",
      image: bikeImage,
      fare: fareData?.calculatedFare?.bike
    },
    {
      type: "auto",
      name: "Auto",
      capacity: 3,
      eta: "7 mins away",
      description: "Comfortable ride",
      image: autoImage,
      fare: fareData?.calculatedFare?.auto
    },
    {
      type: "car",
      name: "Car",
      capacity: 4,
      eta: "1 min away",
      description: "Smooth ride",
      image: carImage,
      fare: fareData?.calculatedFare?.car
    }
  ];

  return (
    <section className="px-4 h-full flex flex-col">
      <ChevronDown
        onClick={() => {
          panelStates.setVehiclePanelOpen(false);
          panelStates.setFareApi(false);
        }}
        className="cursor-pointer text-gray-600 hover:text-black transition-colors mx-auto my-2"
      />

      <h1 className={headingStyle}>Choose a Vehicle</h1>

      {/* Options Section */}
      <div className="overflow-auto py-1 my-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.type}
            onClick={() => {
              if (!isLoading) {
                panelStates.setSelectedVehicle(vehicle);
                panelStates.setConfirmRideOpen(true);
              }
            }}
            className={`flex my-2 items-center border-2 rounded-md border-gray-300 px-2 py-4 ${
              isLoading ? "cursor-wait opacity-80" : "cursor-pointer hover:border-black"
            } transition-all`}
          >
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-[30%] object-contain pr-2 h-16"
            />
            <div className="flex flex-col flex-3">
              <div className="flex gap-1 pt-2">
                <h3 className="text-[20px] font-semibold">{vehicle.name}</h3>
                <div className="flex gap-1 items-center">
                  <User strokeWidth={3} size={16} />
                  <span className="font-semibold">{vehicle.capacity}</span>
                </div>
              </div>
              <h6 className="text-sm text-gray-800">{vehicle.eta}</h6>
              <p className="text-xs text-gray-500">{vehicle.description}</p>
            </div>

            {/* Fare Price or Skeleton Loader */}
            <div className="flex-2 flex justify-end">
              {isLoading ? (
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <h3 className="text-lg font-bold">Rs {vehicle.fare}</h3>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VehiclePanel;