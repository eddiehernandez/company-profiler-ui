import { useState } from 'react';
import SearchBar from './SearchBar';
import CompanyProfile from './CompanyProfile';

const Company = () => {

    const [companyTicker, setCompanyTicker] = useState(null);

    const handleSearch = (ticker) => {
        //setCompanyTicker(companyTicker)
        setCompanyTicker(ticker);
    }

    return (
        <div className="Company">
            <SearchBar handleSearch={ handleSearch } />
            <div className="searchResult my-3">
                <CompanyProfile companyTicker={companyTicker} />
            </div>
        </div>
      );
}
 
export default Company;