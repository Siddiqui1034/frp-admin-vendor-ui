import {createContext, useContext} from 'react'

const defaultValues = {}

const appCtx = createContext(defaultValues)  // created a Context


export const useAppContext = () =>{   // consuming data from Context 
    return useContext(appCtx)
}


export const AppContextProvider = ({children, myData}: {children:any, myData:any})=>{   // making {myData contains state and dispatch} avlb to all component {children}
   return <appCtx.Provider value={myData}>
        {children}
    </appCtx.Provider>
}