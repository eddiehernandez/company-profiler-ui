import { useState } from 'react';
import SearchBar from './SearchBar';
import CompanyProfile from './CompanyProfile';

const Company = () => {

    const [companyTicker, setCompanyTicker] = useState(null);
    const host = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API : process.env.REACT_APP_PROD_API 

    const handleSearch = (ticker) => {
        //setCompanyTicker(companyTicker)
        setCompanyTicker(ticker);
    }

    return (
        <div className="Company">
            <SearchBar handleSearch={ handleSearch } host={ host } />
            <div className="searchResult my-3">
                <CompanyProfile companyTicker={companyTicker} host={ host } />
            </div>
        </div>
      );
}
 
export default Company;