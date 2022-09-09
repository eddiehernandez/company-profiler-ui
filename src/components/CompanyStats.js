import { convertToLargeCurrency, convertToCurrency } from '../utils/helperFunctions';


const CompanyStats = ({companyStats, stockPrice}) => {
        
    const outputPercent = (value) => (isNaN(parseFloat(value))) ? '' : parseFloat(value).toFixed(2).toString() + '%';
    const getRatioTextColor = (value, successValue, warningValue) => ((isNaN(parseFloat(value))) ? 'text-dark' : (parseFloat(value) >= successValue) ? 'text-success' : (parseFloat(value) >= warningValue) ? 'text-warning' : 'text-danger');
    const getRatioTextColorReverse = (value, successValue, warningValue) => ((isNaN(parseFloat(value))) ? 'text-dark' : (parseFloat(value) <= successValue) ? 'text-success' : (parseFloat(value) <= warningValue) ? 'text-warning' : 'text-danger');
    const formatDate = (value) => value ? ('(' + ('0' + (new Date(value).getMonth() + 1)).slice(-2) + '/' + ('0' + new Date(value).getDate()).slice(-2) + '/' + new Date(value).getFullYear() + ')') : '';
    
    return (  
        <div className="">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <h5 className="card-header">Income Statement</h5>
                        <div className="card-body">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th colSpan="2" scope="col">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>One Year (TTM):</td>
                                        <td className={ getRatioTextColor(companyStats.revenueGrowthOneYearTTM, 15, 0) }>{outputPercent(companyStats.revenueGrowthOneYearTTM)}</td>
                                    </tr>
                                    <tr>
                                        <td>Three Year:</td>
                                        <td className={ getRatioTextColor(companyStats.revenueGrowthThreeYear, 15, 0) }>{outputPercent(companyStats.revenueGrowthThreeYear)}</td>
                                    </tr>
                                    <tr>
                                        <td>Five Year:</td>
                                        <td className={ getRatioTextColor(companyStats.revenueGrowthFiveYear, 15, 0) }>{outputPercent(companyStats.revenueGrowthFiveYear)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card my-3">
                        <h5 className="card-header">Cash Flow</h5>
                        <div className="card-body">
                            <table className="table table-sm">
                                <tbody>
                                    <tr>
                                        <td>FCF (Annual):</td>
                                        <td className={ getRatioTextColor(companyStats.freeCashFlowAnnual, .01, 0) }>{convertToLargeCurrency(companyStats.freeCashFlowAnnual)}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            FCF per Share (TTM):<br/>
                                            <small className="text-secondary">aka Owner Earnings</small>
                                        </td>
                                        <td className={ getRatioTextColor(companyStats.freeCashFlowPerShareTTM, .01, 0) }>{convertToCurrency(companyStats.freeCashFlowPerShareTTM)}</td>
                                    </tr>
                                    <tr>
                                        <td>Owner Earnings Yield:</td>
                                        { !stockPrice && <td>N/A</td> }
                                        { stockPrice && 
                                            <td className={ getRatioTextColor(companyStats.freeCashFlowPerShareTTM / stockPrice, 10, 0)}>{ outputPercent(companyStats.freeCashFlowPerShareTTM / stockPrice) }</td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>                    
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <h5 className="card-header">Balance Sheet</h5>
                        <div className="card-body">
                            <table className="table table-sm">
                                <tbody>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card my-3">
                        <h5 className="card-header">Dividends</h5>
                        <div className="card-body">
                            <table className="table table-sm">
                                <tbody>
                                    <tr>
                                        <td>Dividend Yield (TTM)</td>
                                        <td>...</td>
                                    </tr>
                                    <tr>
                                        <td>Dividend Growth Rate 5Y</td>
                                        <td>...</td>
                                    </tr>
                                    <tr>
                                        <td>Payout Ratio (TTM)</td>
                                        <td>...</td>
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