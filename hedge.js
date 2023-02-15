const currentYear = new Date().getFullYear();
const investmentAmount = 135000;

// Waits for all data to be returned to process most profitable days
Promise.all([
    retrieveDataYearByYear("CZL"),
    retrieveDataYearByYear("ER"),
])
    .then(([allDataCZL, allDataER]) => {
        const allData = getCombinedData(allDataCZL, allDataER);
        processingData(allData);
        
    })
    .catch((error) => {
        console.error(error);
    });

// Uses as input data retrieved from API to begin processing
function processingData(data) {
    try {
        const bestProfit = findBestProfit(data);
        console.log('Best time to buy:', bestProfit.buy);
        console.log('Best time to sell:', bestProfit.sell);
        console.log(
            'Total profit in USD:',
            bestProfit.usd_Profit,
            'for a total investment of:',
            investmentAmount,
            'USD'
            );
        } catch (error) {
            console.error(error);
        }
}
   
// Returns data from NBP API, CZL: Gold prices, ER: USD Exchange Rates 
function getDataFromAPI(startDate, endDate, type) {
    let url;
    if (type === "CZL") {
        url = `https://api.nbp.pl/api/cenyzlota/${startDate}/${endDate}/?format=json`;
    } else if (type === "ER") {
        url = `https://api.nbp.pl/api/exchangerates/rates/c/usd/${startDate}/${endDate}/?format=json`;
    }
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            if (!response.ok) {
                reject(new Error(`HTTP error! status: ${response.status}`));
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (!data || Object.keys(data).length === 0) {
                resolve([]);
            } else {
                let dataArray;
                if (type === "CZL") {
                    dataArray = Array.from(data);
                } else if (type === "ER") {
                    dataArray = data.rates;
                }
                resolve(dataArray);
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

// Chunks data year by year to avoid request overload
async function retrieveDataYearByYear(type) {
    let allData = [];
    
    for (let year = currentYear - 5; year <= currentYear; year++) {
        const startDate = `${year}-01-01`;
        const endDate = year === currentYear ? `${new Date().toISOString().split("T")[0]}` : `${year}-12-31`;
        
        try {
            const data = await getDataFromAPI(startDate, endDate, type);
            allData = allData.concat(data);
        } catch (error) {
            console.error(error);
        }
    }

    return allData;
}

// Provides one in all data object
function getCombinedData(allDataCZL, allDataER) {
    const allData = [];
    let grams_per_investment;
    allDataCZL.forEach(czlData => {
        allDataER.forEach(erData => {
            if (czlData.data === erData.effectiveDate && czlData.cena !== 0) {
                grams_per_investment = (investmentAmount * erData.bid) / czlData.cena;
                if (grams_per_investment !== 0 && grams_per_investment !== null) {
                    allData.push({
                        date: czlData.data,
                        price: czlData.cena,
                        bid: erData.bid,
                        ask: erData.ask,
                        grams: grams_per_investment
                    });
                }  
            }
        });
    });
    
    return allData;
}

// Sorts data on ascending order  
function sortDataByDate(data) {
    return data.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
    });
}

// Finds the most profitable dates, best to buy and sell 
function findBestProfit(prices) {
    let sortedData = []
    sortedData = sortDataByDate(prices);
    let maxProfit = 0;
    let bestBuy;
    let bestSell;
    
    for (let i = 0; i < sortedData.length - 1; i++) {
        for (let j = i + 1; j < sortedData.length; j++) {
            const profit =  (sortedData[i].grams * sortedData[j].price) / sortedData[j].ask - investmentAmount
            if (profit > maxProfit) {
                maxProfit = profit;
                bestBuy = i;
                bestSell = j; 
            }
        }
    }
    
    return {
        buy: prices[bestBuy].date,
        sell: prices[bestSell].date,
        usd_Profit: maxProfit
    };

}

exports.getDataFromAPI = getDataFromAPI;
exports.retrieveDataYearByYear = retrieveDataYearByYear;
exports.getCombinedData = getCombinedData;
exports.sortDataByDate  = sortDataByDate;
exports.findBestProfit = findBestProfit;
exports.investmentAmount = investmentAmount;

