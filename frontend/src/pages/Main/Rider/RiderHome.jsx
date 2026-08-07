import RiderDetail from "../../../components/RiderDetail";
import { Link } from "react-router-dom"
import { LogOut } from 'lucide-react';

const RiderHome = () => {
  return (
    <section className="relative h-dvh overflow-hidden bg-gray-100 font-poppins">
       <Link to="/logout" className="bg-white text-[#edaf10] rounded-full size-10 mx-auto flex items-center justify-center absolute top-4 md:top-6 hover:bg-gray-100 right-4 md:size-14 z-10 outline-none border-2 ">
        <LogOut strokeWidth={2.5}/>
      </Link>
      <img
        src="/src/assets/images/yellow_logo.png"
        alt="Logo"
        fetchPriority="high"
        className="absolute top-4 left-4 w-12 md:w-14 z-10"
      />

      <div className="absolute inset-0">
        <img
          src="/src/assets/images/map.png"
          alt="Map"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Rider details */}
      <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl z-30 h-[52%] md:top-6 md:left-6 md:w-105 md:h-[80%] md:rounded-xl md:shadow-2xl">
        <RiderDetail />
      </div>
    
    </section>
  );
};

export default RiderHome;
