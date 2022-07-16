import React from "react";
import axios from "axios";
import { useState, useEffect} from "react";
import { CryptoList } from "../configs/api";
import { CryptoState } from "../context/CrypContext";
import {Container,createTheme , Typography, TextField, TableContainer, LinearProgress, Table ,TableHead, TableRow , TableCell, TableBody, } from '@material-ui/core'
import { ThemeProvider} from "@material-ui/styles";
import { makeStyles } from '@material-ui/styles';
import {useNavigate} from 'react-router-dom';
// styling
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
        width:'30rem',
        paddingBottom:'10px',
        '@media(max-width:400px)':{
            width:'85%'
        }
    },
    headValue:{
        color:"#ED8607",
        fontFamily:'Lora, serif',
        fontSize:'1.5rem',
        '@media(max-width:400px)':{
            fontSize:'0.9rem'
        }
    },
    cell:{
        cursor:'pointer',
        background:'rgb(0,0,0,0.3)'
    },
    symbolStyle:{
        fontSize:'1.5rem',
        color:'white'
    },
    nameStyle:{
        fontSize:'1.1rem',
        color:'grey'
    },
    priceStyle:{
        fontSize:'1.3rem',
        color:'yellow'
    }
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

    // for the theme of the container , using palette
    const goldenTheme = createTheme({
        palette: {
            primary: {
                // main: "#1d1b1b" this goes for the black/ dark theme
                main: '#ED8607'
            },
            type:'dark'
        }
    })

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

                    <Typography className={classes.title}>
                        Cryptos on basis of Market Cap
                    </Typography>
                {/* This is the input field/ search field */}
                    <TextField 
                    className={classes.textField}
                    variant="filled"
                     label="Search cryptocurrency"
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
                                            align={value === "Coin" ? "" : "left"}
                                            key={value}>   
                                            {value}                                             
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            {/*  */}
                            <TableBody style={{fontFamily:'Lora, serif'}}>{handleSearch().map((cell) =>{
                                const priceChange = cell.price_change_percentage_24;
                                return(
                                    <TableRow
                                    onClick={()=> navigate(`/coins/:${cell?.id}`)}
                                    className={classes.cell}
                                    key={cell.name}
                                    >
                                        <TableCell 
                                        // for crypto info
                                        component="th"
                                        scope="row"
                                        styles={{display:'flex',
                                        gap:15}}>
                                        <img src={cell?.image}
                                        alt={cell?.name}
                                        style={{height:'3rem',width:'3rem',marginBottm:'1rem'}}/>
                                        <div style={{display:'flex', flexDirection:'column'}}>
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
                                    // style={cell?.current_price > 0 ? {color:'green'}:{color:'red'}}
                                    align ='center'>
                                       {symbol} {cell?.current_price}
                                    </TableCell>
                                    </TableRow>
                                );
                            })}
                            </TableBody>
                         </Table>
                         )}
                    </TableContainer>
                </Container>
        </ThemeProvider>
    )
}


export default CryptoTable;