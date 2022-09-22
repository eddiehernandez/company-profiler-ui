import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="p-5 mb-4 rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Oops</h1>
                <p className="col-md-8 fs-4">That page cannot be found.</p>
                <Link to="/">Back to Welcome page</Link>
            </div>
        </div>
      );
}
 
export default NotFound;