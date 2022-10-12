import { convertToLargeCurrency, convertToCurrency, formatDate, getRatioTextColor, getRatioTextColorReverse } from "../../utils/helperFunctions"


const CompanyStats = ({companyStats, stockPrice, sharesOutstanding}) => {
    const formatToPercent = (value) => (isNaN(parseFloat(value))) ? '' : (parseFloat(value)).toFixed(2).toString() + '%';    
    const convertAndFormatToPercent = (value) => (isNaN(parseFloat(value))) ? '' : (parseFloat(value) * 100).toFixed(2).toString() + '%';

    return (  
        <div className="">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <h5 className="card-header">Financial Highlights</h5>
                        <div className="card-body">
                            <table className="table table-sm">
                                <tbody>
                                    <tr>
                                        <th colSpan="2">Income Statement</th>
                                    </tr>
                                    <tr>
                                        <td>Revenue Growth 1Y (TTM):</td>
                                        <td className={ getRatioTextColor(companyStats.revenueGrowthOneYearTTM, 15, 0) }>{formatToPercent(companyStats.revenueGrowthOneYearTTM)}</td>
                                    </tr>
                                    <tr>
                                        <td>Revenue Growth 3Y:</td>
                                        <td className={ getRatioTextColor(companyStats.revenueGrowthThreeYear, 15, 0) }>{formatToPercent(companyStats.revenueGrowthThreeYear)}</td>
                                    </tr>
                                    <tr>
                                        <td>Revenue Growth 5Y:</td>
                                        <td className={ getRatioTextColor(companyStats.revenueGrowthFiveYear, 15, 0) }>{formatToPercent(companyStats.revenueGrowthFiveYear)}</td>
                                    </tr>

                                    <tr>
                                        <th className="pt-4" colSpan="2" >Balance Sheet</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#collapseQuickRatio" data-bs-toggle="collapse">Quick Ratio: </a> <small className="text-secondary"><i>{ formatDate(companyStats.quickRatioQuarterly.period) }</i></small>
                                        </td>
                                        <td className={ getRatioTextColor(companyStats.quickRatioQuarterly.value, 1.5, 1) }>{ companyStats.quickRatioQuarterly.value }</td>
                                    </tr>
                                    <tr className="collapse" id="collapseQuickRatio">
                                        <td colSpan="2">
                                            <div >
                                                <p className="form-text">
                                                    The quick ratio is an indicator of a company’s short-term liquidity position and measures a company’s ability to meet its short-term obligations with its most liquid assets.
                                                </p>
                                                <p className="form-text">
                                                    A higher quick ratio <strong>(above 1.5)</strong> signals that a company can be more liquid and generate cash quickly in case of emergency.
                                                </p>
                                                <p>Quick Ratio = (Cash + Cash Equivalents + Marketable Securities + Net Accounts Receivable) / Current Liabilities</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <a href="#collapseCurrentRatio" data-bs-toggle="collapse">Current Ratio: </a> <small className="text-secondary"><i>{ formatDate(companyStats.currentRatioQuarterly.period) }</i></small>
                                        </td>
                                        <td className={ getRatioTextColor(companyStats.currentRatioQuarterly.value, 1.5, 1) }>{ companyStats.currentRatioQuarterly.value }</td>
                                    </tr>
                                    <tr className="collapse" id="collapseCurrentRatio">
                                        <td colSpan="2">
                                            <div >
                                                <p className="form-text">
                                                    The current ratio is a liquidity ratio that measures a company’s ability to pay short-term obligations or those due within one year. It tells investors and analysts how a company can maximize the current assets on its balance sheet to satisfy its current debt and other payables.
                                                </p>
                                                <p className="form-text">
                                                    Current assets listed on a company’s balance sheet include cash, accounts receivable, inventory, and other current assets (OCA) that are expected to be liquidated or turned into cash in less than one year.  <strong>Values higher than 1.5 is acceptable.</strong>  Numbers that are too high can also be an indicator that the company is not fully utilizing current assets to grow the business.
                                                </p>
                                                <p>Current Ratio = Current Assets / Current Liabilities</p>
                                            </div>
                                        </td>
                                    </tr>                                    
                                    <tr>
                                        <td>LT Debt to Equity: <small className="text-secondary"><i>{ formatDate(companyStats.longTermDebtToEquityQuarterly.period) }</i></small></td>
                                        <td className={ getRatioTextColorReverse(companyStats.longTermDebtToEquityQuarterly.value, 0.5, 1) }>{ companyStats.longTermDebtToEquityQuarterly.value }</td>
                                    </tr>
                                    <tr>
                                        <td>Total Debt to Equity: <small className="text-secondary"><i>{ formatDate(companyStats.totalDebtToEquityQuarterly.period) }</i></small></td>
                                        <td className={ getRatioTextColorReverse(companyStats.totalDebtToEquityQuarterly.value, 0.5, 1) }>{ companyStats.totalDebtToEquityQuarterly.value }</td>
                                    </tr>

                                    <tr>
                                        <th className="pt-4" colSpan="2" >Cash Flow</th>
                                    </tr>

                                    <tr>
                                        <td>Price to Cash Flow (TTM):</td>
                                        <td className={ getRatioTextColorReverse((companyStats.pfcfShareTTM), 10, 14) }>{ companyStats.pfcfShareTTM }</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Owner Earnings (TTM):<br/>
                                            <small className="text-secondary">aka CF per Share</small>
                                        </td>
                                        <td className={ getRatioTextColor(companyStats.cashFlowPerShareTTM, .01, 0) }>{convertToCurrency(companyStats.cashFlowPerShareTTM)}</td>
                                    </tr>
                                    <tr>
                                        <td>Owner Earnings Yield (TTM):</td>
                                        { !stockPrice && <td>N/A</td> }
                                        { stockPrice && (stockPrice !== 0) &&
                                            <td className={ getRatioTextColor(companyStats.cashFlowPerShareTTM / stockPrice * 100, 10, 9)}>{ convertAndFormatToPercent(companyStats.cashFlowPerShareTTM / stockPrice) }</td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>                
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <h5 className="card-header">Other Stats</h5>
                        <div className="card-body">
                            <table className="table table-sm">
                                <tbody>
                                    <tr>
                                        <th colSpan="2">Dividends</th>
                                    </tr>
                                    <tr>
                                        <td>Dividend Yield (TTM)</td>
                                        <td>{ formatToPercent(companyStats.dividendYieldTTM) }</td>
                                    </tr>
                                    <tr>
                                        <td>Dividend Growth Rate 5Y</td>
                                        <td>{ formatToPercent(companyStats.dividendGrowthRate5Y) }</td>
                                    </tr>
                                    <tr>
                                        <td>Payout Ratio (TTM)</td>
                                        <td>{ formatToPercent(companyStats.payoutRatioTTM) }</td>
                                    </tr>
                                    <tr>
                                        <th className="pt-4" colSpan="2">Management Effectiveness</th>
                                    </tr>
                                    <tr>
                                        <td>Return on Equity: <small className="text-secondary"><i>{ formatDate(companyStats.roeTTM.period) }</i></small></td>
                                        <td>{ convertAndFormatToPercent(companyStats.roeTTM.value) }</td>
                                    </tr>
                                    <tr>
                                        <td>Return on Invested Capital: <small className="text-secondary"><i>{ formatDate(companyStats.roeTTM.period) }</i></small></td>
                                        <td>{ convertAndFormatToPercent(companyStats.roicTTM.value) }</td>
                                    </tr>
                                    <tr>
                                        <th className="pt-4" colSpan="2" >Target Prices</th>
                                    </tr>
                                    <tr>
                                        <td>OE Yield (10%):</td>
                                        <td>
                                            { (companyStats.cashFlowPerShareTTM <= 0) && <div>N/A</div> }
                                            { (companyStats.cashFlowPerShareTTM > 0) && convertToCurrency(companyStats.cashFlowPerShareTTM / .10) }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>                     
                </div>

            </div>
        </div>
    );
}
 
export default CompanyStats;