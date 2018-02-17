const apiFunctionality = require('./functionality');

/**
 * Jest test for the getLayers function of your WMTS API.
 * 1. getLayers should return status code less than 300
 * 2. getLayers should return an object of mime type application/json
 */
describe('getLayers', () => {
    const getLayersCall = apiFunctionality.getTile();
    it('should return status code less than 300', () => {
        expect(getLayersCall.ok).toBe(true);
    });
    it('should return an object of mime type application/json', () => {
        expect(getLayersCall.headers.get("content-type").includes("application/json")).toBe(true);
    });
});

/**
 * Jest unit test for the getTile function of your WMTS API.
 * 1. getTile should return a status code less than 300
 * 2. getTile should return an object of mime type image/jpg
 */
describe('getTile', () => {
    const getLayersCall = apiFunctionality.getTile();
    const firstLayerName = getLayersCall.json()[0].name;
    const getTileCall = apiFunctionality.getTile(firstLayerName, 1, 1, 1);
    it('should return status code less than 300', () => {
        expect(getTileCall.ok).toBe(true);
    });
    it('should return an object of mime type image/jpg', () => {
        expect(getTileCall.headers.get("content-type").includes("image/jpg")).toBe(true);
    });
});
