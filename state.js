export const state = {
  data: [],
  listeners: [],
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },
  getState() {
    return this.data;
  },
  subscribe(cb) {
    this.listeners.push(cb);
  },
  addCoinToTrack(newCoin) {
    const currentState = this.getState();
    currentState.push(newCoin);
    this.setState(currentState);
  },
};
