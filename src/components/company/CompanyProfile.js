import { useEffect, useState } from "react";
import NewsList from "./NewsList";
import CompanyStats from "./CompanyStats";
import TimeSeries from "./TimeSeries";
import Financials from "./Financials";
import { convertToCurrency } from '../../utils/helperFunctions';
import { useParams } from 'react-router-dom'
import { buildCompany } from '../../utils/companyDirector'
import useFetchWithCache from "../../hooks/useFetchWithCache"
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFavsContext } from "../../hooks/useFavsContext";

const CompanyProfile = ({ host }) => {
    
    const { favs, dispatch } = useFavsContext()
    const [isFavorite, setIsFavorite] = useState(false)
    const [company, setCompany] = useState(null) 
    const [favsPending, setFavsPending] = useState(false)
    const { companyTicker } = useParams()

    const url = `${host}/companies/${companyTicker}`
    const { error, isPending, data } = useFetchWithCache(url, `cp.${companyTicker}`)
    const { user } = useAuthContext()

    const addFavorite = async () => {
        setFavsPending(true)
        const url = `${host}/favorites`
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    ticker: companyTicker
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            const json = await response.json()

            if (!response.ok){
                console.error(json.error)
            }
            if (response.ok){
                console.log(`added new favorite...`, json)
                dispatch({ type: 'CREATE_FAV', payload: json })
                setIsFavorite(true)
            }
        }
        catch (error){
            console.error(error)
        }
        finally{
            setFavsPending(false)
        }


    }

    const deleteFavorite = async () => {
        setFavsPending(true)
        console.log(`removing ${companyTicker} from favs`)
        const url = `${host}/favorites/${companyTicker}`
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }
            })
            // const json = await response.json()

            if (response.ok){
                console.log('deleted fav')
                dispatch({ type: 'DELETE_FAV', payload: {
                    email: user?.email,
                    ticker: companyTicker
                }})
                setIsFavorite(false)
            }

        }
        catch (error){
            console.error(error)
        }
        finally{
            setFavsPending(false)
        }

    }


    useEffect(() => {
        if (data){
            setCompany(buildCompany(data))
            if (favs){
                if (favs.filter(f => f.ticker === companyTicker).length > 0){
                    setIsFavorite(true)
                }
                else {
                    setIsFavorite(false)
                }
            }

        }
        else {
            setCompany(null)
        }
    }, [data, companyTicker, favs])

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
                    <div className="col-sm-1">
                        { isFavorite && !favsPending &&
                            <svg onClick={deleteFavorite} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16" style={{color: "orange"}}>
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                        }
                        { !isFavorite && !favsPending &&
                            <svg onClick={addFavorite} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16" style={{color: "orange"}}>
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                            </svg>
                        }                 
                    </div>
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