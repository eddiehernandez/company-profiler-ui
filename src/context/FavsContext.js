import { createContext, useReducer } from 'react'


export const FavsContext = createContext()

export const favsReducer = (state, action) => {
    switch (action.type){
        case 'SET_FAVS': 
            return {
                favs: action.payload
            }
        case 'CREATE_FAV':{
            return {
                favs: [action.payload, ...state.favs]
            }

        }
        case 'DELETE_FAV':
            return {
                favs: state.favs.filter(f => f.ticker !== action.payload.ticker)
            }
        default:
            return state
    }
}

export const FavsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(favsReducer, {
        favs: null
    })

    return (
        <FavsContext.Provider value={{ ...state, dispatch }}>
            { children }
        </FavsContext.Provider>
    )


}