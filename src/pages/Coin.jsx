import React from "react";
import { createTheme, Typography, Container } from '@material-ui/core';
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import { useState, useEffect } from "react";
import { SingleCrypto } from "../configs/api";
import { CryptoState } from "../context/CrypContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader';
import ReactHtmlParser from 'react-html-parser';

const theme = createTheme();

const useStyles = makeStyles(() => ({
    container: {
        display: 'grid',
        placeContent: 'center',
        textAlign:'center',
        height: '96vh',
        width: '100vw',
        overflowX: 'hidden'
    },
    titleStyle:{
        fontFamily: 'Vollkorn, serif',
        margin:'1rem 0',
        fontSize:'2.4rem',
        color:'#000000',
        '@media(max-width:500px)':{
            fontSize:'1.8rem'
        }

    },
    imageContainer: {
        height: '15rem',
        // background: 'blue',
        width: '20rem',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '@media(max-width:500px)':{
            height:'12rem',
            width:'100%'
        }
    },
    imageStyle: {
        '@media(max-width:500px)': {
            height: '10rem',
            width: '10rem'
        }
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px 0',
        fontSize: '1.3rem',
        lineHeight:'2',
        color: '#000000',
        fontFamily: 'Lora ,serif',
        '@media(max-width:500px)':{
            fontSize:'1rem'
        }

    }
}))

export const Coin = () => {
    // classes for styling using makeStyles
    const classes = useStyles();

    // states for the loading 
    const [ loader , setLoader] = useState(false);

    // for rendering , show loading 
    useEffect(()=>{
        setLoader(true);
        setTimeout(() => {
            setLoader(false); // load for 3s
        }, 3000);
    },[]);

    // useParams will help us see the url , which contains the coin id the user has clicked
    const { id } = useParams();

    // states for the clicked crypto
    const [crypto, setCrypto] = useState();


    // destructuring symbol and currency from global context api i.e, the cryptocontext
    const { symbol, currency } = CryptoState();
    // console.log(symbol,currency);

    // fetching the crypto info using axios
    const fetchCrypto = async () => {
        const { data } = await axios.get(SingleCrypto(id)); // storing the response inside the data 
        setCrypto(data);
    }

    // using useEffect for fetching while mount and re-renders
    useEffect(() => {
        fetchCrypto(); // invoke func
    }, [currency]);

    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.container}>
                { loader ? <HashLoader
                size={70}
                color={'#ED8607'}
                loading={loader}
                />
                :
                <>
                <Typography className={classes.titleStyle}>
                    {crypto?.name}
                </Typography>
                <div className={classes.imageContainer}>
                    <img
                        className={classes.imageStyle}
                        src={crypto?.image.large}
                        alt={crypto?.name}
                     />
                </div>
                <div>
                    <Typography className={classes.infoContainer}>

                        <p>{ReactHtmlParser(crypto?.description.en.split(".")[0])}</p>

                        {/* rank according to market cap */}
                        <span>Market Cap Rank : {crypto?.market_cap_rank} </span>

                        {/* percentage change in 24h */}
                        <span>
                            Price change % in 1d :
                             <span
                                style={crypto?.market_data.price_change_percentage_24h > 0 ? { color: 'green' } : { color: 'red' }}>
                               {" "}{crypto?.market_data.price_change_percentage_24h.toFixed(4)} %
                            </span>
                        </span>

                        {/* price change percentage in 7d */}
                        <span>
                            Price change % in 7d :
                             <span
                            style={crypto?.market_data.price_change_percentage_7d > 0 ? { color: 'green' } : { color: 'red' }}>
                               {" "}{crypto?.market_data.price_change_percentage_7d.toFixed(4)} %
                            </span>
                        </span>

                        {/* price change in 1 month */}
                        <span>
                            Price change % in 30d : 
                            <span
                            style={crypto?.market_data.price_change_percentage_30d > 0 ? { color: 'green' } : { color: 'red' }}>
                               {" "}{crypto?.market_data.price_change_percentage_30d.toFixed(4)} %
                            </span>
                        </span>

                        {/* liquidity score */}
                        <span>
                            Liquidity Score : {crypto?.liquidity_score}
                        </span>
                    </Typography>
                </div>
                </>
                }
            </Container>
        </ThemeProvider>
    );
}