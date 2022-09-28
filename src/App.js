import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// components
import Navbar from "./components/Navbar";
import Company from "./components/company/Company";
import Footer from "./components/Footer"
import About from "./components/about/About";
import Welcome from "./components/Welcome";
import NotFound from "./components/NotFound";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

function App() {

  const host = process.env.REACT_APP_API
  const { user } = useAuthContext()

  return (
    <div className="App">

        {!host && 
          <div className="container">
            <h1>Application Error</h1>
            <p>Environment variable missing - REACT_APP_API</p>
          </div>
        }
        
        {host &&

          <div className="container py-4">
          <Router>
            <header>
              <Navbar host={ host } />
            </header>

            <div className="py-1 mb-3 content">
              <Switch>
                <Route exact path="/">
                  { user ? <Welcome /> : <Redirect to="/login" /> }
                </Route>

                <Route path="/about">
                  <About />
                </Route>
                
                <Route path="/companies/:companyTicker">
                  { user ? <Company host={ host } /> : <Redirect to="/login" /> }
                </Route>

                <Route path="/login">
                  { !user ? <Login /> : <Redirect to="/" /> }
                </Route>
                
                <Route path="/signup">
                  { !user ? <Signup /> : <Redirect to="/" /> }
                </Route>                
                
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              
              </Switch>
            </div>
            <footer className="pt-3 text-muted border-top">
              <Footer />
            </footer>
            </Router>
          </div>
        }

    </div>
   
  );
}

export default App;
