const {retrieveDataYearByYear} = require('../hedge');

describe("retrieveDataYearByYear", () => {

    it("retrieveDataYearByYear: should return at least one record in 5 years for gold prices", async () => {
        const type = 'CZL';
        const result = await retrieveDataYearByYear(type);
        expect(result.length).toBeGreaterThan(0);
    });

    it("retrieveDataYearByYear: should return at least one record for 5 years for exchange rates", async () => {
        const type = 'ER';
        const result = await retrieveDataYearByYear(type);
        expect(result.length).toBeGreaterThan(0);
    });

    it("retrieveDataYearByYear: retrieveDataYearByYear catch block should be executed", async () => {
        console.error = jest.fn();
        const allData = await retrieveDataYearByYear("FS");
        expect(allData).toEqual([]);
        expect(console.error).toHaveBeenCalled();
      });
});

