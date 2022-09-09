import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer"

function App() {
  return (
    <div className="main">
      <div className="container py-4">

        <header className="py-1 mb-3 border-bottom">
          <Navbar />
        </header>

        <div className="py-1 mb-3">
          <Home />        
        </div>

        <footer className="pt-3 text-muted border-top">
          <Footer />
        </footer>
      
      </div>
    </div>
   
  );
}

export default App;
