const {getDataFromAPI} = require('../hedge');

describe("getDataFromAPI", () => {

    it("should return at least one record for gold prices", async () => {
      const startDate = `2020-01-01`;
      const endDate = `2020-05-01`;
      const type = 'CZL';
      const result = await getDataFromAPI(startDate, endDate, type);
      expect(result.length).toBeGreaterThan(0);
        });

    it("should return an error for invalid date for gold prices", async () => {
        const startDate = `2020-01-01`;
        const endDate = `2020-31-55`;
        const type = 'CZL';
        await expect(getDataFromAPI(startDate, endDate, type)).rejects.toThrow();
        });

    it("should return at least one record for exchange rates", async () => {
        const startDate = `2020-01-01`;
        const endDate = `2020-05-01`;
        const type = 'ER';
        const result = await getDataFromAPI(startDate, endDate, type);
        expect(result.length).toBeGreaterThan(0);
        });

    it("should return an error for invalid date for exchange rates", async () => {
        const startDate = `2020-01-01`;
        const endDate = `2020-31-55`;
        const type = 'ER';
        await expect(getDataFromAPI(startDate, endDate, type)).rejects.toThrow();
        });
});


