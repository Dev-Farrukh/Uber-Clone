import axios from "axios"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const UserLogout = () => {
   const navigate = useNavigate()
    useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem("userToken")
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}user/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                localStorage.removeItem("userToken")
                navigate('/login')
                toast.success("Logout Success")
            } catch (error) {
                console.error("Error in Logout " + error);
                toast.error("Something went wrong")
            }
        }
        logout()
    }, [])

    return (
        <div>
            <h1>RiderLogout</h1>
        </div>
    )
}

export default UserLogout