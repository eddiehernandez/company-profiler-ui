
import { convertToLargeCurrency } from './helperFunctions'

const buildCompany = (data) => {

    let company = {
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
        timeSeries: data.timeSeries,
        financials: data.financials,
        companyNews: []
    }

    if (!company?.companyStats?.freeCashFlowPerShareTTM)
        company.companyStats.freeCashFlowPerShareTTM = (parseFloat(data?.companyStats?.freeCashFlowTTM) / parseFloat(data?.sharesOutstanding))
        

    for (const news of data.companyNews)
        company.companyNews.push({
            datetime: news?.datetime,
            headline: news?.headline,
            id: news?.id,
            image: news?.image,
            related: news?.related,
            summary: news?.summary,
            url: news?.url,
            source: news?.source    
        })


    return company;


}

export { buildCompany }