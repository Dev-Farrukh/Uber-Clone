import RiderDetail from "../../../components/RiderDetail";
import { Link } from "react-router-dom"
import { LogOut } from 'lucide-react';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RideAvailable from "../../../components/RideAvailable";
import { topIcon } from "../../../utils/classes";


const RiderHome = () => {
  const [rideAvailable , setRideAvailable] = useState(true)
  const panelClass = "absolute bottom-0 left-0 w-full bg-white rounded-t-3xl z-30 h-[52%] md:top-6 md:left-6 md:w-105 md:h-[80%] md:rounded-xl md:shadow-2xl";

  return (
    <section className="relative h-dvh overflow-hidden bg-gray-100 font-poppins">
     
       <Link to="/logout" className={`${topIcon} right-4 `}>
        <LogOut strokeWidth={2.5}/>
      </Link>
      <img
        src="/src/assets/images/yellow_logo.png"
        alt="Logo"
        fetchPriority="high"
        className={`${topIcon} left-4 md:left-6`}
      />

      <div className="absolute inset-0">
        <img
          src="/src/assets/images/map.png"
          alt="Map"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Rider details */}
      <div className={panelClass}>
        <RiderDetail />
      </div>

      {/* Rider Popup */}
        <AnimatePresence>
        {rideAvailable && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${panelClass} h-[70%]`}
          >
            <RideAvailable
              panelStates={{ setRideAvailable  }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    
    </section>
  );
};

export default RiderHome;
