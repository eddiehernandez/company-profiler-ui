import { useState, useEffect } from 'react';

const SearchBar = ({handleSearch}) => {

    const [selectedCompany, setSelectedCompany] = useState('');
    const handleClear = () => {
        setSelectedCompany('');
    }

    const [companySearchList, setCompanySearchList] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        const cacheName = 'companySearchList';
        const cachedData = localStorage.getItem(cacheName);
        if (cachedData) {
          console.log('loading company list from local storage')
          setCompanySearchList(JSON.parse(cachedData));
          setIsPending(false);
          setError(null);
        }
        else {
            const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/companies' : 'https://tw704iw1u2.execute-api.us-east-2.amazonaws.com/';
            console.log(process.env.NODE_ENV);
            console.log(url);
            fetch(url)
            .then(res => {
                if (!res.ok)
                    throw Error('Unable to retrieve company list. Please try again... ')
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setCompanySearchList(data);
                console.log('loaded company list from api');
                localStorage.setItem(cacheName, JSON.stringify(data))
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                console.log(err.message);
                setError('Unable to retrieve company list.  Please try again...');
            });            
        }
    }, []);


    return (  

            <form className="row pt-1 g-2">
                <div className="col-auto">
                    { isPending && <div>Loading company search list, this will only take a few moments...</div> }
                    { error && <div>{ error }</div> }
                    { companySearchList && <input value={ selectedCompany } onChange={ e => setSelectedCompany(e.target.value) } className="form-select" id="companySelection" name="companySelection" list="companyList" placeholder='company ticker or name...' size="25" /> }
                    <datalist id="companyList">
                        {
                            companySearchList && companySearchList.map(x => (
                                <option key={ x.ticker } value={ x.ticker }>{ x.name }</option>
                            ))
                        }
                    </datalist>
                </div>
                <div className="col-auto">
                    { companySearchList && <button onClick={() => handleSearch(selectedCompany)} className="btn btn-outline-primary" type="button">search</button> }
                </div>
                <div className="col-auto">
                    { companySearchList && <button onClick={ handleClear } className="btn btn-outline-primary" type="button">clear</button> }
                </div>
            </form>


    );
} 
export default SearchBar
