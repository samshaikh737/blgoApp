import React , { createContext , useContext , useReducer } from "react";

export let myContext = createContext();
export let Provider = ({reducer,database,children})=> {
    return (
         <myContext.Provider value={useReducer(reducer,database)} >
            {children}
         </myContext.Provider>
    )
}
export let Database = ()=> useContext(myContext);