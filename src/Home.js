import { useState } from 'react';
import SearchBar from './SearchBar';
import CompanyProfile from './components/CompanyProfile';

const Home = () => {

    const [companyTicker, setCompanyTicker] = useState(null);

    const handleSearch = (ticker) => {
        //setCompanyTicker(companyTicker)
        setCompanyTicker(ticker);
    }

    return (
        <div className="container p-0">
            <div className="row">
                <div className="col">
                    <SearchBar handleSearch={ handleSearch } />
                </div>
            </div>
            <div className="row my-3">
                <div className="col">
                    <CompanyProfile companyTicker={companyTicker} />
                </div>
            </div>
        </div>
      );
}
 
export default Home;