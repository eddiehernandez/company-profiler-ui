const About = () => {
    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">About This</h1>
                <p className="col-md-8 fs-4">An easy-to-use tool that provides company financial profiles to identify potential stock investment opportunities.  No ads, no nonsense and no bias.  Just the cold hard facts that matter.  Enjoy!</p>

                <p className="col-md-8 fs-6 mb-3">
                    Usage Tips: <br /><span className="text-success">Green numbers are good</span>, <span className="text-warning">Yellow numbers are borderline</span> and <span className="text-danger">Red numbers are bad.</span>  Click on labels to learn more about different ratios and their acceptable values.
                </p>
            </div>
        </div>
      );
}
 
export default About;