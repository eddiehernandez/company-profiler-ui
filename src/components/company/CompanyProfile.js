import { useEffect, useState } from "react";
import NewsList from "./NewsList";
import CompanyStats from "./CompanyStats";
import TimeSeries from "./TimeSeries";
import Financials from "./Financials";
import { convertToCurrency } from '../../utils/helperFunctions';
import { useParams } from 'react-router-dom'
import { buildCompany } from '../../utils/companyDirector'
import useFetchWithCache from "../../hooks/useFetchWithCache"

const CompanyProfile = ({host}) => {

    const [company, setCompany] = useState(null) 
    const { companyTicker } = useParams()

    const url = `${host}/companies/${companyTicker}`
    const { error, isPending, data } = useFetchWithCache(url, `cp.${companyTicker}`)

    useEffect(() => {
        if (data)
            setCompany(buildCompany(data))
        else
            setCompany(null)
    }, [data])

    return (
        <div className="CompanyProfile">
            { isPending && <div>Loading company...</div> }
            { error && <div>{ error }</div> }
            {company && 
            <div>
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
                            <button className="nav-link active" id="nav-stats-tab" data-bs-toggle="tab" data-bs-target="#nav-stats" type="button" role="tab" aria-controls="nav-stats" aria-selected="true">stats</button>
                            <button className="nav-link" id="nav-series-tab" data-bs-toggle="tab" data-bs-target="#nav-series" type="button" role="tab" aria-controls="nav-series" aria-selected="false">series</button>
                            <button className="nav-link" id="nav-financials-tab" data-bs-toggle="tab" data-bs-target="#nav-financials" type="button" role="tab" aria-controls="nav-financials" aria-selected="false">financials</button>
                            <button className="nav-link" id="nav-news-tab" data-bs-toggle="tab" data-bs-target="#nav-news" type="button" role="tab" aria-controls="nav-news" aria-selected="false">news</button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active p-3" id="nav-stats" role="tabpanel" aria-labelledby="nav-stats-tab">
                            <div className="company-stats">
                                <CompanyStats companyStats={company?.companyStats} stockPrice={company.stockPrice} sharesOutstanding={company.sharesOutstandingRaw} />
                            </div>
                        </div>
                        <div className="tab-pane fade p-3" id="nav-series" role="tabpanel" aria-labelledby="nav-series-tab">
                            <div className="time-series">
                                <TimeSeries timeSeries={company.timeSeries} />
                            </div>
                        </div>
                        <div className="tab-pane fade p-3" id="nav-financials" role="tabpanel" aria-labelledby="nav-financials-tab">
                            <div className="time-financials">
                                <Financials financials={company?.financials} />
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