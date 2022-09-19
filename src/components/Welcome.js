import { getRandomQuote } from '../utils/helperFunctions';

const Welcome = () => {
    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">Welcome</h1>
                <p className="col-md-8 fs-4">To get started, select the ticker symbol of a company you would like to research above and click on search.</p>
                <figure className="col-md-8 fs-6">
                    <blockquote className="blockquote fs-6">
                        <p><i>{ getRandomQuote() }</i></p>
                    </blockquote>
                    <figcaption className="blockquote-footer">
                        Warren Buffet
                    </figcaption>
                </figure>
            </div>
        </div>
      );
}
 
export default Welcome;