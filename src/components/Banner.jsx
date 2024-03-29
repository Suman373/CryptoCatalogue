import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import bg from "../assets/headerimg.jpg";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  // this is the div / container for all components needed for the banner
  banner: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    overflow: "hidden",
  },
  bannerContainer: {
    height: "30rem",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: "2rem",
    alignItems: "center",
    overflowX: "hidden",
  },
  bannerTitle: {
    textAlign: "center",
    fontSize: "3rem",
    color: "#ffffff",
    fontFamily: "Vollkorn,serif",
    "@media(max-width:400px)": {
      fontSize: "2.3rem",
    },
  },
  infoStyle: {
    color: "#ffffff",
    fontSize: "1.3rem",
    textAlign: "center",
    fontFamily: "Lora, serif",
    "@media(max-width:400px)": {
      fontSize: "1.1rem",
    },
  },
}));

const Banner = () => {
  // classes holding the useStyles object items for styling
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContainer}>
        <div className={classes.bannerTitle}>Crypto Catalogue</div>
        <div className={classes.infoStyle}>
          A designated catalogue for all top crypto currencies
        </div>
        <Carousel />
      </Container>
    </div>
  );
};
export default Banner;
