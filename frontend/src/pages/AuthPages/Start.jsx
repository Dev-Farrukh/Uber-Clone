import { Link, useNavigate } from "react-router-dom"
import rideImage from "../../assets/images/ride.png"

const Start = () => {
    const navigate = useNavigate()
    const handleGo = () => {
        localStorage.setItem("visited", "true")
        navigate("/login")
    }

    return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 pt-10 text-center gap-8 md:gap-10 lg:gap-10">

    {/* Ride Image */}
    <img
        src={rideImage}
        alt="Ride"
        className="w-64 sm:w-72 md:w-80 lg:w-96 object-contain"
    />

    <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1f1e1d]">
            Book Your Ride
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            Get where you need to go quickly and comfortably.
            Connect with trusted riders and enjoy a smooth,
            hassle-free journey every time.
        </p>
    </div>

    {/* Go Button */}
    <div className="rounded-full border-2 border-[#edaf10] p-2">
        <Link
            to="/login"
            className="inline-block rounded-full bg-[#edaf10] px-6.5 py-6
             md:px-7 md:py-7 text-lg md:text-xl font-semibold text-white
            transition-all duration-300 ease-in-out outline-none
            hover:scale-110 hover:bg-[#dea922]
            active:scale-95
            shadow-md hover:shadow-xl"
            onClick={handleGo}
        >
            Go
        </Link>
    </div>

</main>
  )
}

export default Start