import { ChevronDown, Info, MapPinHouse } from "lucide-react";
import { buttonStyle, headingStyle } from "../utils/classes";

const FinishRide = ({ panelStates }) => {
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
            "https://imgs.search.brave.com/Z74aCVY8Mb-9zXX5UBejAdWTH1YLxOq6r7v7EKm0oAY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9yYW5kb20t/d2hpdGUtcGVyc29u/LWNpcmNsZS1wcm9m/aWxlLTI2MG53LTI1/OTg2MDc0NDcuanBn"
          }
          alt="PP"
          className="size-15 rounded-full object-contain "
        />
        <h2 className="text-xl tracking-wide font-semibold">Jimmy Rose</h2>
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
      <button
        className={buttonStyle}
        onClick={() => {
          panelStates.setLookingforRider(true);
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
