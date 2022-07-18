import './App.css';
import {BrowserRouter as BRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import { Homepage } from './pages/Homepage';
import { Coin } from './pages/Coin';
import About from './pages/About';
// using styled components and no dependency related to @emotions/react has been added
import {ThemeProvider,createTheme,makeStyles } from '@material-ui/core/styles' // these are necessary for using mui v5+ which is suitable or React 17+, also createMuiTheme has been deprecated

const theme = createTheme();
  const useStyles = makeStyles(()=>({
    // wrap the {} inside a normal parenthesis as this doesn''t give error in React 18. Also note that makeStyles also has an alternative of 'styled' 
    App:{
      minHeight:'100vh',
      background:'#1d1b1b',
      color:'white'
    }

  }))
function App() {
  const classes = useStyles(); // this is expected to be inside a component
  return (
    // theme provider is the wrapper here syntax: <ThemeProvider> {children} </ThemeProvider>
    <ThemeProvider theme={theme}> 
    <BRouter>
    <div className={classes.App}>
        <Header/>
        <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/coins/:id" element={<Coin/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        </Routes>
    </div>
    </BRouter>
    </ThemeProvider>
  );
}

export default App;
