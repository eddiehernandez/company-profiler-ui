import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import useFetchWithCache from '../hooks/useFetchWithCache'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = ({ host }) => {

  const [selectedCompany, setSelectedCompany] = useState('');
  const [companySearchList, setCompanySearchList] = useState(null);
  const history = useHistory()
  const { user } = useAuthContext()
  
  const url = `${host}/companies`
  const { error, isPending, data} = useFetchWithCache(url, 'cp.tickersList')

  const { logout } = useLogout()

  useEffect(() => {
    setCompanySearchList(data)
  }, [data])

  const handleSearch = (e) => {
    e.preventDefault()
    history.push(`/companies/${selectedCompany}`)
    setSelectedCompany('')
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-2 border-bottom">
      <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
          <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
        </svg>
        <span className="fs-4 mx-1">Company Profiler</span>
      </Link>
      <form className="row g-2 d-inline-flex mt-2 mt-md-0 ms-md-auto" onSubmit={handleSearch}>
          <div className="col-auto">
              { isPending && <div>Loading...</div> }
              { error && <div>Unable to load tickers.</div>}
              { companySearchList && <input value={ selectedCompany } onChange={ e => setSelectedCompany(e.target.value) } className="form-select" id="companySelection" name="companySelection" list="companyList" placeholder='company ticker...'  /> }
              <datalist id="companyList">
                  {
                      companySearchList && companySearchList.map(x => (
                          <option key={ x.ticker } value={ x.ticker }>{ x.name }</option>
                      ))
                  }
              </datalist>
          </div>
          <div className="col-auto">
              { companySearchList && <button className="btn btn-outline-primary" type="submit" disabled={isPending}>search</button> }
          </div>
      </form>
      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">

          {user && <button className="btn btn-link me-3 py-1 text-dark text-decoration-none" onClick={handleLogout}>Logout</button>}
          {!user && <Link className="me-3 py-2 text-dark text-decoration-none" to="/signup">Signup</Link>}
          {!user && <Link className="me-3 py-2 text-dark text-decoration-none" to="/login">Login</Link>}
          <Link className="me-3 py-2 text-dark text-decoration-none" to="/about">About</Link> 
      </nav>
    </div>
  );
}
   
export default Navbar;