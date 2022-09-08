import { useEffect, useState } from "react";
import NewsList from "./NewsList";
import CompanyStats from "./CompanyStats";


const CompanyProfile = ({companyTicker}) => {

    const [company, setCompany] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);    

    const convertMarketCap = (marketCap) => {
        if (parseInt(marketCap).toString().length > 3) // Billions
            return (parseFloat(marketCap) / 1000).toFixed(2).toString() + ' B';
        else // Millions
            return parseFloat(marketCap).toFixed(2).toString() + ' M';
    }

    useEffect(() => {
        if (companyTicker){
            setCompany(null); //clear out older company
            setIsPending(true);
            setError(false);
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
                    // console.log(data); //debug statement
                    const myCompany = {
                        name: data.name,
                        ticker: data.ticker,
                        country: data.country,
                        currency: data.currency,
                        exchange: data.exchange,
                        industry: data.industry,
                        logo: data.logo,
                        marketCapitalization: convertMarketCap(data.marketCapitalization),
                        sharesOutstanding: parseFloat(data.sharesOutstanding).toFixed(2).toString(),
                        website: data.website,
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
                    setError(`Unable to retrieve company, with ticker ${companyTicker}`);
                });   
        }
    }, [companyTicker]);


    return (
        <div className="CompanyProfile">
            { isPending && <div>Loading company: {companyTicker}...</div> }
            { error && <div>{ error }</div> }
            {company && 
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <div className="container">
                            <div className="row">
                                <div className="col-4">Name:</div>
                                <div className="col">{company.name}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Ticker:</div>
                                <div className="col">{company.ticker}</div>
                            </div>

                            <div className="row">
                                <div className="col-4">Country:</div>
                                <div className="col">{company.country}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Currency:</div>
                                <div className="col">{company.currency}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Exchange:</div>
                                <div className="col">{company.exchange}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Industry:</div>
                                <div className="col">{company.industry}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">MarketCap:</div>
                                <div className="col">{company.marketCapitalization}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Shares Outstanding:</div>
                                <div className="col">{company.sharesOutstanding}</div>
                            </div>
                            <div className="row">
                                <div className="col-4">Website:</div>
                                <div className="col"><a rel="noreferrer" target="_blank" href={company.website}>{company.website}</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 text-left"><img className="img-fluid float-left" alt="" src={company.logo} /></div>
                </div>
                <div className="row my-3">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-stats-tab" data-bs-toggle="tab" data-bs-target="#nav-stats" type="button" role="tab" aria-controls="nav-stats" aria-selected="true">Stats</button>
                            <button className="nav-link" id="nav-news-tab" data-bs-toggle="tab" data-bs-target="#nav-news" type="button" role="tab" aria-controls="nav-news" aria-selected="false">News</button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active p-3" id="nav-stats" role="tabpanel" aria-labelledby="nav-stats-tab">
                            <div className="company-stats">
                                <CompanyStats companyStats={company?.companyStats}/>
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