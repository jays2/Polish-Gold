const {sortDataByDate} = require('../hedge');

describe('getCombinedData', () => {
   
    it('getCombinedData: Test sorting by date', () => {
        const data = [
          {
            date: '2023-01-05',
            price: 147.78,
            bid: 3.382,
            ask: 3.4504,
            grams: 3089.52496954933
          },
          {
            date: '2015-04-06',
            price: 146.43,
            bid: 3.3892,
            ask: 3.4576,
            grams: 3124.6465888137677
          },
          {
            date: '2018-04-09',
            price: 146.87,
            bid: 3.3836,
            ask: 3.452,
            grams: 3110.138217471233
          },
          {
            date: '2017-04-10',
            price: 146.33,
            bid: 3.3694,
            ask: 3.4374,
            grams: 3108.5150003416934
          }
        ];
      
        const sortedData = sortDataByDate(data);
        
        expect(sortedData[0].date).toBe('2015-04-06');
        expect(sortedData[sortedData.length - 1].date).toBe('2023-01-05');
      });
  });