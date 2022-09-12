import { useEffect, useState } from "react";
import NewsList from "./NewsList";
import CompanyStats from "./CompanyStats";
import Trends from "./Trends";
import { convertToLargeCurrency, convertToCurrency, getRandomQuote } from '../../utils/helperFunctions';


const CompanyProfile = ({companyTicker}) => {

    const [company, setCompany] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);    
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        if (companyTicker){
            setCompany(null); //clear out older company
            setIsPending(true);
            setError(false);
            setShowWelcome(false);
            console.log(`loading company with ticker ${companyTicker}`);
            const url = process.env.NODE_ENV === 'development' ? `http://localhost:3000/companies/${companyTicker}` : `https://tw704iw1u2.execute-api.us-east-2.amazonaws.com/companies/${companyTicker}`;
            // console.log(process.env.NODE_ENV);
            // console.log(url);            
            fetch(url)
                .then(res => {
                    if (!res.ok)
                        throw Error('Unable to retrieve company. Please try again... ')
                    return res.json();
                })
                .then(data => {
                    setIsPending(false);
                    console.log(data); //debug statement
                    const myCompany = {
                        name: data.name,
                        ticker: data.ticker,
                        country: data.country,
                        currency: data.currency,
                        exchange: data.exchange,
                        industry: data.industry,
                        logo: data.logo,
                        marketCapitalization: convertToLargeCurrency(data.marketCapitalization),
                        sharesOutstanding: convertToLargeCurrency(data.sharesOutstanding),
                        sharesOutstandingRaw: data.sharesOutstanding,
                        website: data.website,
                        stockPrice: data.stockPrice,
                        stockPriceAsOfDateTime: data.stockPriceAsOfDateTime,
                        companyStats: data.companyStats,
                        companyNews: []
                    }
                    for (const news of data.companyNews)
                        myCompany.companyNews.push({
                            datetime: news?.datetime,
                            headline: news?.headline,
                            id: news?.id,
                            image: news?.image,
                            related: news?.related,
                            summary: news?.summary,
                            url: news?.url,
                            source: news?.source    
                        })
                    console.log(myCompany)
                    setCompany(myCompany); 
                    setError(null);
                })
                .catch(err => {
                    setIsPending(false);
                    console.log(err.message);
                    setError(`Unable to retrieve company, with ticker ${companyTicker}.  Tip: Make sure to select company ticker from list when performing a search.`);
                });   
        }
    }, [companyTicker]);


    return (
        <div className="CompanyProfile">
            { isPending && <div>Loading company: {companyTicker}...</div> }
            { error && <div>{ error }</div> }
            { showWelcome && 
                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">Welcome</h1>
                        <p className="col-md-8 fs-4">To get started, select the ticker symbol of a company you would like to research above and click on search.</p>
                        <p className="col-md-8 fs-6 mb-3">Usage Tips: <span className="text-success">Green numbers are good</span>, <span className="text-warning">Yellow numbers are borderline</span> and <span className="text-danger">Red numbers are bad.</span>  Click on labels to learn more about different ratios and their acceptable values.</p>
                        <figure className="col-md-8">
                            <blockquote className="blockquote">
                                <p>{ getRandomQuote() }</p>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                Warren Buffet
                            </figcaption>
                        </figure>
                    </div>
                </div>
            }
            {company && 
            <div className="pt-3 border-top">
                <div className="row">
                    <div className="col-sm-8">
                        <table className="table table-sm">
                            <tbody>
                                <tr>
                                    <td>Company (Ticker):</td>
                                    <td>{company.name} ({company.ticker})</td>
                                </tr>
                                <tr>
                                    <td>Country / Currency:</td>
                                    <td>{company.country} / {company.currency}</td>
                                </tr>
                                <tr>
                                    <td>Exchange:</td>
                                    <td>{company.exchange}</td>
                                </tr>
                                <tr>
                                    <td>Industry:</td>
                                    <td>{company.industry}</td>
                                </tr>
                                <tr>
                                    <td>MarketCap:</td>
                                    <td>{company.marketCapitalization}</td>
                                </tr>
                                <tr>
                                    <td>Shares Outstanding:</td>
                                    <td>{company.sharesOutstanding}</td>
                                </tr>
                                <tr>
                                    <td>
                                        Stock Price:<br />
                                    </td>
                                    <td>{convertToCurrency(company.stockPrice)} <small className="text-secondary"><i>({company.stockPriceAsOfDateTime})</i></small></td>
                                </tr>
                                <tr>
                                    <td>Website:</td>
                                    <td><a rel="noreferrer" target="_blank" href={company.website}>{company.website}</a></td>
                                </tr>                                
                            </tbody>

                        </table>
                    </div>
                    <div className="col-sm-1">&nbsp;</div>
                    <div className="col-sm-3 text-left"><img className="img-fluid float-left" alt="" src={company.logo} /></div>
                </div>
                <div className="row my-3">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-stats-tab" data-bs-toggle="tab" data-bs-target="#nav-stats" type="button" role="tab" aria-controls="nav-stats" aria-selected="true">Stats</button>
                            <button className="nav-link" id="nav-trends-tab" data-bs-toggle="tab" data-bs-target="#nav-trends" type="button" role="tab" aria-controls="nav-trends" aria-selected="false">Trends</button>
                            <button className="nav-link" id="nav-news-tab" data-bs-toggle="tab" data-bs-target="#nav-news" type="button" role="tab" aria-controls="nav-news" aria-selected="false">News</button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active p-3" id="nav-stats" role="tabpanel" aria-labelledby="nav-stats-tab">
                            <div className="company-stats">
                                <CompanyStats companyStats={company?.companyStats} stockPrice={company.stockPrice} sharesOutstanding={company.sharesOutstandingRaw} />
                            </div>
                        </div>
                        <div className="tab-pane fade p-3" id="nav-trends" role="tabpanel" aria-labelledby="nav-trends-tab">
                            <div className="time-trends">
                                <Trends />
                            </div>
                        </div>
                        <div className="tab-pane fade p-3" id="nav-news" role="tabpanel" aria-labelledby="nav-news-tab">
                            <div className="news-articles">
                                <NewsList newsList={company?.companyNews}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            }

        </div>
      );
}
 
export default CompanyProfile;