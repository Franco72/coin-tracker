const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "c49eptiad3ieskgqte60";
(function main() {
  //Inicializating Finnhub API Client
  const finnhubClient = new finnhub.DefaultApi();

  //   finnhubClient.quote("AAPL", (error, data, response) => {
  //     console.log(data);
  //   });
  finnhubClient.symbolSearch("apple", (error, data, response) => {
    console.log(data);
  });
})();
