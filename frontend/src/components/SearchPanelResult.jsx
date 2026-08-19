import { ChevronDown, MapPin, Loader2, MapPinOff } from "lucide-react";
import { headingStyle, buttonStyle } from "../utils/classes";

const SearchPanelResult = ({ panelStates }) => {
  const {
    pickup,
    setPickup,
    destination,
    setDestination,
    activeField,
    setActiveField,
    suggestions,
    setSuggestions,
    loading
  } = panelStates;

  // Current query text based on active input
  const activeInput = activeField === "pickup" ? pickup : activeField === "destination" ? destination : "";

  // Populates input field with clicked location
  const handleSelectSuggestion = (locationString) => {
    if (activeField === "pickup") {
      setPickup(locationString);
    } else if (activeField === "destination") {
      setDestination(locationString);
    }
    // Clear list after picking a location
    setSuggestions([]);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className={headingStyle}>Choose your location</h1>
        {panelStates.panelOpen && (
          <ChevronDown
            onClick={() => panelStates.setPanelOpen(false)}
            className="cursor-pointer text-gray-600 hover:text-black transition-colors"
          />
        )}
      </div>

      {/* Form */}
      <form className="flex gap-6 flex-col py-3 relative" onSubmit={(e) => e.preventDefault()}>
        <div
          className="border-2 border-gray-300 rounded-lg p-3 transition-all duration-200
          ease-in-out focus-within:ring-2 focus-within:ring-[#EDAF10] focus-within:border-transparent flex
          gap-3 px-3 justify-center items-center bg-gray-50/50 hover:bg-white w-[95%] mx-auto"
          onClick={() => panelStates.setPanelOpen(true)}
        >
          <div className="w-4 h-4 rounded-full border-2 border-[#edaf10] flex items-center justify-center shrink-0">
            {pickup && <div className="w-2 h-2 rounded-full bg-[#dea922]"></div>}
          </div>
          <input
            type="text"
            placeholder="Enter your pickup point"
            value={pickup}
            onFocus={() => setActiveField("pickup")}
            onChange={(e) => {
              setActiveField("pickup");
              setPickup(e.target.value);
            }}
            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Connecting vertical line */}
        <div className="h-13 w-0.5 bg-[#edaf10] absolute left-[29px] rounded-md top-[47px] z-10" />

        <div
          className="border-2 border-gray-300 rounded-lg p-3 transition-all duration-200
          ease-in-out focus-within:ring-2 focus-within:ring-[#EDAF10] focus-within:border-transparent flex
          gap-3 px-3 justify-center items-center bg-gray-50/50 hover:bg-white w-[95%] mx-auto"
          onClick={() => panelStates.setPanelOpen(true)}
        >
          <div className="w-4 h-4 rounded-full border-2 border-[#edaf10] flex items-center justify-center shrink-0">
            {destination && <div className="w-2 h-2 rounded-full bg-[#dea922]"></div>}
          </div>

          <input
            type="text"
            placeholder="Enter your destination"
            value={destination}
            onFocus={() => setActiveField("destination")}
            onChange={(e) => {
              setActiveField("destination");
              setDestination(e.target.value);
            }}
            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
          />
        </div>

        {pickup && destination ? (
          <button
            type="button"
            onClick={() => {
              panelStates.setVehiclePanelOpen(true);
              panelStates.setPanelOpen(false);
            }}
            className={buttonStyle}
          >
            Find rides
          </button>
        ) : null}
      </form>

      {/* Dynamic Search Results & Loader */}
      {panelStates.panelOpen && (
        <section className="flex gap-4 flex-col overflow-auto h-[70%]">
          {/* Loader State */}
          {loading && (
            <div className="flex justify-center items-center p-6 text-[#EDAF10]">
              <Loader2 className="animate-spin w-8 h-8" />
            </div>
          )}

          {/* Results List */}
          {!loading && Array.isArray(suggestions) && suggestions.length > 0 && (
            suggestions.map((item, index) => {
              const locationText = typeof item === "string" ? item : item.display_name || item.address || item.name;

              return (
                <div
                  key={index}
                  className="flex gap-4 items-center rounded-md bg-gray-100 p-2 py-3 border-2 border-gray-300 active:border-black hover:bg-gray-200 cursor-pointer transition-colors"
                  onClick={() => handleSelectSuggestion(locationText)}
                >
                  <MapPin size={22} className="shrink-0 text-gray-700" />
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {locationText}
                    </h3>
                  </div>
                </div>
              );
            })
          )}

          {/* No Results Found State */}
          {!loading && activeInput.trim().length >= 3 && Array.isArray(suggestions) && suggestions.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500 gap-1">
              <MapPinOff strokeWidth={2.5} className="w-9 h-9 text-gray-400 mb-1" />
              <p className="font-semibold text-gray-700 text-sm">No results found</p>
              <p className="text-xs text-gray-400">Try searching for a different location or landmark</p>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default SearchPanelResult;