import axios from "axios"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Outlet, useNavigate} from "react-router-dom"
import { MainContext } from "../Context/Context"

const RiderProtected = () => {
    const {setRider } = useContext(MainContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
                toast.error("Something went wrong")
                navigate('/rider-login' , {replace : true})
                return 
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}rider/profile` ,{ headers : { Authorization : `Bearer ${token}`}}
         ).then((response)=>{
            if(response?.data?.user){
                setRider(response.data.user)
            }
        }).catch((error) => {
            console.error(error);
            localStorage.removeItem('token')
            setLoading(false)
            navigate('/rider-login')
        }).finally(() => {
            setLoading(false)
        })
        }, [navigate , setRider])

    if(loading){
        return <div className="min-h-dvh flex justify-center items-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mx-auto" />
        </div>
         
    }


    return (
        <>
            <Outlet />
        </>
    )
}

export default RiderProtected