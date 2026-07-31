import { useState } from "react"
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import SearchPanelResult from "../../components/SearchPanelResult";


const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)

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

      {/* Framer Motion Wrapper for Panel */}
      <motion.div
        initial={false}
        animate={{ height: panelOpen ? "100%" : "auto" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={
          panelOpen
            ? "top-0 absolute p-4 bg-white w-full z-20 flex flex-col md:top-6 md:left-6 md:w-[420px] md:max-h-[calc(100vh-48px)] md:rounded-xl md:shadow-2xl md:p-6"
            : "absolute bottom-0 w-full px-4 py-6 bg-white z-20 md:top-6 md:left-6 md:bottom-auto md:w-[420px] md:rounded-xl md:shadow-2xl md:p-6"
        }
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl md:text-2xl text-gray-800">Choose your location</h1>
          {panelOpen && <ChevronDown onClick={() => setPanelOpen(false)} className="cursor-pointer text-gray-600 hover:text-black transition-colors" />}
        </div>

        {/* Form */}
        <form className="flex gap-6 flex-col py-3 relative">
          <div
            className="border-2 border-gray-300 rounded-lg p-3 transition-all duration-200
        ease-in-out focus-within:ring-2 focus-within:ring-[#EDAF10] focus-within:border-transparent flex
        gap-3 px-3 justify-center items-center bg-gray-50/50 hover:bg-white"
            onClick={() => setPanelOpen(true)}>
            <div className="w-4 h-4 rounded-full border-2 border-[#edaf10] flex items-center justify-center shrink-0">
              {pickup && <div className="w-2 h-2 rounded-full bg-[#dea922]"></div>}
            </div>
            <input
              type="text"
              placeholder="Enter your pickup point"
              required
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Connecting vertical line */}
          <div className="h-13 w-0.5 bg-[#edaf10] absolute left-[20px] rounded-md top-[50px] z-10" />

          <div
            className="border-2 border-gray-300 rounded-lg p-3 transition-all duration-200
        ease-in-out focus-within:ring-2 focus-within:ring-[#EDAF10] focus-within:border-transparent flex
        gap-3 px-3 justify-center items-center bg-gray-50/50 hover:bg-white"
            onClick={() => setPanelOpen(true)}>
            <div className="w-4 h-4 rounded-full border-2 border-[#edaf10] flex items-center justify-center shrink-0">
              {destination && <div className="w-2 h-2 rounded-full bg-[#dea922]"></div>}
            </div>

            <input
              type="text"
              placeholder="Enter your destination"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
            />
          </div>

          {pickup && destination ? (
            <button
              className="py-3 px-4 bg-[#edaf10] hover:bg-[#dea922] transition-all duration-200 ease-in-out text-white font-medium rounded-lg shadow-md hover:shadow-lg active:scale-[0.99]">
              Find rides
            </button>
          ) : null}
        </form>

        {/* Search Results Panel */}
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100%" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className=" flex-1 overflow-auto rounded-lg mt-2"
            >
              <SearchPanelResult />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default Home