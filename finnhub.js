const API_KEY = "c49eptiad3ieskgqte60";
const FINN_BASE_URL = "https://finnhub.io/api/v1";

function fetchJSON(input, options) {
  return fetch(input, options).then((res) => res.json());
}

function fetchFinnhub(endpoint) {
  const tokenSymbol = endpoint.includes("?") ? "&" : "?";
  const url = FINN_BASE_URL + endpoint + tokenSymbol + "token=" + API_KEY;
  return fetchJSON(url);
}

export function quoteStock(sym) {
  return fetchFinnhub("/quote?symbol=" + sym);
}
export function getMarketNews(category) {
  return fetchFinnhub("/news?category=" + category);
}
