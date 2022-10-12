import { formatDateNoParenthesis, getRatioTextColor, getRatioTextColorReverse } from "../../utils/helperFunctions";

const TimeSeries = ({timeSeries}) => {
    return (
        <div className="time-series">
            <div className="row">
                <table className="table">
                    <thead>
                        <tr><th colSpan={timeSeries.currentRatio.length}>Current Ratio</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            {timeSeries.currentRatio.map(metric => (
                                <td className="text-end" key={metric.period}>{ formatDateNoParenthesis(metric.period) }</td>
                            ))}
                        </tr>
                        <tr>
                            {timeSeries.currentRatio.map(metric => (
                                <td className="text-end" key={metric.period}><span className={getRatioTextColor(metric.value, 1.5, 1)}>{ metric.value }</span></td>
                            ))}
                        </tr>
                    </tbody>
                </table>  
            </div>
            <div className="row mt-3">
                <table className="table">
                    <thead>
                        <tr><th colSpan={timeSeries.totalDebtToEquity.length}>Total Debt To Equity</th></tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                            {timeSeries.totalDebtToEquity.map(metric => (
                                <td className="text-end" key={metric.period}>{ formatDateNoParenthesis(metric.period) }</td>
                            ))}
                        </tr>
                        <tr>
                            {timeSeries.totalDebtToEquity.map(metric => (
                                <td className="text-end" key={metric.period}><span className={getRatioTextColorReverse(metric.value, 0.5, 1)}>{ metric.value }</span></td>
                            ))}
                        </tr>
                    </tbody>
                </table> 
            </div>
            { timeSeries?.priceFreeCashFlow && 
            <div className="row mt-3">
                <table className="table">
                    <thead>
                        <tr><th colSpan={timeSeries.priceFreeCashFlow?.length}>Price to Free Cash Flow</th></tr>
                    </thead>
                    <tbody>
                        
                        <tr>
                            {timeSeries.priceFreeCashFlow.map(metric => (
                                <td className="text-end" key={metric.period}>{ formatDateNoParenthesis(metric.period) }</td>
                            ))}
                        </tr>
                        <tr>
                            {timeSeries.priceFreeCashFlow.map(metric => (
                                <td className="text-end" key={metric.period}><span className={getRatioTextColorReverse(metric.value, 10, 14)}>{ metric.value } ({ (1 / parseFloat(metric.value) * 100).toFixed(2) }%)</span></td>
                            ))}
                        </tr>
                    </tbody>
                </table> 
            </div>
            }


        </div>
      );
}
 
export default TimeSeries;