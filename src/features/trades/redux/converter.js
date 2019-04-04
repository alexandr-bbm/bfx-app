import {keyBy} from 'lodash';

const convertTrade = ([id, mts, amount, price]) => {
  return {
    id,
    mts,
    amount,
    price,
  }
};

export const convertTradesData = (currentTrades, data, extraData) => {
  // todo data - te | tu - no docs for it
  const isSnapshot = Array.isArray(data);

  if (isSnapshot) {
    return keyBy(data.map(convertTrade), 'id');
  }

  const trade = convertTrade(extraData);
  if (trade.id) {
    const newTrades = {...currentTrades};
    newTrades[trade.id] = convertTrade(extraData);
    return newTrades;
  }

  return currentTrades;
};