import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import SearchPanelResult from "../../components/SearchPanelResult";
import VehiclePanel from "../../components/VehiclePanel";


const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclPanelOpen, setVehiclePanelOpen] = useState(false)

  return (

    <section className="relative font-poppins h-dvh overflow-hidden bg-gray-100">
      {/* Logo */}
      <img
        src="/src/assets/images/yellow_logo.png"
        alt="Logo"
        fetchPriority="high"
        className="absolute -z-1 w-12 left-4 top-4 md:w-14"
      />

      {/* Background Map */}
      <div className="h-full w-full absolute inset-0 z-0">
        <img
          src="src/assets/images/map.png"
          alt="Maps"
          className="h-full w-full object-cover bg-center"
        />
      </div>

      {/* Framer Motion Wrapper for Search Panel */}
      <motion.div
        initial={false}
        animate={{ height: panelOpen ? "100%" : "43%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={
          panelOpen
            ? "top-0 absolute p-4 bg-white w-full z-20 flex flex-col md:top-6 md:left-6 md:w-[420px] md:max-h-[calc(100vh-48px)] md:rounded-xl md:shadow-2xl md:p-6"
            : "absolute bottom-0 w-full px-4 py-6 bg-white z-20 md:top-6 md:left-6 md:bottom-auto md:w-[420px] md:rounded-xl md:shadow-2xl md:p-6"
        }
      >
    

        {/* Search Results Panel */}
        <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" flex-1 overflow-hidden rounded-lg mt-2"
            >
              <SearchPanelResult panelStates={{ setVehiclePanelOpen, setPanelOpen  , panelOpen}} />
            </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Vehichle Panel */}
      <div className={vehiclPanelOpen ? "rounded-lg bg-white translate-y-full z-30" : "-translate-y-full"}>
        <VehiclePanel panelStates={setVehiclePanelOpen} />
      </div>
    </section>
  )
}

export default Home