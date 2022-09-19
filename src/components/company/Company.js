import CompanyProfile from './CompanyProfile';

const Company = () => {

    const host = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_API : process.env.REACT_APP_PROD_API 

    return (
        <div className="Company">
            <CompanyProfile host={ host } />
        </div>
      );
}
 
export default Company;