import * as quotes from './quotes.json'

const convertToLargeCurrency = (v) => v ? ((parseInt(v).toString().length > 6) ? '$' + (parseFloat(v) / 1000000).toFixed(2).toString() + ' T' : ((parseInt(v).toString().length > 3) ? '$' + (parseFloat(v) / 1000).toFixed(2).toString() + ' B' : '$' + parseFloat(v).toFixed(2).toString() + ' M')) : ''

const convertToCurrency = (v) => v ? ('$' + parseFloat(v).toFixed(2).toString()) : ''

const getRandomQuote = () => {
    const myQuotes = quotes;
    return myQuotes[Math.floor(Math.random() * myQuotes.length)];
}

export { convertToLargeCurrency, convertToCurrency, getRandomQuote }