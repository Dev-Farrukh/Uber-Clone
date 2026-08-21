import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Outlet, useNavigate} from "react-router-dom"
import { MainContext } from "../Context/Context"

const UserProtected = () => {
    const {setUser } = useContext(MainContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
        const isToken = localStorage.getItem("userToken")
        if (!isToken) {
                navigate('/login')
                return 
        }
        console.log(isToken);
        

        axios.get(`${import.meta.env.VITE_BASE_URL}user/profile` ,{ headers : { Authorization : `Bearer ${isToken}`}}
         ).then((response)=>{
            if(response.data.user){
                setUser(response.data.user)
            }
        }).catch((error) => {
            console.error(error);
            localStorage.removeItem('userToken')
            navigate('/login')
            return 
        }).finally(() => {
            setLoading(false)
        })
        },[navigate, setUser])

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

export default UserProtected