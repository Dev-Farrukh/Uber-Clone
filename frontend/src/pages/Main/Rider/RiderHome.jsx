import RiderDetail from "../../../components/RiderDetail";
import { Link } from "react-router-dom"
import { LogOut } from 'lucide-react';
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RideAvailable from "../../../components/RideAvailable";
import { topIcon } from "../../../utils/classes";
import { MainContext } from "../../Context/Context";
import { SocketContext } from "../../Context/SocketContext";
import apiClient from "../../../api/axiosClient.js"
import LiveTracking from "../../../components/LiveTracking.jsx";
import logoImage from "../../../assets/images/yellow_logo.png";


const RiderHome = () => {
  const [rideAvailable , setRideAvailable] = useState(false)
  const [isConfirm , setIsConfirm] = useState(false)
  const [ride, setRide] = useState(null)
  const { rider } = useContext(MainContext)
  const { socket } = useContext(SocketContext)
  const panelClass = "absolute bottom-0 left-0 w-full bg-white rounded-t-3xl z-30 h-[52%] md:top-6 md:left-6 md:w-105 md:h-[80%] md:rounded-xl md:shadow-2xl";

  useEffect(() => {
    if (!rider?._id) return;


    const joinRider = () => {
      socket.emit("join", { userType: "rider", userId: rider._id }, (response) => {
        if (!response?.success) {
          console.error("Could not save rider socket ID:", response?.message);
        }
      });
    };

    if (socket.connected) {
      joinRider();
    } else {
      socket.once("connect", joinRider);
    }

    const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                     console.log(
                      {location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
}
                     )
                    socket.emit('update-location-captain', {
                        userId: rider._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

      const locationInterval = setInterval(updateLocation, 10000)
      updateLocation()

      const handleNewRide = (incomingRide) => {
        setRide(incomingRide)
        setIsConfirm(false)
        setRideAvailable(true)
      }
      socket.on("new-ride", handleNewRide)

      return () => {
        socket.off("connect", joinRider)
        socket.off("new-ride", handleNewRide)
        clearInterval(locationInterval)
      }
  }, [rider?._id, socket])

  
  async function confirmRideAPI() {
    try {
      console.log('Confirming ride with ID:', ride._id);
      const response = await apiClient.post(`${import.meta.env.VITE_BASE_URL}confirm-ride`, {
        rideId: ride._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('riderToken')}`
        }
      });
      console.log('Ride confirmation response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error confirming ride:', error);
      throw error;
    }
  }

  return (
    <section className="relative h-dvh overflow-hidden bg-gray-100 font-poppins">
     
       <Link to="/logout" className={`${topIcon} right-4 `}>
        <LogOut strokeWidth={2.5}/>
      </Link>
      <img
        src={logoImage}
        alt="Logo"
        fetchPriority="high"
        className={`${topIcon} left-4 md:left-6`}
      />

      <div className="absolute inset-0">
        <LiveTracking />
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
            className={`${panelClass} ${isConfirm ? "h-dvh" : "h-[80%]"}`}
          >
            <RideAvailable
              panelStates={{ setRideAvailable , setIsConfirm , isConfirm, ride  , confirmRideAPI}}
            />
          </motion.div>
        )}
      </AnimatePresence>
    
    </section>
  );
};

export default RiderHome;
