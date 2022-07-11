import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import { TrendingCrypto } from '../configs/api';
import { CryptoState } from '../context/CrypContext';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {Link} from 'react-router-dom';

// styling using styled components from material ui core
const useStyles = makeStyles((theme) => ({
    carouselContainer: {
        height: '10rem',
        width:'35rem',
        margin:'0 auto',
        display: 'flex',
        alignItems: 'center',
        // for screen below and within 400px
        '@media(max-width:400px)':{
        width:'100%', 
        textAlign:'center',
        height:'10rem',
        }
    },
    carouselItem:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        fontSize:'1.3rem',
        
    }
}))

const Carousel = () => {
    // classes to use the styling objects inside our components
    const classes = useStyles();

    // state for our trending crypto currencies
    const [trending, setTrending] = useState([]);

    // context api to provide us with the currency and the symbol the user chose
    const { currency, symbol } = CryptoState();

    // since we need to display the carousel items from api 
    const fetchTrendingCrypto = async () => {
        const { data } = await axios.get(TrendingCrypto(currency));

        // states to contain our trending coins and show them in carousel
        setTrending(data);
    }
    // console.log(trending[1].current_price);

    // while mounting and re-renders, make the api req
    useEffect(() => {
        fetchTrendingCrypto();
    }, [currency]);

     // object for dealing with responsive screens, displaying items at certain screen widths
     const responsive ={
        0:{
            item:1
        },
        520:{
            items:3
        }
    }

    // creating the items aka cryptos from the the api
    // using higher order mapping function through our trending items 
    const items = trending.map((item)=> {
        return(
        <>
        <Link
            className={classes.carouselItem}
            to={`/coins/${item?.id}`}>
            <img
            src={item?.image}
            alt={item.name}
            height='100'
            style={{marginBottom:'1rem'}}
              />
               <span>
                    {item.name}
                </span>
                <span>
                    {symbol} {item?.current_price}
                </span>
            </Link> 
        </>
        )
    })

    return (
        <div className={classes.carouselContainer}>
            {/* The Carousel goes here*/}
            <AliceCarousel
            items={items} // the cryptos 
            infinite // automatic scrolling infinite
            autoPlay // autoplay the animation
            mouseTracking //enables tracking with mouse cursor
            autoPlayInterval={1000} // 1000s
            animationDuration={2000} // duration
            disableDotsControls //true
            disableButtonsControls // arrow buttons disable : boolean
            responsive={responsive} // dealing with screen sizes
            />
        </div>
    )
}

export default Carousel;