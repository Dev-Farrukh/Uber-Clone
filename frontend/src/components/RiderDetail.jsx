import { BookCheck, Clock, Gauge } from "lucide-react";
import profileAvatar from "../assets/images/profile-avatar.svg";

const RiderDetail = () => {
  return (
    <div>
      <div className="flex justify-between p-4 items-center">
        <div className="flex gap-2 items-center justify-center flex-row">
          <img
            src={profileAvatar}
            alt="PP"
            className="size-15 rounded-full object-contain "
          />
          <h2 className="text-xl tracking-wide font-semibold">Jimmy Rose</h2>
          
        </div>
        
        <div className="flex flex-col items-end">
          <h2 className="text-xl tracking-wide font-semibold">
            Rs 10 ,234
          </h2>
          <p className="text-sm text-gray-500"> Total earned</p>
        </div>
      </div>

      {/* Stats  */}
      <div className="bg-gray-50 my-4 flex justify-evenly items-center rounded-md">
        <div className="flex justify-center flex-col px-4 py-6 items-center gap-2 ">
          <Clock className="text-[#edaf10] size-10 "/>
          <h2 className="text-lg font-semibold">14 Hours</h2>
          <p className="text-gray-800 text-center text-sm"> Hours Online </p>
        </div>
        <div className="flex justify-center flex-col px-4 py-6 items-center gap-2 ">
          <Gauge className="text-[#edaf10] size-10 "/>
          <h2 className="text-lg font-semibold">8.9 KM </h2>
          <p className="text-gray-800 text-center text-sm"> Distance Traveled </p>
        </div>
        <div className="flex justify-center flex-col px-4 py-6 items-center gap-2 ">
          <BookCheck className="text-[#edaf10] size-10 "/>
          <h2 className="text-lg font-semibold">7</h2>
          <p className="text-gray-800 text-center text-sm"> Rides Today </p>
        </div>
      </div>
    </div>
  );
};

export default RiderDetail;
