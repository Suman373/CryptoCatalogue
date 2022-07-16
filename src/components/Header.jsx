import React from "react";
import { AppBar, Container, Typography, Toolbar, Select, MenuItem } from "@material-ui/core";
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from "../context/CrypContext";

const useStyles = makeStyles(() => ({

    titleStyle: {
        flex:'1',
        fontSize: '1.8rem',
        color: '#ED8607',
        fontWeight: '500',
        fontFamily: 'Vollkorn, serif',
        cursor: 'pointer',
        '@media(max-width:400px)':{ 
         fontSize:'1.5rem',
         marginTop:'5px'
    }

    },
    menuStyle: {
        width: '5.2rem',
        height: '2.3rem',
        marginTop: '8px',
        marginRight:'1rem',
        color: 'white',
        fontWeight:'600',
        background: '#ED8607',
        '@media(max-width:400px)':
        {width:'4.4rem', 
        height:'2rem',
        fontSize:'0.7rem',
    }
    },
    
}));

const Header = () => {
  
    const titleAcro = "MCC"

    //  useStyles in classes and then the styles are used like an object content by using dot notation
    const classes = useStyles();
    // useNavigate for redirecting to homepage
    const navigate = useNavigate();

    // creating the theme to be available to our whole header
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#1d1b1b"
            },
            type: "dark",
        }
    })

    // our context state for the crypto symbols
    const {currency , setCurrency} = CryptoState();
    
    return (
        <ThemeProvider theme={darkTheme}>
            <div className="header-container" >
                <AppBar color="transparent" position="static">
                    <Container>
                        <Toolbar>
                            <Typography 
                            className={classes.titleStyle}
                            onClick={()=> navigate('/')}
                            >
                               {titleAcro}
                            </Typography>
                            <Select variant="outlined"
                                className={classes.menuStyle}
                                value={currency}
                                onChange={(e)=>setCurrency(e.target.value)}
                                >
                                <MenuItem
                                    value={"INR"}>INR
                                </MenuItem>
                                <MenuItem
                                    value={"USD"}>USD
                                </MenuItem>
                                <MenuItem
                                    value={"EUR"}>EUR
                                </MenuItem>
                                <MenuItem
                                    value={"JPY"}>JPY
                                </MenuItem>
                            </Select>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        </ThemeProvider>
    );
}
export default Header;