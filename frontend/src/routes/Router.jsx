import { Route, Routes } from "react-router-dom"
import UserLogin from "../pages/AuthPages/UserLogin"
import UserRegister from "../pages/AuthPages/UserRegister"

const Router = () => {
	return (
        <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister  />} />
            <Route path="/rider-register" element={<UserRegister  />} />
        </Routes>
	)
}

export default Router
