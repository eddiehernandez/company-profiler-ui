import { convertToLargeCurrency, convertToCurrency } from '../utils/helperFunctions';


const CompanyStats = ({companyStats, stockPrice, sharesOutstanding}) => {
    const formatToPercent = (value) => (isNaN(parseFloat(value))) ? '' : (parseFloat(value)).toFixed(2).toString() + '%';    
    const convertAndFormatToPercent = (value) => (isNaN(parseFloat(value))) ? '' : (parseFloat(value) * 100).toFixed(2).toString() + '%';
    const getRatioTextColor = (value, successValue, warningValue) => ((isNaN(parseFloat(value))) ? 'text-dark' : (parseFloat(value) >= successValue) ? 'text-success' : (parseFloat(value) >= warningValue) ? 'text-warning' : 'text-danger');
    const getRatioTextColorReverse = (value, successValue, warningValue) => ((isNaN(parseFloat(value))) ? 'text-dark' : (parseFloat(value) <= successValue) ? 'text-success' : (parseFloat(value) <= warningValue) ? 'text-warning' : 'text-danger');
    const formatDate = (value) => value ? ('(' + ('0' + (new Date(value).getMonth() + 1)).slice(-2) + '/' + ('0' + new Date(value).getDate()).slice(-2) + '/' + new Date(value).getFullYear() + ')') : '';
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
                                            <a href="#collapseQuickRatio" data-bs-toggle="collapse">Quick Ratio: </a> <small className="text-secondary"><i>{ formatDate(companyStats.quickRatioQuarterlyPeriod) }</i></small>
                                        </td>
                                        <td className={ getRatioTextColor(companyStats.quickRatioQuarterly, 1.5, 1) }>{ companyStats.quickRatioQuarterly }</td>
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
                                            <a href="#collapseCurrentRatio" data-bs-toggle="collapse">Current Ratio: </a> <small className="text-secondary"><i>{ formatDate(companyStats.currentRatioQuarterlyPeriod) }</i></small>
                                        </td>
                                        <td className={ getRatioTextColor(companyStats.currentRatioQuarterly, 1.5, 1) }>{ companyStats.currentRatioQuarterly }</td>
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
                                        <td>LT Debt to Equity: <small className="text-secondary"><i>{ formatDate(companyStats.longTermDebtToEquityQuarterlyPeriod) }</i></small></td>
                                        <td className={ getRatioTextColorReverse(companyStats.longTermDebtToEquityQuarterly, 0.5, 1) }>{ companyStats.longTermDebtToEquityQuarterly }</td>
                                    </tr>
                                    <tr>
                                        <td>Total Debt to Equity: <small className="text-secondary"><i>{ formatDate(companyStats.totalDebtToEquityQuarterlyPeriod) }</i></small></td>
                                        <td className={ getRatioTextColorReverse(companyStats.totalDebtToEquityQuarterly, 0.5, 1) }>{ companyStats.totalDebtToEquityQuarterly }</td>
                                    </tr>

                                    <tr>
                                        <th className="pt-4" colSpan="2" >Cash Flow</th>
                                    </tr>

                                    <tr>
                                        <td>Free Cash Flow (TTM):</td>
                                        <td className={ getRatioTextColor((companyStats.freeCashFlowTTM), .01, 0) }>{convertToLargeCurrency(companyStats.freeCashFlowTTM)}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Owner Earnings (TTM):<br/>
                                            <small className="text-secondary">aka FCF per Share</small>
                                        </td>
                                        <td className={ getRatioTextColor(companyStats.freeCashFlowPerShareTTM, .01, 0) }>{convertToCurrency(companyStats.freeCashFlowPerShareTTM)}</td>
                                    </tr>
                                    <tr>
                                        <td>Owner Earnings Yield (TTM):</td>
                                        { !stockPrice && <td>N/A</td> }
                                        { stockPrice && (stockPrice !== 0) &&
                                            <td className={ getRatioTextColor(companyStats.freeCashFlowPerShareTTM / stockPrice * 100, 10, 9)}>{ convertAndFormatToPercent(companyStats.freeCashFlowPerShareTTM / stockPrice) }</td>
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
                                        <td>Return on Equity: <small className="text-secondary"><i>{ formatDate(companyStats.roeTTMPeriod) }</i></small></td>
                                        <td>{ convertAndFormatToPercent(companyStats.roeTTM) }</td>
                                    </tr>
                                    <tr>
                                        <td>Return on Invested Capital: <small className="text-secondary"><i>{ formatDate(companyStats.roeTTMPeriod) }</i></small></td>
                                        <td>{ convertAndFormatToPercent(companyStats.roicTTM) }</td>
                                    </tr>
                                    <tr>
                                        <th className="pt-4" colSpan="2" >Target Prices</th>
                                    </tr>
                                    <tr>
                                        <td>OE Yield (10%):</td>
                                        <td>{ convertToCurrency(companyStats.freeCashFlowPerShareTTM / .10) }</td>
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