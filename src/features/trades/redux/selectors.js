export const selectTrades = state => state.trades;

export const selectTradesBySymbol = (state, {symbol}) => selectTrades(state)[symbol];
