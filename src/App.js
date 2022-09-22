import Navbar from "./components/Navbar";
import Company from "./components/company/Company";
import Footer from "./components/Footer"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from "./components/about/About";
import Welcome from "./components/Welcome";
import NotFound from "./components/NotFound";

function App() {

  const host = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API : process.env.REACT_APP_PROD_API 

  return (
    <Router>
      <div className="App">
        <div className="container py-4">

          <header>
            <Navbar host={ host } />
          </header>

          <div className="py-1 mb-3 content">
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/companies/:companyTicker">
                <Company host={ host } />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
          <footer className="pt-3 text-muted border-top">
            <Footer />
          </footer>
        
        </div>
      </div>
    </Router>

   
  );
}

export default App;
