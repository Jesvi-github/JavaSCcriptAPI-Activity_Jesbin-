const API_KEY = '8f763706db90c7a998e16ec122a9bab2'; // Your ExchangeRate-API key

// Function to get the exchange rate from the API
async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`);
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency];
        return rate;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Function to convert the currency
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const rate = await getExchangeRate(fromCurrency, toCurrency);

    if (rate) {
        const result = amount * rate;
        document.getElementById('result').innerHTML = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } else {
        document.getElementById('result').innerHTML = 'Conversion failed';
    }
}

// Function to populate the currency dropdowns
async function populateCurrencies() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
        const data = await response.json();
        const currencies = data.supported_codes;
        const fromSelect = document.getElementById('fromCurrency');
        const toSelect = document.getElementById('toCurrency');
        
        currencies.forEach(([code, name]) => {
            fromSelect.add(new Option(`${code} - ${name}`, code));
            toSelect.add(new Option(`${code} - ${name}`, code));
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

// Populate the currency dropdowns on page load
populateCurrencies();

// Event listener for the Convert button
document.getElementById('convertBtn').addEventListener('click', convertCurrency);
