const convertToLargeCurrency = (v) => v ? ((parseInt(v).toString().length > 3) ? '$' + (parseFloat(v) / 1000).toFixed(2).toString() + ' B' : '$' + parseFloat(v).toFixed(2).toString() + ' M') : ''

const convertToCurrency = (v) => v ? ('$' + parseInt(v).toFixed(2).toString()) : ''

export { convertToLargeCurrency, convertToCurrency }