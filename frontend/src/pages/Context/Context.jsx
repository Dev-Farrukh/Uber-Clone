import { createContext, useState } from "react";

const MainContext = createContext()

const MainContextProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [rider, setRider] = useState()
    const [loading, setLoading] = useState()

    return (
        < MainContext.Provider value={{ user, setUser, loading, setLoading , rider, setRider }} >
            {children}
        </MainContext.Provider >
    )

}

export { MainContext }
export {MainContextProvider}