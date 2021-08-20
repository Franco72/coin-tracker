export const state = {
  data: {
    trackedQuotes: [],
  },
  listeners: [],
  init() {
    const stateSaved = localStorage.getItem("state-saved");
    if (JSON.parse(stateSaved) != null) {
      this.setState(JSON.parse(stateSaved));
    }
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state-saved", JSON.stringify(newState));
  },
  getState() {
    return this.data;
  },
  subscribe(cb) {
    this.listeners.push(cb);
  },
  getTrackedQuotes() {
    return this.data.trackedQuotes.filter((q) => {
      return q.deleted != true;
    });
  },
  addQuoteToTrack(newQuote) {
    const currentState = this.getState();
    const quoteRepeated = currentState.trackedQuotes.find((c) => {
      return c.symbol == newQuote.symbol;
    });
    if (!quoteRepeated) {
      currentState.trackedQuotes.push(newQuote);
      this.setState(currentState);
    } else {
      // console.log("Esta acción está repetida");
    }
  },
  changeQuote(id, typeChange, value) {
    const currentState = this.getState();
    const quoteToChange = currentState.trackedQuotes.find((c) => {
      return c.id == id;
    });
    if (typeChange == "maxPrice") {
      quoteToChange.maxPrice = value;
    }
    if (typeChange == "minPrice") {
      quoteToChange.minPrice = value;
    }
    if (typeChange == "delete") {
      quoteToChange.deleted = value;
    }
    this.setState(currentState);
  },
  updateAndCheckQuotes(quotesUpdatedList) {
    const currentState = this.getState();
    for (const q of quotesUpdatedList) {
      const quoteTracked = currentState.trackedQuotes.find((quote) => {
        return quote.symbol == q.symbol;
      });
      quoteTracked.currentPrice = q.currentPrice;
      if (
        q.currentPrice > quoteTracked.maxPrice &&
        quoteTracked.maxPrice != 0
      ) {
        quoteTracked.outOfRange = true;
        return q.symbol + "" + q.currentPrice;
      } else {
        quoteTracked.outOfRange = false;
      }
      if (
        q.currentPrice < quoteTracked.minPrice &&
        quoteTracked.minPrice != 0
      ) {
        quoteTracked.outOfRange = true;
        return q.symbol + q.currentPrice;
      } else {
        quoteTracked.outOfRange = false;
      }
    }
    this.setState(currentState);
  },
};

//? Lógica de las quotes "borradas": La función getTrackedQuotes devuelve todas las quotes que no fueron "borradas", esta función es usada para mostrar las quotes en la pantalla y, del lado lógico, para seguir los nuevos precios solamente de estas quotes, ignorando las que fueron "borradas", para no seguir quotes sin sentido (Y las quotes "borradas" igualmente quedarán guardadas en el localStorage).
