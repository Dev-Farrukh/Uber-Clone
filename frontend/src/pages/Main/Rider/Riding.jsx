import { LogOut, MoveUp } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { buttonStyle, topIcon } from "../../../utils/classes";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FinishRide from "../../../components/FinishRide";
import { useContext } from "react";
import { SocketContext } from "../../Context/SocketContext";
import toast from "react-hot-toast"
import LiveTracking from "../../../components/LiveTracking";
import logoImage from "../../../assets/images/yellow_logo.png";

const Riding = () => {
  const [finishRide, setFinishRide] = useState(false);
  const { state } = useLocation();
  const ride = state?.ride;
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()
  const panelClass =
    "absolute bottom-0 left-0 w-full bg-white rounded-t-3xl z-30 h-[82%] md:top-6 md:left-6 md:w-105 md:h-[80%] md:rounded-xl md:shadow-2xl";

  socket.on("ride-ended", () => {
    navigate("/rider")
    toast.success("Ride Completed")
  })

  return (
    <div>
      <section className="relative h-dvh overflow-hidden bg-gray-100 font-poppins">
        <Link to="/logout" className={`${topIcon} right-4 `}>
          <LogOut strokeWidth={2.5} />
        </Link>

        {/* <Link to="/rider" >
        <img
          src={logoImage}
          alt="Logo"
          fetchPriority="high"
          className={`${topIcon} left-4 md:left-6`}
        />
        </Link> */}
        <Link to="/rider" className={`${topIcon} left-4 md:left-6 z-40 cursor-pointer`}>
          <img
            src={logoImage}
            alt="Logo"
            fetchPriority="high"
            className="w-full h-full object-contain"
          />
        </Link>

        <div className="absolute inset-0">
          <LiveTracking />
        </div>

        <AnimatePresence>
          {!finishRide && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={"absolute bottom-0 bg-[#ffffff98] z-20 w-full h-[20%] flex justify-around px-2 items-center rounded-t-2xl"}
            >
              {/* <div className="absolute bottom-0 bg-[#ffffff6c] z-20 w-full h-[20%] flex justify-around px-2 items-center rounded-t-2xl"> */}
              <h4 className="flex gap-3 text-xl">
                <MoveUp strokeWidth={4} /> {ride?.distance ?? "0.5"} KM Away
              </h4>
              <button
                className={`${buttonStyle} px-8 font-[550]`}
                onClick={() => setFinishRide(true)}
              >
                Continue
              </button>
              {/* </div> */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Finsh Ride Panel  */}
        <AnimatePresence>
          {finishRide && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`${panelClass} `}
            >
              <FinishRide panelStates={{ setFinishRide, ride }} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Riding;
