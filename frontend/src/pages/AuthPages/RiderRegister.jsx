import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from 'lucide-react';
import toast from "react-hot-toast";


const RiderRegister = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [vehicleType, setVehicleType] = useState('');
    const [color, setColor] = useState('');
    const [plate, setPlate] = useState('');
    const [capacity, setCapacity] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const payload = {
            fullName: {
                firstName: firstname,
                lastName: lastname
            },
            email,
            password,
            vehicle: {
                vehicleType,
                color,
                plate,
                capacity
            },
        }
        try {
            setLoading(true)
            await axios.post(import.meta.env.VITE_BASE_URL + 'rider/register', payload, { withCredentials: true })
            toast.success("Account created successfully")
            navigate('/rider-login')


        } catch (error) {
            console.log("error", error)
            const data = error.response?.data;

            let message = "Registration Failed";

            if (typeof data === "string") {
                const match = data.match(/<pre>(.*?)<br/);
                message = match ? match[1] : null;
            } else if (Array.isArray(data?.errors)) {
                message = data.errors.map(err => err.msg).join(", ");
            } else if (data?.message) {
                message = data.message;
            }

            toast.error(message);
        } finally {
            setLoading(false)
        }

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setVehicleType('')
        setColor('')
        setPlate('')
        setCapacity('')

    }
    return (
        <div className="flex flex-col justify-around min-h-dvh bg-gray-100 font-poppins lg:justify-center lg:px-6 lg:pb-2">
            <main className="flex flex-col gap-10 w-full max-w-md mx-auto lg:rounded-2xl lg:bg-white lg:p-8 lg:h-140 lg:shadow-sm">
                <div><h1 className="pl-5 text-3xl lg:pl-0">Register As Rider</h1></div>
                <form onSubmit={submitHandler} className="flex flex-col gap-5 px-5 lg:px-0">
                    <div className="flex gap-2 ">

                        <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)}
                            className="flex-1 w-full border-2 border-gray-300 rounded-sm p-3 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EDAF10] focus:border-none" />

                        <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)}
                            className="flex-1 w-full border-2 border-gray-300 rounded-sm p-3 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EDAF10] focus:border-none" />
                    </div>

                    <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="border-2 border-gray-300 rounded-sm p-3 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EDAF10] focus:border-none" />

                    <div className="border-2 border-gray-300 rounded-sm p-3 flex justify-between transition-all duration-200 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-[#EDAF10] focus-within:border-none">
                        <input type={showPassword ? "text" : "password"} placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent outline-none" />
                        {showPassword ? <EyeOff className="cursor-pointer text-gray-400" onClick={() => setShowPassword(false)} /> : <Eye className="cursor-pointer text-gray-400" onClick={() => setShowPassword(true)} />}
                    </div>

                    {/* Vehicle Type and Color */}
                    <div className="flex gap-2">
                        <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required
                        className="flex-1 border-2 border-gray-300 rounded-sm p-3 bg-[#F3F4F6] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EDAF10] focus:border-none">
                            <option value="" disabled>Vehicle Type </option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="rickshaw">Rickshaw</option>
                        </select>

                        <select value={color} onChange={(e) => setColor(e.target.value)} required
                        className="flex-1 border-2 border-gray-300 rounded-sm p-3 bg-[#F3F4F6] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EDAF10] focus:border-none">
                            <option value="" disabled> Color </option>
                            <option value="White">White</option>
                            <option value="Black">Black</option>
                            <option value="Silver">Silver</option>
                            <option value="Grey">Grey</option>
                            <option value="Blue">Blue</option>
                            <option value="Red">Red</option>
                        </select>
                    </div>

                    {/* Number Plate and Capacity */}
                    <div className="flex gap-2">
                        <input type="text" placeholder="Number Plate" value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} required
                            className="flex-1 w-full border-2 border-gray-300 rounded-sm p-3 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EDAF10] focus:border-none"/>

                        <input type="number" placeholder="Capacity" min="1" value={capacity} onChange={(e) => setCapacity(e.target.value)} required
                            className="flex-1 w-full border-2 border-gray-300 rounded-sm p-3 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EDAF10] focus:border-none"/>
                    </div>

                    <button type="submit" className="p-3 bg-[#EDAF10] rounded-sm text-white hover:bg-[#dea922] outline-[#dea922]">
                        {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mx-auto" /> : "Sign Up"}
                    </button>
                    <div className="text-center text-sm">Already have an account ? <Link to="/rider-login" className="text-[#EDAF10] font-semibold hover:underline">Sign In</Link></div>
                </form>
            </main>

            <Link to="/register" className="p-3 bg-[#EDAF10] rounded-sm text-white hover:bg-[#dea922] mx-5 text-center max-w-md md:mx-auto  md:w-full lg:mt-6 lg:mx-auto">Sign up as User </Link>
        </div>
    )
}

export default RiderRegister