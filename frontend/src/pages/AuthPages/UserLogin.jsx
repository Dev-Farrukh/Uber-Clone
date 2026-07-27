import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from 'lucide-react';
import toast from "react-hot-toast";
import { MainContext } from "../Context/Context";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const {setUser} = useContext(MainContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = { email, password }
    try {
      setLoading(true)
      const response = await axios.post(import.meta.env.VITE_BASE_URL + 'user/login', payload, { withCredentials: true })
      // Path : console.log("Hello ", response.data.user) 
      localStorage.setItem("token" , response.data.token)

      setUser(response?.data?.user)
      navigate("/home")

    } catch (error) {
      console.log("error", error?.response?.data || error)
      const data = error.response?.data;

      let message = "Login Failed";

      if (Array.isArray(data?.errors)) {
        message = data.errors.map(err => err.msg).join(", ");
      } else if (data?.message) {
        message = data.message;
      }

      toast.error(message);
    } finally {
      setLoading(false)
    }

    setEmail('')
    setPassword('')
  }
  return (
    <div className="flex flex-col justify-around min-h-dvh bg-gray-100 font-poppins lg:justify-center lg:px-6">
      <main className="flex flex-col gap-10 w-full max-w-md mx-auto lg:rounded-2xl lg:bg-white lg:p-8 lg:h-110 lg:shadow-sm">
        <div><h1 className="pl-5 text-3xl lg:pl-0">Sign In</h1></div>
        <form onSubmit={submitHandler} className="flex flex-col gap-5 px-5 lg:px-0">
          <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 rounded-sm p-3 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EDAF10] focus:border-none" />
          <div className="border-2 border-gray-300 rounded-sm p-3 flex justify-between transition-all duration-200 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-[#EDAF10] focus-within:border-none">
            <input type={showPassword ? "text" : "password"} placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent outline-none" />
            {showPassword ? <EyeOff className="cursor-pointer text-gray-400" onClick={() => setShowPassword(false)} /> : <Eye className="cursor-pointer text-gray-400" onClick={() => setShowPassword(true)} />}
          </div>
          <button type="submit" className="p-3 bg-[#EDAF10] rounded-sm text-white hover:bg-[#dea922] outline-[#dea922]">
            {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mx-auto" /> : "Sign In"}
          </button>
          <div className="text-center text-sm">Don't have an account ? <Link to="/register" className="text-[#EDAF10] font-semibold hover:underline">Signup</Link></div>
        </form>
      </main>

      <Link to="/rider-login" className="p-3 bg-[#EDAF10] rounded-sm text-white hover:bg-[#dea922] mx-5 text-center max-w-md md:mx-auto  md:w-full lg:mt-6 lg:mx-auto">Sign in as Rider </Link>
    </div>
  )
}

export default UserLogin