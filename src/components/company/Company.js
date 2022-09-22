import CompanyProfile from './CompanyProfile';

const Company = ({ host }) => {

    return (
        <div className="Company">
            <CompanyProfile host={ host } />
        </div>
      );
}
 
export default Company;