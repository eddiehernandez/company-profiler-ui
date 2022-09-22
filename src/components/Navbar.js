import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';

const Navbar = ({ host }) => {

  const [selectedCompany, setSelectedCompany] = useState('');
  const [companySearchList, setCompanySearchList] = useState(null);
  const history = useHistory()

  useEffect(() => {
        
    const cacheName = 'companySearchList'
    const cachedData = localStorage.getItem(cacheName);
    const abortController = new AbortController()

    const fetchCompanySearchList = async (host) => {
      try {
        const url = `${host}/companies`
        console.log(`url = ${url}`)
        const response = await fetch(url, { signal: abortController.signal } )
        if (!response.ok)
          throw Error('Unable to retrieve company list. Please try again...')

        const data = await response.json()

        setCompanySearchList(data);
        console.log('loaded company list from api');
        localStorage.setItem(cacheName, JSON.stringify(data))
        
      }
      catch (err){
        if (err.name === 'AbortError'){
          console.log('fetch aborted in searchbar')
        }
        else {
            // setIsPending(false);
            console.log(err.message);
            // setError('Unable to retrieve company list.  Please try again...');                    
        }
      }
    }

    if (cachedData) {
      console.log('loading company list from local storage')
      setCompanySearchList(JSON.parse(cachedData));
      // setIsPending(false);
      // setError(null);
    }
    else {
      fetchCompanySearchList(host)         
    }
    return () => abortController.abort();
  }, [host]);

  const handleSearch = (e) => {
    e.preventDefault()
    history.push(`/companies/${selectedCompany}`)
    setSelectedCompany('')
  }

  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-2 border-bottom">
      <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
          <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
        </svg>
        <span className="fs-4 mx-1">Company Profiler</span>
      </a>
      <form className="row g-2 d-inline-flex mt-2 mt-md-0 ms-md-auto" onSubmit={handleSearch}>
          <div className="col-auto">
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
              { companySearchList && <button className="btn btn-outline-primary" type="submit">search</button> }
          </div>
      </form>
      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <Link className="me-3 py-2 text-dark text-decoration-none" to="/">Welcome</Link>
        <Link className="me-3 py-2 text-dark text-decoration-none" to="/about">About</Link>
      </nav>
    </div>
  );
}
   
export default Navbar;