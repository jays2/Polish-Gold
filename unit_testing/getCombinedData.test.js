const {getCombinedData} = require('../hedge');

describe('getCombinedData', () => {
    it('getCombinedData:should return an array with at least one register', () => {
      const allDataCZL = [      { data: '2018-01-02', cena: 145.1 },      
                                { data: '2018-01-03', cena: 145.72 },      
                                { data: '2018-01-04', cena: 146.36 }];
  
      const allDataER = [      {        no: '001/C/NBP/2018',        
                                        effectiveDate: '2018-01-02',        
                                        bid: 3.4506,        
                                        ask: 3.5204},      
                               {        no: '002/C/NBP/2018',        
                                        effectiveDate: '2018-01-03',        
                                        bid: 3.4232,        
                                        ask: 3.4924}];
    
      const result = getCombinedData(allDataCZL, allDataER);
  
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('getCombinedData: verify data integrity', () => {
        const allDataCZL = [
            { data: '2018-01-02', cena: 145.1 },
            { data: '2018-01-03', cena: 145.72 }
          ];
          
          const allDataER = [
            {
              no: '001/C/NBP/2018',
              effectiveDate: '2018-01-02',
              bid: 3.4506,
              ask: 3.5204
            },
            {
              no: '002/C/NBP/2018',
              effectiveDate: '2018-01-03',
              bid: 3.4232,
              ask: 3.4924
            }
          ];
          
          const expectedResult = [
            {
              date: '2018-01-02',
              price: 145.1,
              bid: 3.4506,
              ask: 3.5204,
              grams: 3210.413507925569
            },
            {
              date: '2018-01-03',
              price: 145.72,
              bid: 3.4232,
              ask: 3.4924,
              grams: 3171.3697502058744
            }
          ];

        const result = getCombinedData(allDataCZL, allDataER);
        expect(result).toEqual(expectedResult);
    })

    it('getCombinedData: verify data integrity when both input arrays are void', () => {
        const allDataCZL = [];
        const allDataER = [];
        const expectedResult = [];  
        const result = getCombinedData(allDataCZL, allDataER);
        expect(result).toEqual(expectedResult);
    })

    it('getCombinedData: verify data integrity when gold data is void', () => {
        const allDataCZL = [];
        const allDataER = [
            {
              no: '001/C/NBP/2018',
              effectiveDate: '2018-01-02',
              bid: 3.4506,
              ask: 3.5204
            },
            {
              no: '002/C/NBP/2018',
              effectiveDate: '2018-01-03',
              bid: 3.4232,
              ask: 3.4924
            }
          ];
          const expectedResult = [];
        
        const result = getCombinedData(allDataCZL, allDataER);
        expect(result).toEqual(expectedResult);
    })
  
  });