import { useState } from "react";
import Summary from "../../../components/Summary"
import { Link } from "react-router-dom"
import { House } from 'lucide-react';

const RiderLocation = () => {
  const [showButton , setShowButton] = useState(true)
  return (
    <div className="h-dvh relative">
      <Link to="/" className="bg-white text-[#edaf10] rounded-full size-10 mx-auto flex items-center justify-center absolute top-4 md:top-6 hover:bg-gray-100 right-4 md:size-14 z-10 outline-none border-2 ">
        <House strokeWidth={2.5} />
      </Link>
      <img
        src="/src/assets/images/yellow_logo.png"
        alt="Logo"
        fetchPriority="high"
        className="absolute top-4 left-4 w-12 md:w-14 z-10"
      />

      <div className="absolute inset-0">
        <img
          src="src/assets/images/map.png"
          alt="Map"
          className="h-full w-full object-cover"
        />
      </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg w-full rounded-t-3xl md:top-6 md:left-6 md:w-105 md:h-[80%] z-20 md:rounded-xl md:shadow-2xl">
            <Summary panelStates={{showButton , setShowButton}} />
        </div>
    </div>
  );
};

export default RiderLocation;
