import React from "react";
import axios from "axios";
import { useState, useEffect} from "react";
import { CryptoList } from "../configs/api";
import { CryptoState } from "../context/CrypContext";
import {Container,createTheme , Typography, TextField, TableContainer, LinearProgress, Table ,TableHead, TableRow , TableCell, TableBody } from '@material-ui/core'
import { ThemeProvider} from "@material-ui/styles";
import { makeStyles } from '@material-ui/styles';
import {useNavigate} from 'react-router-dom';
import {Pagination} from '@material-ui/lab';


// styling

// for the theme of the container , using palette
const goldenTheme = createTheme({
    palette: {
        primary: {
            main: '#ED8607'
        },
    },
})
const useStyles = makeStyles(()=>({
    title:{
        textAlign:'center',
        margin:'1rem 0',
        padding:'10px',
        fontSize:'2.5rem',
        color:'#ED8607',
        fontFamily: 'Vollkorn,serif',
        '@media(max-width:400px)':{
            fontSize:'2rem'
        }
    },
    textField:{
        fontSize:'1.1rem',
        width:'30rem',
        paddingBottom:'10px',
        '@media(max-width:500px)':{
            fontSize:'1rem',
            width:'85%'
        },
    },
    headValue:{
        color:"#ED8607",
        fontFamily:'Lora, serif',
        fontSize:'1.5rem',
        '@media(max-width:400px)':{
            fontSize:'1rem'
        }
    },
    cell:{
        cursor:'pointer',
        background:'rgb(0,0,0,0.3)',
        '&:hover':{
            background:'linear-gradient(black,rgb(0,0,0,0.2))',
           transform:'scale(5px)',
           boxShadow:'0px 0 4px #ED8607',
           transition:'transform 100ms ease-in-out'
        }
    },
    symbolStyle:{
        fontSize:'1.5rem',
        color:'white',
        '@media(max-width:400px)':{
            fontSize:'1rem'
        }
    },
    imageStyle:{
        height:'3rem',
        width:'3rem',
        marginBottm:'1rem',
        margin:'5px 0',
        '@media(max-width:400px)':{
            height:'2.1rem',
            width:'2.1rem'
        }

    },
    nameStyle:{
        fontSize:'1.1rem',
        color:'grey',
        '@media(max-width:400px)':{
            fontSize:'1rem'
        }
    },
    priceStyle:{
        fontSize:'1.3rem',
        color:'yellow',
        '@media(max-width:400px)':{
            fontSize:'1rem'
        }
    },
    priceChangeStyle:{
        fontSize:'1.3rem',
        color:'white',
        '@media(max-width:400px)':{
            fontSize:'1rem'
        }
    },
    marketCapStyle:{
        fontSize:'1.3rem',
        color:'#93A711',
        '@media(max-width:400px)':{
            fontSize:'1rem'
        }
    },

}))

const CryptoTable =()=>{
    // navigating object
    const navigate = useNavigate();

    // crypto state
    const [crypto , setCrypto] = useState([]); // array
    // state for Loading
    const [loading , setLoading] = useState(false); //boolean

    // states for the search field
    const [ search , setSearch] = useState("") ; 

    // from the CryptoContext, we destructure the currency and the symbol 
    const {currency ,symbol} = CryptoState();

    // state for the pagination of crypto lists
    const [page , setPage] = useState(1);

    // fetch crypto data by using axios
    const fetchCrypto = async()=>{
        setLoading(true); // while fetching data, api req
        const { data } = await axios.get(CryptoList(currency));
        setCrypto(data);
        setLoading(false); // as we have fetched all the cryptos
    }
    //  while mounting and re-renders
    useEffect(()=>{
        fetchCrypto();
    },[currency])


    const handleSearch=()=>{
        return crypto.filter((cryptoitem)=>(
            // filter out the name / symbol if it matches with the entered crypto
            cryptoitem.name.toLowerCase().includes(search) || cryptoitem.symbol.toLowerCase().includes(search)
        ))
    }

    // for using styling objects inside in useStyles
    const classes = useStyles();

    return(
        <ThemeProvider theme={goldenTheme}>
                <Container style={{textAlign:'center', Height:'100vh', overflowX:'hidden'}}>

                   {/* This is the title of the section */}
                    <Typography className={classes.title}>
                        Cryptos on basis of Market Cap
                    </Typography>

                {/* This is the input field/ search field */}
                    <TextField 
                    className={classes.textField}
                    variant="filled"
                     label="Search cryptocurrency"
                    //  use inputlabelprops with style attribute to style the label of material ui
                     InputLabelProps={{
                        style:{
                            color:'grey',
                        }
                     }}
                     InputProps={{
                        style:{
                            color:'gold'
                        }
                     }}
                     onChange={(e)=> setSearch(e.target.value)}
                    />    

                    <TableContainer>
                    {
                         loading ? (<LinearProgress/>) :
                         ( // table with mui

                         <Table>
                            <TableHead style={{background:'#0a0a0a',marginTop:'1rem'}}>
                                <TableRow>
                                    {
                                        ["Crypto","Price","24h Change","Market Cap"].map((value)=>(
                                            <TableCell
                                            className={classes.headValue}
                                            align={value === "Coin" ? "" : "center"}
                                            key={value}>   
                                            {value}                                             
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            {/*  */}
                            <TableBody style={{fontFamily:'Lora, serif'}}>
                                {handleSearch()
                                // we slice it so that if current is 1, we see 0-10, and 10 cryptos per page
                                .slice((page-1)*10 , (page-1)*10 +10)
                                .map((cell) =>{
                                return(
                                    <TableRow
                                    onClick={()=> navigate(`/coins/${cell?.id}`)}
                                    className={classes.cell}
                                    key={cell.name}
                                    >
                                        <TableCell 
                                        // for crypto info
                                        component="th"
                                        scope="row"
                                        styles={{display:'flex',
                                        gap:15}}>
                                        <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                                        <img src={cell?.image}
                                        alt={cell?.name}
                                        className={classes.imageStyle}/>
                                            <span className={classes.symbolStyle}>
                                                {cell?.symbol.toUpperCase()}
                                            </span>
                                            <span className={classes.nameStyle}>
                                                    {cell?.name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell 
                                    // for the  current prices
                                    className={classes.priceStyle}
                                    
                                    align ='center'>
                                       {symbol} {cell?.current_price}
                                    </TableCell>
                                    
                                    <TableCell
                                    // for the price change
                                    className={classes.priceChangeStyle}
                                    align="center"
                                    style={cell?.price_change_percentage_24h > 0 ? {color:'green'}:{color:'red'}}>
                                        {cell?.price_change_percentage_24h.toFixed(3)} %
                                    </TableCell>    

                                    <TableCell
                                    // for the price by market cap
                                    className={classes.marketCapStyle}
                                    align="center"
                                    >
                                    {symbol} {cell?.market_cap}
                                    </TableCell>    

                                    </TableRow>
                                );
                            })}
                            </TableBody>
                         </Table>
                         )}
                    </TableContainer>

                    {/* our pagination will be below the table container */}
                    <Pagination
                    style={{width:'100%', 
                    display:'flex',
                    justifyContent:'center',
                    margin:'5px',
                    padding:'2px'
                     }}
                    color="primary"
                    variant="outlined"
                    // we use the length of handle search to display 10 items per page
                    count={(handleSearch()?.length/10).toFixed(0)}
                    // scroll the window to top for the next paginated view
                    onChange={(_,value)=>{
                        setPage(value);
                        window.scroll(0,600);
                    }}

                    />

                </Container>
        </ThemeProvider>
    )
}


export default CryptoTable;