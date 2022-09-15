import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-2 border-bottom">
        <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
          <span className="fs-4">Company Profiler</span>
        </a>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <Link className="me-3 py-2 text-dark text-decoration-none" to="/">Search</Link>
          <Link className="me-3 py-2 text-dark text-decoration-none" to="/about">About</Link>
        </nav>
      </div>
    );
  }
   
  export default Navbar;