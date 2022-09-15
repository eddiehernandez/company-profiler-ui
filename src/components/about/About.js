const About = () => {
    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">About This</h1>
                <p className="col-md-8 fs-4">Company Profiler started out as a project to showcase my software engineering skills.  Later it turned out to be a tool that I use on a daily basis to analyze companies as potential stock investments.</p>

                <p className="col-md-8 fs-6 mb-3">
                    There is much more to come so please stand by and enjoy!  Reach out with any questions you may have.  Feedback is always welcome!
                </p>
                <p className="col-md-8 fs-6 mb-3">
                    Technology Stack coming soon....
                </p>
                <p className="col-md-8 fs-6 mb-3">
                    Usage Tips: <br /><span className="text-success">Green numbers are good</span>, <span className="text-warning">Yellow numbers are borderline</span> and <span className="text-danger">Red numbers are bad.</span>  Click on labels to learn more about different ratios and their acceptable values.
                </p>
            </div>
        </div>
      );
}
 
export default About;