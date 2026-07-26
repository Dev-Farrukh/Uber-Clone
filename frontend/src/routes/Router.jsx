import { Route, Routes } from "react-router-dom"
import UserLogin from "../pages/AuthPages/UserLogin"
import UserRegister from "../pages/AuthPages/UserRegister"
import Start from "../pages/AuthPages/Start"
import RiderRegister from "../pages/AuthPages/RiderRegister"
import RiderLogin from "../pages/AuthPages/RiderLogin"
import Home from "../pages/Main/Home"

const Router = () => {
	return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister  />} />
            <Route path="/rider-register" element={<RiderRegister  />} />
            <Route path="/rider-login" element={<RiderLogin />} />
            <Route path="/start" element={<Start  />} />
        </Routes>
	)
}

export default Router
