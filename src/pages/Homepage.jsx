import React from "react";
import Banner from '../components/Banner'
import CryptoTable from "../components/CryptoTable";

export const Homepage=()=>{
    return(
        <div className="home-container">
            <Banner/>
            <CryptoTable/>
        </div>
    );
}