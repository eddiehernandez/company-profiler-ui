import { FavsContext } from "../context/FavsContext"
import { useContext } from "react"

export const useFavsContext = () => {
    
    const context = useContext(FavsContext)

    if (!context){
        throw Error('useFavsContext must be used inside an FavsContextProvider')
    }


    return context
}