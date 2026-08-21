import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { useEffect } from "react"

const RiderLogout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem("riderToken")
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}rider/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                localStorage.removeItem("riderToken")
                navigate('/rider-login')
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

export default RiderLogout