import { formatDateNoParenthesis, getRatioTextColor, getRatioTextColorReverse } from "../../utils/helperFunctions";

const TimeSeries = ({timeSeries}) => {
    return (
        <div className="time-series">
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Current Ratio:
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        {timeSeries.currentRatio.map(metric => (
                                            <td className="text-end" key={metric.period}>{ formatDateNoParenthesis(metric.period) }</td>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {timeSeries.currentRatio.map(metric => (
                                            <td className="text-end" key={metric.period}><span className={getRatioTextColor(metric.value, 1.5, 1)}>{ metric.value }</span></td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>    
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Total Debt To Equity:
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        {timeSeries.totalDebtToEquity.map(metric => (
                                            <td className="text-end" key={metric.period}>{ formatDateNoParenthesis(metric.period) }</td>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {timeSeries.totalDebtToEquity.map(metric => (
                                            <td className="text-end" key={metric.period}><span className={getRatioTextColorReverse(metric.value, 0.5, 1)}>{ metric.value }</span></td>
                                        ))}
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
 
export default TimeSeries;