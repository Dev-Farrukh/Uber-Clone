import { useState } from "react";
import { useLocation } from "react-router-dom";
import Summary from "../../../components/Summary"
import { Link } from "react-router-dom"
import { House } from 'lucide-react';
import { topIcon } from "../../../utils/classes";


const RiderLocation = () => {
  const [showButton , setShowButton] = useState(true)
  const { state } = useLocation()
  const ride = state?.ride
  return (
    <div className="h-dvh relative">
      <Link to="/" className={`${topIcon} right-4 `}>
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
            <Summary panelStates={{showButton , setShowButton, ride}} />
        </div>
    </div>
  );
};

export default RiderLocation;
