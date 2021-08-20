(function initCustomNav() {
  class CustomNav extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `<style>
      .menu {
          background-color: #232323;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 4px;
          border-radius: 8px;
        }
        .menu__logo {
          width: 102px;
          height: 40px;
        }
        @media (min-width: 769px) {
          .menu__logo {
            width: 150px;
            height: 50px;
          }
        }
        .menu__items {
          list-style: none;
          display: flex;
          margin: 0;
        }
        @media (max-width: 550px) {
          .menu__items {
            position: fixed;
            width: 90%;
            border-radius: 8px;
            margin-left: 20px;
            height: 65%;
            background-color: #414141;
            top: -100vh;
            left: 0;
            text-align: center;
            transition: all 0.4s;
            flex-direction: column;
          }
        }
        .menu__items.show {
          top: 5px;
          padding: 30px 0 0 10px;
        }
        @media (max-width: 550px) {
          .menu__items li a {
            margin: 0 auto;
            display: block;
            width: 90%;
            margin-top: 25px;
          }
        }
        .menu__item {
          color: #000;
          background-color: #ff7a00;
          font-family: "Lato", sans-serif;
          font-weight: 700;
          padding: 6px;
          border-radius: 6px;
          text-decoration: none;
        }
        @media (min-width: 550px) {
          .menu__item {
            padding: 4px 6px;
            margin-right: 12px;
            font-size: 18px;
          }
        }
        @media (min-width: 1200px) {
          .menu__item {
            font-size: 22px;
          }
        }
        .menu-btn{
          width: 35px;
          height: 35px;
          background-color: #000;
          color: #fff;
          padding: 0;
          margin: 0;
          z-index: 1;
          border-radius: 8px;
        }
        .menu-btn{
          width: 37px;
          heigth: 37px;
          background-color: inherit;
        }
        .menu-btn.set-bg{
          background-color: #414141;
        }
        @media (min-width: 550px) {
          .menu-btn {
            display: none;
          }
        }
      </style>
      <nav class="menu">
      <img src="./img/coin-tracker-logo.png" alt="" class="menu__logo" />
      <ul class="menu__items">
        <li>
          <a href="./index.html" class="menu__item">Home</a>
        </li>
        <li>
          <a href="./news.html" class="menu__item">News</a>
        </li>
      </ul>
      <img src="./img/menu-icon.png" alt="icon menu" class="menu-btn">
    </nav>`;
      // Lógica para el navbar
      const $MENU_BTN = this.shadowRoot.querySelector(".menu-btn");
      const $MENU_ITEMS = this.shadowRoot.querySelector(".menu__items");
      $MENU_BTN.addEventListener("click", () => {
        $MENU_BTN.classList.toggle("set-bg");
        $MENU_ITEMS.classList.toggle("show");
      });
    }
  }

  customElements.define("custom-nav", CustomNav);
})();

/* <i class="menu-btn__icon fa fa-bars"></i> */
