import React from "react";
import Banner from '../components/Banner'
import CryptoTable from "../components/CryptoTable";
import Footer from "../components/Footer";

export const Homepage=()=>{
    return(
        <div className="home-container">
            <Banner/>
            <CryptoTable/>
            <Footer/>
        </div>
    );
}