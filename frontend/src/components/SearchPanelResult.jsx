import { MapPin } from "lucide-react"

const SearchPanelResult = () => {
    
  return (
    <section className="flex gap-4 flex-col">
      {
       [...Array(5)].map(( index) => {
        return <div className="flex gap-4 p-2 items-center h-26  rounded-md bg-gray-200 overflow-hidden" key={index}> 
                <MapPin size={35}/>
                <div className=""> 
                    <h3 className="text-base font-semibold">St Garden , Street No 256 , San Fransicso </h3>
                    <p className="text-xs"></p>
                </div>
            </div>
      })}
    </section>
  )
}

export default SearchPanelResult