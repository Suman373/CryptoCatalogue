import React from "react";
import { createContext, useContext,useState,useEffect} from "react";
// creating the context api for the whole app
const Crypto = createContext();

const CrypContext = ({children})=>{
    const rupeeSymbol = '₹';
    const dollarSymbol = '$';
    const euroSymbol = '€';
    const yenSymbol = '¥';
    //our states 
    const [currency , setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState(rupeeSymbol);


    // component update/render
    useEffect(()=>{
        // toggle currency symbol according to the select menu used
        if(currency === "INR") {
            setSymbol(rupeeSymbol);
        }
        else if(currency === "USD") {
            setSymbol (dollarSymbol);
        }
        else if(currency === "EUR") {
            setSymbol (euroSymbol);
        }
        else if(currency === "JPY") {
            setSymbol (yenSymbol);
        }
    },[currency]);

    // this will be provided to the whole app by wrapping all the children = > components
    return(
        <Crypto.Provider
        value={{currency,symbol,setCurrency}}>
            {children}
        </Crypto.Provider>
    )
}
export default CrypContext;

// for the states of our currency 
export const CryptoState = ()=>{
    return useContext(Crypto);
}