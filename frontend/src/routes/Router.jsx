import { Route, Routes } from "react-router-dom"
import App from "../App"
import UserLogin from "../pages/AuthPages/UserLogin"

const Router = () => {
	return (
        <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/login" element={<UserLogin />} />
        </Routes>
	)
}

export default Router
