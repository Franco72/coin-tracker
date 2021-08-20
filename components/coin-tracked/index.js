(function initCoinTrackedCard() {
  class CoinTrackedCard extends HTMLElement {
    symbol = "";
    currentPrice = "";
    id = "";
    imgUrl = "";
    setAlert = false;
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.symbol = this.getAttribute("symbol");
      this.currentPrice = this.getAttribute("current-price");
      this.id = this.getAttribute("id");
      this.imgUrl = this.getAttribute("img-url");
      this.setAlert = JSON.parse(this.getAttribute("set-alert"));
      this.shadowRoot.innerHTML = `
          <style>
          .template {
            width: 156px;
            background-color: #232323;
            border-radius: 8px;
            position: relative;
            padding-bottom: 16px;
          }
          @media (min-width: 769px) {
            .template {
              min-width: 275px;
              padding-bottom: 32px;
            }
          }
          .template-content {
            padding: 7px 8px;
            display: grid;
            gap: 20px;
          }
          /* DELETE */
          .template__delete {
            display: flex;
            justify-content: flex-end;
          }
          .template__delete > img {
            width: 14px;
            height: 14px;
            cursor: pointer;
          }
          /* CURRENCY */
          .template__currency {
            display: flex;
            justify-content: space-between;
          }
          @media (min-width: 769px) {
            .template__currency {
              margin-top: 30px;
            }
          }
          .template__currency-name {
          }
          .template__currency-name h3 {
            margin: 0;
            font-family: "Lato", sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            word-break: break-word;
          }
          @media (min-width: 769px) {
            .template__currency-name h3 {
              font-size: 36px;
            }
          }
          .template__currency-name h5 {
            margin: 0;
            font-family: "Lato", sans-serif;
            font-size: 14px;
            font-weight: 400;
            color: #fff;
            word-break: break-word;
          }
          @media (min-width: 769px) {
            .template__currency-name h5 {
              font-size: 24px;
            }
          }
          .template__currency-icon {
            width: 41px;
            height: 41px;
          }
          @media (min-width: 769px) {
            .template__currency-icon {
              width: 95px;
              height: 90px;
            }
          }
          /* CURRENCY TO USD */
          .template__currency-to-usd {
            font-family: "Lato", sans-serif;
            font-size: 18px;
            font-weight: 900;
            color: #4cd71d;
          }
          @media (min-width: 769px) {
            .template__currency-to-usd {
              font-size: 36px;
            }
          }
          /* MINMAX */
          .template__minmax {
            display: grid;
            gap: 8px;
          }
          @media (min-width: 769px) {
            .template__minmax {
              gap: 16px;
            }
          }
          .minmax__max,
          .minmax__min {
            display: flex;
            flex-wrap: nowrap;
          }
          .minmax__max-input,
          .minmax__min-input {
            width: 100%;
            border: none;
            border-radius: 8px;
            padding: 8.5px 0 8.5px 16px;
            background-color: #404040;
          }
          @media (min-width: 769px) {
            .minmax__max-input, .minmax__min-input {
              font-size: 18px;
            }
          }
          .minmax__max-btn,
          .minmax__min-btn {
            border: none;
            border-radius: 8px;
            margin-left: -20px;
            background-color: #404040;
          }
          .minmax__max-btn > img,
          .minmax__min-btn > img {
            max-width: 12px;
            max-height: 12px;
          }
          @media (min-width: 769px) {
            .minmax__max-btn > img,
            .minmax__min-btn > img {
              max-width: 19px;
              max-height: 19px;
            }
          }
          /* FIRE ICON */
          .fire-icon {
            width: 40px;
            height: 40px;
            background-color: #ff7a00;
            border-radius: 50%;
            position: absolute;
            left: 11px;
            top: -20px;
            display: none;
            align-items: center;
            justify-content: center;
          }
          @media (min-width: 769px) {
            .fire-icon {
              top: -40px;
              width: 80px;
              height: 80px;
            }
          }
          .fire-icon > img {
            width: 22px;
            height: 22px;
          }
          @media (min-width: 769px) {
            .fire-icon > img {
              width: 40px;
              height: 40px;
            }
          }
          i{
            border: 10px solid #fff;
          }
          </style>
          <div class="template">
        <div class="fire-icon">
          <img src="./img/fire-black.png" alt="fire-icon">
        </div>
        <div class="template-content">
          <div class="template__delete">
            <img src="../img/delete.png" alt="icon-delete" />
          </div>
          <div class="template__currency">
            <div class="template__currency-name">
              <h3>${this.symbol}</h3> <h5>(1 ${this.symbol})</h5>
            </div>
            <img  src="${this.imgUrl}" alt="currency-icon" class="template__currency-icon">
          </img>
          </div>
          <h3 class="template__currency-to-usd margin-0">USD $${this.currentPrice}</h3>
          <div class="template__minmax">
            <form class="minmax__max">
                <input type="number" class="minmax__max-input" name="user-coin-tracked-max" placeholder="Ej. 50000">
                <button type="submit" class="minmax__max-btn">
                  <img src="./img/max.png" alt="max-icon">
                </button>                  
            </form>
            <form class="minmax__min">
              <input type="number" class="minmax__min-input" name="user-coin-tracked-min" placeholder="Ej. 30000">  
              <button type="submit" class="minmax__min-btn">
                <img src="./img/min.png" alt="min-icon">
              </button>                  
            </form>
          </div>
        </div>
      </div>
        `;
      const handleEvent = (id, typeChange, value) => {
        const options = {
          detail: {
            typeChange: typeChange,
            cardID: id,
            value: value,
          },
        };
        const MessageEvent = new CustomEvent("change", options);
        this.dispatchEvent(MessageEvent);
      };
      this.shadowRoot
        .querySelector(".minmax__max")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          handleEvent(this.id, "maxPrice", data["user-coin-tracked-max"]);
        });
      this.shadowRoot
        .querySelector(".minmax__min")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          handleEvent(this.id, "minPrice", data["user-coin-tracked-min"]);
        });
      this.shadowRoot
        .querySelector(".template__delete")
        .addEventListener("click", (e) => {
          handleEvent(this.id, "delete", true);
        });
      const fireIcon = this.shadowRoot.querySelector(".fire-icon");
      if (this.setAlert == true) {
        fireIcon.style.display = "flex";
      } else {
        fireIcon.style.display = "none";
      }
    }
  }

  customElements.define("coin-tracked", CoinTrackedCard);
})();
