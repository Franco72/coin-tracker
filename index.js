// res = data.result[0].symbol;
// api_key.apiKey = "c49eptiad3ieskgqte60";
import { state } from "./state.js";
console.log(state);
async function submitCoin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  const symbol = await getSymbol(data["user-coin-searched"]);
  const currentPrice = await getCurrenPrice(symbol);
  // = Adding coin and symbol to the track card =
  document.querySelector(
    ".cr__text-coin"
  ).textContent = `${symbol} (1 ${symbol})`;
  document.querySelector(
    ".cr__text-money"
  ).textContent = `USD $${currentPrice.c}`;
  // ============================================
  const prueba = document.querySelector(".coins__result");
  prueba.addEventListener("submit", (e) => {
    e.preventDefault();
    state.addCoinToTrack({
      symbol: symbol,
      currentPrice: currentPrice,
    });
    console.log(state.getState());
  });
}

async function getSymbol(query) {
  const req = await fetch(
    `https://finnhub.io/api/v1/search?q=${query}&token=c49eptiad3ieskgqte60`
  );
  const response = await req.json();
  console.log(response.result[0]);
  const data = response.result[0].symbol;
  return data;
}

async function getCurrenPrice(symbol) {
  const req = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=c49eptiad3ieskgqte60`
  );
  const response = await req.json();
  return response;
}

(function main() {
  const searchCoinEl = document.querySelector(".coins__search");
  searchCoinEl.addEventListener("submit", submitCoin);
})();
