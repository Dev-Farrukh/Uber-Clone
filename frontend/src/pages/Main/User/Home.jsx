import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchPanelResult from "../../../components/SearchPanelResult";
import VehiclePanel from "../../../components/VehiclePanel";
import ConfirmRide from "../../../components/ConfirmRide";
import LookingForRider from "../../../components/LookingForRider";
import Summary from "../../../components/Summary";
import { topIcon } from "../../../utils/classes";
import apiClient from "../../../api/axiosClient";
import { useContext } from "react";
import { SocketContext } from "../../Context/SocketContext";
import { MainContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../../../components/LiveTracking";
import logoImage from "../../../assets/images/yellow_logo.png";


const searchPanel = "absolute bg-white z-20 md:top-6 md:left-6 md:w-105 md:rounded-xl md:shadow-2xl md:p-6";
const searchPanelOpen = `${searchPanel} top-0 w-full p-4 flex flex-col md:max-h-[calc(100vh-48px)]`;
const searchPanelClosed = `${searchPanel} bottom-0 w-full px-4 py-6 md:bottom-auto`;
const vehiclePanel = "absolute bottom-0 left-0 w-full bg-white rounded-t-3xl z-30 h-[52%] md:top-6 md:left-6 md:w-105 md:h-[80%] md:rounded-xl md:shadow-2xl";

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRideOpen, setConfirmRideOpen] = useState(false);
  const [lookingforRider, setLookingforRider] = useState(false);
  const [summary, setSummary] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState(null); // 'pickup' | 'destination'
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [fareApi, setFareApi] = useState(false)
  const [confirmedRide, setConfirmedRide] = useState(null)
  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const user = useContext(MainContext)

  // Socket connection and ride confirmation events
  useEffect(() => {
    if (!user?.user?._id) return;

    const joinUser = () => {
      socket.emit("join", { userType: "user", userId: user.user._id }, (response) => {
        if (!response?.success) {
          console.error("Could not save socket ID:", response?.message);
        }
      });
    };

    const handleRideConfirmed = (ride) => {
      console.log("Ride confirmed by rider:", ride);
      setConfirmedRide(ride);
      setLookingforRider(false);
      setSummary(true);
    };

    if (socket.connected) {
      joinUser();
    } else {
      socket.once("connect", joinUser);
    }

    socket.on("ride-confirmed", handleRideConfirmed);

    return () => {
      socket.off("connect", joinUser);
      socket.off("ride-confirmed", handleRideConfirmed);
    };
  }, [socket, user?.user?._id])

  useEffect(() => {
    const handleRideStarted = (ride) => {
      navigate("/rider-location", { state: { ride } })
    }

    socket.on("ride-started", handleRideStarted)

    return () => socket.off("ride-started", handleRideStarted)
  }, [navigate, socket])

    


  // Api For HomePage 

  // Suggestion 
  useEffect(() => {
    if (!activeField) {
      const timeoutId = setTimeout(() => setSuggestions([]), 0);
      return () => clearTimeout(timeoutId);
    }

    const queryInput = activeField === "pickup" ? pickup : activeField === "destination" ? destination : "";

    const timeoutId = setTimeout(() => {
      if (!queryInput || queryInput.trim().length < 3) {
        setSuggestions([]);
        setLoading(false);
        return;
      }

      const fetchSuggestions = async () => {
        setLoading(true);
        try {
          const response = await apiClient.get("suggestion", {
            params: { input: queryInput },
          });
          setSuggestions(response.data);
        } catch (error) {
          console.error("Cannot get Suggestion", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [pickup, destination, activeField]);

  // Getting Fare
  useEffect(() => {
    if (!fareApi) return;

    const fetchFare = async () => {
      try {
        const response = await apiClient.get("fare", {
          params: { pickup, destination }
        });
        setVehicleData(response);
      } catch (error) {
        console.error("Error in getting fare", error);
      }
    };

    fetchFare();
  }, [fareApi, pickup, destination])

  //Creating Ride 
  const createRide = async () => {
    try {
      const response = await apiClient.post("create-ride", null, {
        params: {
          vehicleType: selectedVehicle.type,
          pickup,
          destination
        }
      });
      
      return response;
    } catch (error) {
      console.error("Error creating ride:", error);
      throw error;
    }
  }


  return (
    <section className="relative h-dvh overflow-hidden bg-gray-100 font-poppins">
      {/* Logo */}
      <img
        src={logoImage}
        alt="Logo"
        fetchPriority="high"
        className={`${topIcon} left-4 md:left-6`}
      />

      {/* Bg Image */}
      <div className="absolute inset-0">
       {/* // className="h-full w-full object-cover" */}
       <LiveTracking />
       
      </div>

      {/* Search Result */}
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
                pickup,
                setPickup,
                destination,
                setDestination,
                activeField,
                setActiveField,
                suggestions,
                setSuggestions,
                loading,
                setFareApi
              }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Vehicle panel */}
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
              panelStates={{
                setVehiclePanelOpen,
                setConfirmRideOpen,
                setSelectedVehicle,
                vehicleData,
                setFareApi
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Ride */}
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
              panelStates={{
                setConfirmRideOpen,
                setLookingforRider,
                pickup,
                destination,
                selectedVehicle,
                vehicleData,
                createRide
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Looking for Rider */}
      <AnimatePresence>
        {lookingforRider && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${vehiclePanel} h-[70%]`}
          >
            <LookingForRider
              panelStates={{
                setLookingforRider,
                pickup,
                destination,
                selectedVehicle,
                vehicleData
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary for Rider */}
      <AnimatePresence>
        {summary && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`${vehiclePanel} h-[75%]`}
          >
            <Summary
              panelStates={{ setSummary, setLookingforRider, ride: confirmedRide }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Home;