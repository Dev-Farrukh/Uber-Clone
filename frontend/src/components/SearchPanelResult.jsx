import { ChevronDown, MapPin } from "lucide-react"
import { useState } from "react"
import { headingStyle , buttonStyle } from "../utils/classes"

const SearchPanelResult = ({ panelStates }) => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className={headingStyle}>Choose your location</h1>
        {panelStates.panelOpen && <ChevronDown onClick={() => panelStates.setPanelOpen(false)} className="cursor-pointer text-gray-600 hover:text-black transition-colors" />}
      </div>

      {/* Form */}
      <form className="flex gap-6 flex-col py-3 relative">
        <div
          className="border-2 border-gray-300 rounded-lg p-3 transition-all duration-200
        ease-in-out focus-within:ring-2 focus-within:ring-[#EDAF10] focus-within:border-transparent flex
        gap-3 px-3 justify-center items-center bg-gray-50/50 hover:bg-white w-[95%] mx-auto"
          onClick={() => panelStates.setPanelOpen(true)}>
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
        <div className="h-13 w-0.5 bg-[#edaf10] absolute left-[29px] rounded-md top-[47px] z-10" />

        <div
          className="border-2 border-gray-300 rounded-lg p-3 transition-all duration-200
                      ease-in-out focus-within:ring-2 focus-within:ring-[#EDAF10] focus-within:border-transparent flex
                      gap-3 px-3 justify-center items-center bg-gray-50/50 hover:bg-white w-[95%] mx-auto"
          onClick={() => panelStates.setPanelOpen(true)}>
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
            className={buttonStyle}>
            Find rides
          </button>
        ) : null}
      </form>
      {/* Search Results */}
      {panelStates.panelOpen && (
        <section className="flex gap-4 flex-col overflow-auto h-[70%]">
          {
            [...Array(7)].map((_,index ) => {
              return <div className="flex gap-4 items-center rounded-md bg-gray-100  p-2 py-3 justify-betweeen border-2 border-gray-400 active:border-black hover:bg-gray-200 cursor-pointer"
              onClick={()=>{panelStates.setVehiclePanelOpen(true) ; panelStates.setPanelOpen(false)}} 
              key={index}>
                <MapPin size={25}  className="flex-1"/>
                <div className="flex-8">
                  <h3 className="text-sm font-semibold">St Garden , Street No 256 , San Fransicso  Lorem ipsum dolor sit amet consectetur   </h3>
                  <p className="text-xs"></p>
                </div>
              </div>
            })}
        </section>
      )}
    </>
  )
}

export default SearchPanelResult