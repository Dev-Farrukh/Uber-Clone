import Router from "./routes/Router"
import {Toaster} from "react-hot-toast"

const App = () => {
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Router />
        </>
    )
}

export default App