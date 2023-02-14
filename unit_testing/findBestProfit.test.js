const {findBestProfit, investmentAmount } = require('../hedge');

describe('findBestProfit', () => {
    
      test('findBestProfit: when the exchange rate remains constant for the polish currency', () => {
        const prices = [
          {
            date: '2018-01-02',
            price: 145.1,
            bid: 3.4506,
            ask: 3.5204,
            grams: 3210.413507925569
          },
          {
            date: '2019-01-03',
            price: 150.72,
            bid: 3.4506,
            ask: 3.5204,
            grams: 3090.704617834395
          },
          {
            date: '2020-01-04',
            price: 130.36,
            bid: 3.4506,
            ask: 3.5204,
            grams: 3573.41976066278
          },
          {
            date: '2023-01-04',
            price: 175.36,
            bid: 3.4506,
            ask: 3.5204,
            grams: 2656.42677919708
          }
        ];
      
        const result = findBestProfit(prices);
        expect(result).toEqual({
          buy: '2020-01-04',
          sell: '2023-01-04',
          usd_Profit: (3573.41976066278*175.36)/3.5204 - investmentAmount
        });
      }); 

      test('findBestProfit: when the exchange rate for polish currency collapses', () => {
        const prices = [
          {
            date: '2018-01-02',
            price: 145.1,
            bid: 3.4506,
            ask: 3.5204,
            grams: 3210.413507925569
          },
          {
            date: '2019-01-03',
            price: 150.72,
            bid: 3.4506,
            ask: 3.5204,
            grams: 3090.704617834395
          },
          {
            date: '2020-01-04',
            price: 130.36,
            bid: 3.4506,
            ask: 3.5204,
            grams: 3573.41976066278
          },
          {
            date: '2023-01-04',
            price: 175.36,
            bid: 7.4506,
            ask: 7.5204,
            grams: 2656.42677919708
          }
        ];
      
        const result = findBestProfit(prices);
        expect(result).toEqual({
          buy: '2018-01-02',
          sell: '2019-01-03',
          usd_Profit: (3210.413507925569*150.72)/3.5204 - investmentAmount
        });
      }); 
      
  });