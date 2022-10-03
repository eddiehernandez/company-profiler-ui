const Financials = ({financials}) => {

    const fiscalYears = financials.map(x => x.year)  
    const isLabelsSet = new Set()
    const bsLabelsSet = new Set()   
    const cfLabelsSet = new Set() 
    
    for (let financial of financials){
        for (let unit of financial.incomeStatement){
            isLabelsSet.add(unit.label)
        }
        for (let unit of financial.balanceSheet){
            bsLabelsSet.add(unit.label)
        }
        for (let unit of financial.cashFlowStatement){
            cfLabelsSet.add(unit.label)
        }
    }

    const incomeStatementLabels = Array.from(isLabelsSet)
    const balanceSheetLabels = Array.from(bsLabelsSet)
    const cashFlowLabels = Array.from(cfLabelsSet)

    const getIncomeStatementFinancialUnit = (financials, label, year) =>
        financials.find(x => x.year === year)?.incomeStatement.find(x => x.label === label)?.value
    
    const getBalanceSheetFinancialUnit = (financials, label, year) => 
        financials.find(x => x.year === year)?.balanceSheet.find(x => x.label === label)?.value
    
    const getCashFlowFinancialUnit = (financials, label, year) => 
        financials.find(x => x.year === year)?.cashFlowStatement.find(x => x.label === label)?.value
    

    return (
        <div className="financials">
            
            <div className="row text-centeer">
                <nav>
                    <div className="nav nav-pills justify-content-center" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-incomestatement-tab" data-bs-toggle="tab" data-bs-target="#nav-incomestatement" type="button" role="tab" aria-controls="nav-incomestatement" aria-selected="true">income statement</button>
                        <button className="nav-link" id="nav-balancesheet-tab" data-bs-toggle="tab" data-bs-target="#nav-balancesheet" type="button" role="tab" aria-controls="nav-balancesheet" aria-selected="true">balance sheet</button>
                        <button className="nav-link" id="nav-cashflow-tab" data-bs-toggle="tab" data-bs-target="#nav-cashflow" type="button" role="tab" aria-controls="nav-cashflow" aria-selected="true">cash flow</button>
                    </div>
                </nav>
            </div>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active p-3" id="nav-incomestatement" role="tabpanel" aria-labelledby="nav-incomestatement-tab">
                    <div className="income-statements">
                        <table className="table">
                        <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                {fiscalYears.map(year => (
                                    <td className="text-center" key={year}>{year}</td>
                                ))}
                            </tr>
                            { incomeStatementLabels.map(label => (
                                <tr key={'ic-' + label}>
                                    <td>{label}</td>
                                    {
                                        fiscalYears.map(year => (
                                            <td key={ 'ic-' + label + '-' + year }>
                                                {getIncomeStatementFinancialUnit(financials, label, year)}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show p-3" id="nav-balancesheet" role="tabpanel" aria-labelledby="nav-balancesheet-tab">
                    <div className="balance-sheet">
                        <table className="table">
                        <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                {fiscalYears.map(year => (
                                    <td className="text-center" key={year}>{year}</td>
                                ))}
                            </tr> 
                            { balanceSheetLabels.map(label => (
                                <tr key={'ic-' + label}>
                                    <td>{label}</td>
                                    {
                                        fiscalYears.map(year => (
                                            <td key={ 'ic-' + label + '-' + year }>
                                                {getBalanceSheetFinancialUnit(financials, label, year)}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))}                            
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show p-3" id="nav-cashflow" role="tabpanel" aria-labelledby="nav-cashflow-tab">
                    <div className="cash-flow">
                        <table className="table">
                        <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                {fiscalYears.map(year => (
                                    <td className="text-center" key={year}>{year}</td>
                                ))}
                            </tr>
                            { cashFlowLabels.map(label => (
                                <tr key={'ic-' + label}>
                                    <td>{label}</td>
                                    {
                                        fiscalYears.map(year => (
                                            <td key={ 'ic-' + label + '-' + year }>
                                                {getCashFlowFinancialUnit(financials, label, year)}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))}                            
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            
        </div>
      );
}
 
export default Financials;