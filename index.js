import { state } from "../../state.js";
import { quoteStock } from "../../finnhub.js";
import "./components/coin-tracked/index.js";
import "./components/navigation/index.js";

function randomID() {
  //generates random id;
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    // return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }
  return guid();
}

function addQuotes(container) {
  container.textContent = "";
  const quotesList = state.getTrackedQuotes();
  if (quotesList.length != 0) {
    for (const quote of quotesList) {
      const div = document.createElement("div");
      let imgUrl = findQuoteIcon(quote.symbol);
      if (imgUrl == undefined) {
        imgUrl = "./img/template-coin.png";
      }
      div.innerHTML = `<coin-tracked class="card" symbol="${
        quote.symbol
      }" current-price="${quote.currentPrice}" id="${
        quote.id
      }" img-url="${imgUrl}" set-alert="${
        quote.outOfRange == true ? "true" : "false"
      }"></coin-tracked>`;
      container.appendChild(div);
    }
    const cardsList = container.querySelectorAll(".card");
    for (const card of cardsList) {
      card.addEventListener("change", (e) => {
        state.changeQuote(e.detail.cardID, e.detail.typeChange, e.detail.value);
      });
    }
  }
}

function findQuoteIcon(sym) {
  const logos = [
    {
      sym: "BTC-USD",
      url: "https://i.ibb.co/MMWbstb/ddbdafb2-e267-4114-abc3-06316cf3bef9.webp",
    },
    { sym: "ETH-USD", url: "https://i.ibb.co/FX9NTBF/ethereum-eth-logo.webp" },
    { sym: "VET-USD", url: "https://i.ibb.co/6m2pfQZ/vechain-vet-logo.webp" },
  ];
  for (const logo of logos) {
    if (logo.sym == sym) {
      return logo.url;
    }
  }
}

function searchAndTrackQuotes() {
  let sym;
  let currentPrice;
  //? Escucho si el usuario busca una coin, y cuando lo haga guardo el simbolo y el precio actual así lo puedo reflejar en el resultado
  const $SEARCH_QUOTE_FORM = document.querySelector(".coins__search");
  const $QUOTE_SYMBOL = document.querySelector(".cr__text-coin");
  const $QUOTE_PRICE = document.querySelector(".cr__text-money");
  $SEARCH_QUOTE_FORM.addEventListener("submit", async (e) => {
    e.preventDefault();
    const quoteToSearch = document
      .querySelector(".cs__input")
      .value.toUpperCase();
    const quoteFound = await quoteStock(quoteToSearch);
    // Si la acción que se buscó está "ok", guardo el simbolo y el precio actual para reflejarlo en el resultado, y poder seguir la acción, en caso contrario, en el cual no se encuentre la acción buscada, muestro un mensaje de que algo falló, indicándole al usuario que tal vez escribió algo erróneo
    if (quoteFound.c != 0) {
      sym = quoteToSearch;
      currentPrice = quoteFound.c;
      // Muestro la coin (y su precio) buscada, en caso de que el usuaro la quiera seguir
      $QUOTE_SYMBOL.textContent = `${sym} (1 ${sym})`;
      $QUOTE_PRICE.textContent = `$${currentPrice}`;
    } else {
      $QUOTE_SYMBOL.textContent = "moneda/acción no encontrada";
      $QUOTE_PRICE.textContent = "";
    }
  });
  //? Escucho si el usuaro sigue una moneda, (después de buscarla)
  document.querySelector(".coins__result").addEventListener("submit", (e) => {
    e.preventDefault();
    // Este condicional if es para cuando el usuario clickea en track sin haber buscado una coin
    if (sym != undefined) {
      state.addQuoteToTrack({
        symbol: sym,
        currentPrice: currentPrice,
        maxPrice: 0,
        minPrice: 0,
        id: randomID(),
        deleted: false,
        outOfRange: false,
      });
    }
  });
}

async function getQuotesUpdated(quotesList) {
  const quotesUpdated = [];
  for (const q of quotesList) {
    const newPrice = await quoteStock(q.symbol);
    quotesUpdated.push({ symbol: q.symbol, currentPrice: newPrice.c });
  }
  return quotesUpdated;
}

function setFavIconAndTitle(urlImage, title) {
  let link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = urlImage;
  document.title = title;
  document.getElementsByTagName("head")[0].appendChild(link);
}

export async function checkQuotes() {
  const res = await getQuotesUpdated(state.getTrackedQuotes());
  // Se le debe pasar la url de la imagen a mostrar en el favicon y el título de la web
  setFavIconAndTitle("./img/cloud.png", "Coin Tracker");
  const situation = state.updateAndCheckQuotes(res);
  if (situation) {
    setFavIconAndTitle("./img/fire.svg", situation);
  }
  addQuotes(document.querySelector(".coins__tracked"));
}

(function main() {
  state.init();
  //? Cuando se inice la página voy a buscar los coins trackeados del usuario, y a la vez me suscribo para escuchar si mete mas coins a trackear
  const $QUOTES_TRACKED_CONT = document.querySelector(".coins__tracked");
  addQuotes($QUOTES_TRACKED_CONT);
  state.subscribe(() => {
    addQuotes($QUOTES_TRACKED_CONT);
  });
  searchAndTrackQuotes();
  setInterval(checkQuotes, 5000);
})();
