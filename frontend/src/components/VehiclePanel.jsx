import { ChevronDown, User } from "lucide-react"
import { headingStyle } from "../utils/classes"

const VehiclePanel = ({ panelStates }) => {
  return (
    <section className="px-4 h-full flex flex-col">
      <ChevronDown onClick={() => panelStates.setVehiclePanelOpen(false)}
        className="cursor-pointer text-gray-600 hover:text-black transition-colors mx-auto my-2 " />

      <h1 className={headingStyle}>Choose a Vehicle</h1>
      {/* Options Section */}
      <div className=" overflow-auto py-1 my-4">

        <div className="flex my-2 items-center border-2 rounded-md border-gray-300 px-2 py-4   ">
          <img src={'src/assets/images/bike.png'}
            alt="Bike"
            className="w-[30%] object-contain pr-2  "
          />
          <div className="flex flex-col flex-3">
            <div className="flex gap-1 pt-2">
              <h3 className="text-[20px]  font-semibold" >Car</h3>
              <div className="flex gap-1 items-center"> <User className="" strokeWidth={3} /><span className="font-semibold">4</span></div>
            </div>
            <h6 className="text-sm text-gray-800">2 mins away</h6>
            <p className="text-xs text-gray-500">
              Comfortable ride
            </p>
          </div>
          <h3 className="flex-2 text-lg font-bold">Rs 400.45</h3>
        </div>

        <div className="flex my-2 items-center border-2 rounded-md border-gray-300 px-2 py-4   ">
          <img src={'src/assets/images/auto.png'}
            alt="Auto"
            className="w-[30%] object-contain pr-2  "
          />
          <div className="flex flex-col flex-3">
            <div className="flex gap-1 pt-2">
              <h3 className="text-[20px]  font-semibold" >Car</h3>
              <div className="flex gap-1 items-center"> <User className="" strokeWidth={3} /><span className="font-semibold">4</span></div>
            </div>
            <h6 className="text-sm text-gray-800">2 mins away</h6>
            <p className="text-xs text-gray-500">
              Comfortable ride
            </p>
          </div>
          <h3 className="flex-2 text-lg font-bold">Rs 400.45</h3>
        </div>

        <div className="flex my-2 items-center border-2 rounded-md border-gray-300 px-2 py-4   ">
          <img src="https://imgs.search.brave.com/5dI1XjS7et0fBxAWF_crbf9sSiDgNk2YKJLK8PGvA5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2E3LzQ0/L2JiL2E3NDRiYjY2/NDBjOTg1Y2Y3MjM5/NWFlN2M2MWYzZWVk/LmpwZw"
            alt="Car"
            className="w-[30%] object-contain   "
          />
          <div className="flex flex-col flex-3">
            <div className="flex gap-1 pt-2">
              <h3 className="text-[20px]  font-semibold" >Car</h3>
              <div className="flex gap-1 items-center"> <User className="" strokeWidth={3} /><span className="font-semibold">4</span></div>
            </div>
            <h6 className="text-sm text-gray-800">2 mins away</h6>
            <p className="text-xs text-gray-500">
              Comfortable ride
            </p>
          </div>
          <h3 className="flex-2 text-lg font-bold">Rs 400.45</h3>
        </div>

      </div>
    </section>

  )
}

export default VehiclePanel