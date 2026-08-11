import { LogOut, MoveUp } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonStyle, topIcon } from "../../../utils/classes";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FinishRide from "../../../components/FinishRide";

const Riding = () => {
  const [finishRide, setFinishRide] = useState(false);
  const panelClass =
    "absolute bottom-0 left-0 w-full bg-white rounded-t-3xl z-30 h-[82%] md:top-6 md:left-6 md:w-105 md:h-[80%] md:rounded-xl md:shadow-2xl";

  return (
    <div>
      <section className="relative h-dvh overflow-hidden bg-gray-100 font-poppins">
        <Link to="/logout" className={`${topIcon} right-4 `}>
          <LogOut strokeWidth={2.5} />
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
                <h4 className="flex gap-3 font-semibold text-xl">
                  <MoveUp strokeWidth={4} /> 4 KM Away
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
              <FinishRide panelStates={{ setFinishRide }} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Riding;
