import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchPanelResult from "../../../components/SearchPanelResult";
import VehiclePanel from "../../../components/VehiclePanel";
import ConfirmRide from "../../../components/ConfirmRide.jsx";

const searchPanel = "absolute bg-white z-20 md:top-6 md:left-6 md:w-105 md:rounded-xl md:shadow-2xl md:p-6";
const searchPanelOpen = `${searchPanel} top-0 w-full p-4 flex flex-col md:max-h-[calc(100vh-48px)]`;
const searchPanelClosed = `${searchPanel} bottom-0 w-full px-4 py-6 md:bottom-auto`;
const vehiclePanel = "absolute bottom-0 left-0 w-full bg-white rounded-t-3xl z-30 h-[52%] md:top-6 md:left-6 md:w-105 md:h-[80%] md:rounded-xl md:shadow-2xl";

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRideOpen, setConfirmRideOpen] = useState(false);

  return (
    <section className="relative h-dvh overflow-hidden bg-gray-100 font-poppins">

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


      {/* Search Result  */}
      <motion.div
        initial={false}
        animate={{ height: panelOpen ? "100%" : "40%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={panelOpen ? searchPanelOpen : searchPanelClosed}
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex-1 overflow-hidden rounded-lg"
          >
            <SearchPanelResult
              panelStates={{
                panelOpen,
                setPanelOpen,
                setVehiclePanelOpen,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Vehicle panel  */}
      <AnimatePresence>
        {vehiclePanelOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={vehiclePanel}
          >
            <VehiclePanel
              panelStates={{ setVehiclePanelOpen , setConfirmRideOpen }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Ride  */}
      <AnimatePresence>
        {confirmRideOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${vehiclePanel} h-[68%]`}
          >
            <ConfirmRide
              panelStates={{ setConfirmRideOpen }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Home;