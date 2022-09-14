import * as quotes from './quotes.json'

const convertToLargeCurrency = (v) => v ? ((parseInt(v).toString().length > 6) ? '$' + (parseFloat(v) / 1000000).toFixed(2).toString() + ' T' : ((parseInt(v).toString().length > 3) ? '$' + (parseFloat(v) / 1000).toFixed(2).toString() + ' B' : '$' + parseFloat(v).toFixed(2).toString() + ' M')) : ''

const convertToCurrency = (v) => v ? ('$' + parseFloat(v).toFixed(2).toString()) : ''

const getRandomQuote = () => {
    const myQuotes = quotes;
    return myQuotes[Math.floor(Math.random() * myQuotes.length)];
}

const formatDate = (value) => value ? ('(' + ('0' + (new Date(value).getMonth() + 1)).slice(-2) + '/' + ('0' + new Date(value).getDate()).slice(-2) + '/' + new Date(value).getFullYear() + ')') : '';
const formatDateNoParenthesis = (value) => value ? (('0' + (new Date(value).getMonth() + 1)).slice(-2) + '/' + ('0' + new Date(value).getDate()).slice(-2) + '/' + new Date(value).getFullYear()) : '';

const getRatioTextColor = (value, successValue, warningValue) => ((isNaN(parseFloat(value))) ? 'text-dark' : (parseFloat(value) >= successValue) ? 'text-success' : (parseFloat(value) >= warningValue) ? 'text-warning' : 'text-danger');
const getRatioTextColorReverse = (value, successValue, warningValue) => ((isNaN(parseFloat(value))) ? 'text-dark' : (parseFloat(value) <= successValue) ? 'text-success' : (parseFloat(value) <= warningValue) ? 'text-warning' : 'text-danger');

export { convertToLargeCurrency, convertToCurrency, getRandomQuote, formatDate, formatDateNoParenthesis, getRatioTextColor, getRatioTextColorReverse }