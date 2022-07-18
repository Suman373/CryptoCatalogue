import React from "react";
import { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(() => ({
    footerContainerStyle: {
        height: '12rem',
        width: '100%',
        display: 'grid',
        margin: '5px auto',
        placeContent: 'center',
        background: '#ED8607',
        textAlign: 'center',
        overflowX: 'hidden',
        '@media(max-width:500px)': {
            height: '15rem',
            margin: '1rem auto'
        }
    },
    titleStyle: {
        color: 'white',
        fontFamily: 'Volkorn, serif',
        fontSize: '1.8rem',
        padding: '10px 0',
        '@media(max-width:500px)': {
            fontSize: '1.5rem'
        }
    },
    emailField: {
        fontSize: '1.5rem',
        width: '30rem',
        margin: '0 auto',
        paddingBottom: '10px',
        '@media(max-width:500px)': {
            fontSize: '1rem',
            width: '85%'
        }
    },
    linkStyle: {
        margin: '1rem',
        color: 'black',
        fontSize: '1.2rem',
        cursior: 'pointer',
        fontFamily: 'Lora ,serif',
        '@media(max-width:500px)': {
            fontSize: '1rem'
        },
        '&:hover':{
            color:'white',
            textDecoration:'underline'
        }
    },
    buttonStyle:{
        width:'5rem',
        background:'#1d1b1b',
        color:'white',
        cursor:'pointer',
        '&:hover':{
            color:'yellow'
        },
        '@media(max-width:500px)':{
            margin:'10px',
        }
    },
    footerText:{
        fontSize: "1.4rem",
        textAlign: 'center',
        margin: '10px 0',
        color: 'white',
        '@media(max-width:500px)':{
            fontSize:'1rem'
        }
    }
}))

const Footer = () => {

    // classes for styling objects
    const classes = useStyles();

    // state for the email 
    const [email, setEmail] = useState('');

    // submit state
    const [submit, setSubmit] = useState(false);

    // validity messssage 
    const [valid, setValid] = useState("");

    // handlesubmit function
    const handleSubmit = (e) => {
        // console.log('submission done', email);
        setSubmit(true);
        setValid('You have subscribed successfully');

    }
    // on mount and re-renders
    useEffect(() => {
        setValid("");
    }, [])


    return (
        <div className={classes.footerContainerStyle}>
            <>
                <span className={classes.titleStyle}>Subscribe to our newsletter</span>
                <div>
                    <TextField
                        className={classes.emailField}
                        label="Email"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="current-email"
                        InputLabelProps={{
                            style: {
                                color: 'black',
                            }
                        }} />
                    <Button
                        className={classes.buttonStyle}
                        onClick={(e) => handleSubmit(e)}
                        variant="contained">
                        →
                    </Button>
                </div>
                {/* if submitted show message */}
                <>{submit === true ? <p>{valid}</p> : " "}</>
            </>
            <Typography>
                <Link className={classes.linkStyle} to="/">Home</Link>
                <Link className={classes.linkStyle} to="/about">About</Link>
            </Typography>
            <p className={classes.footerText}>No Copyright &copy; Crypto Catalogue ~ Suman Roy Few Rights Reserved 2022 </p>
        </div>
    )
}
export default Footer;