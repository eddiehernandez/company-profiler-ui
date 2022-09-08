import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./components/Footer"

function App() {
  return (

    <div className="container">
      <div className="row">
        <div className="col">
        <Navbar />
        </div>
      </div>
      <div className="row">
        <div className="col">
        <Home />        
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Footer />
        </div>
      </div>
    </div>
   
  );
}

export default App;
