import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";
import  DotLoader  from 'react-spinners/DotLoader';

const useStyles = makeStyles(() => ({
    containerStyle: {
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        '@media(max-width:500px)': {
            height: '100vh',
            overflowY: 'scroll'
        }
    },
    aboutStyle: {
        padding: '5px 3rem',
        fontSize: '1.2rem',
        lineHeight: '2',
        color: 'gold',
        fontFamily: 'Lora ,serif',
        '@media(max-width:500px)': {
            fontSize: '0.9rem',
            padding: '1px 1rem'
        }

    }
}))

const About = () => {

    // set loading screen
    const [loading, setLoading] = useState(false);

    // for running it while loading/rendering
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false); // no loading after 4s
        }, 4000);
    }, []);

    // classes for using styling objects 
    const classes = useStyles();
    return (
        <div className={classes.containerStyle}>
            {/* while loading is having true value, it will show the loader, after the timeout, it will load the 
            contents of the page */}
            {loading ? <DotLoader
                        size={70}
                        color={'#ED8607'}
                        loading={loading} />
           
                :
                <span className={classes.aboutStyle}>
                    <h1 style={{ textAlign: 'center',fontFamily: 'Volkorn, serif'}}>ABOUT</h1>
                    <h2 style={{ textAlign: 'center',fontFamily: 'Volkorn, serif'}}> Welcome to Crypto Catalogue👋</h2>
                    <p>
                        A cryptocurrency, crypto-currency, or crypto is a digital currency designed to work as a medium of exchange through a computer network that is not reliant on any central authority, such as a government or bank, to uphold or maintain it.
                    </p>
                    <p>
                        Individual coin ownership records are stored in a digital ledger, which is a computerized database using strong cryptography to secure transaction records, to control the creation of additional coins, and to verify the transfer of coin ownership.
                    </p>
                    <p>
                        Here in Cypto Catalgoue , you will find the details regarding the top performing cryptocurrencies. Accurate details about their highs and lows , current prices in individual currencies. (Available: INR, USD, EUR, YEN), check their market cap, ranking and liquidity score.
                    </p>
                </span>

            }
        </div>
    )
}

export default About;