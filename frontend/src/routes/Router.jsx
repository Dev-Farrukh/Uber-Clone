import { Route, Routes } from "react-router-dom";
import UserLogin from "../pages/AuthPages/UserLogin";
import UserRegister from "../pages/AuthPages/UserRegister";
import Start from "../pages/AuthPages/Start";
import RiderRegister from "../pages/AuthPages/RiderRegister";
import RiderLogin from "../pages/AuthPages/RiderLogin";
import UserProtected from "../pages/Protected/UserProtected";
import RiderProtected from "../pages/Protected/RiderProtected";
import UserLogout from "../pages/AuthPages/UserLogout";
import RiderLogout from "../pages/AuthPages/RiderLogout";
import Home from "../pages/Main/User/Home";
import RiderLocation from "../pages/Main/User/RiderLocation";
import RiderHome from "../pages/Main/Rider/RiderHome";
import Riding from "../pages/Main/Rider/Riding";

const Router = () => {
  const visited = localStorage.getItem("visited") === "true";

  return (
    <Routes>
      {<Route path="/" element={visited ? <UserLogin /> : <Start />} />}

      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/rider-register" element={<RiderRegister />} />
      <Route path="/rider-login" element={<RiderLogin />} />

      {/* Protected  User*/}
      <Route element={<UserProtected />}>
        <Route path="/home" element={<Home />} />
        <Route path="/rider-location" element={<RiderLocation />} />
        <Route path="/logout" element={<UserLogout />} />
      </Route>


      {/* Protected  Rider*/}

      <Route element={<RiderProtected />}>
      <Route path="/rider" element={<RiderHome />} />
      <Route path="/riding" element={<Riding />} />
        <Route path="/rider-logout" element={<RiderLogout />} />
      </Route>
    </Routes>
  );
};

export default Router;
