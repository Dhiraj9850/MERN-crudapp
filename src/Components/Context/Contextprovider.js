import React, { createContext,useState } from 'react'

export const adddata = createContext("");
export const updatedata = createContext("");
export const deletedata = createContext("");

const Contextprovider = ({children}) => {

    const [alertforData, setAlertforData] = useState("");
    const [alertforupData,setAlertforupData] = useState("");
    const [alertfordltData,setAlertfordltData] = useState("");
  return (
    <adddata.Provider value={{alertforData,setAlertforData}}>
      <updatedata.Provider value={{alertforupData,setAlertforupData}}>
        <deletedata.Provider value={{alertfordltData,setAlertfordltData}}>
           {children}
        </deletedata.Provider>
      </updatedata.Provider>   
    </adddata.Provider>
  )
}

export default Contextprovider