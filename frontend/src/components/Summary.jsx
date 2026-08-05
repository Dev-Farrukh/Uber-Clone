import { MapPinHouse, MapPinCheckInside, Wallet } from "lucide-react";
import { buttonStyle } from "../utils/classes";
const Summary = ({panelStates}) => {
  
  return (
    <section className="px-4 h-full flex flex-col">
      <div className="flex justify-between py-4 items-center ">
        <img
          src={"src/assets/images/bike.png"}
          alt="Bike"
          className="w-30 object-contain "
        />
        {/* Details */}
        <div className="flex flex-col items-end">
          <h4 className="text-base"> Ali Jabbar</h4>
          <h2 className="text-xl tracking-wide font-semibold"> MP40 - AB 1234</h2>
          <p className="text-sm text-gray-500"> Suzuki Alto</p>
        </div>
      </div>
      {/* Pickup  */}
      <div className="border-b border-gray-300 flex gap-4 items-center p-2 mt-4">
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
      <div className="border-b border-gray-300 flex gap-4 items-center p-2 my-3">
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
      <div className="border-b border-gray-300 flex gap-4 items-center p-2 mb-4">
        <Wallet />
        <div>
          <h3 className="text-[18px] tracking-wide  font-semibold">4563.66</h3>
          <h6 className="text-xs text-gray-500">Karachi</h6>
        </div>
      </div>
      {panelStates.showButton && <button className={buttonStyle}> Make Payment</button>}
    </section>
  );
};

export default Summary;
