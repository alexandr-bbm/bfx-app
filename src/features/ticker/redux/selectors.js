export const selectTicker = state => state.ticker;

export const selectTickerBySymbol = (state, {symbol}) => selectTicker(state)[symbol];
