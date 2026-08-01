import { ChevronDown, User } from "lucide-react"

const VehiclePanel = ({panelStates}) => {
  return (
    <div>
     <ChevronDown onClick={() => panelStates(false)} 
     className="cursor-pointer text-gray-600 hover:text-black transition-colors mx-auto " />

      <h1>Choose a Vehicle</h1>
      <div>
        <img src="https://imgs.search.brave.com/5dI1XjS7et0fBxAWF_crbf9sSiDgNk2YKJLK8PGvA5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E3LzQ0/L2JiL2E3NDRiYjY2/NDBjOTg1Y2Y3MjM5/NWFlN2M2MWYzZWVk/LmpwZw"
             alit="Car"
        />
        <div>
            <div> 
                <h3 className="text-xl font-semibold" >Car</h3>
                <User /> 4
            </div>
            <h6>2 mins away</h6>
            <p>
                Affordable , Comfortable ride
            </p>
        </div>
        <h3>400.45 Rs</h3>
      </div>
    </div>

  )
}

export default VehiclePanel