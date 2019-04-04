export const convertTickerData = (data) => {
  const [
    bid,
    bidSize,
    ask,
    askSize,
    dailyChange,
    dailyChangePerc,
    lastPrice,
    volume,
    high,
    low,
  ] = data;

  return {
    bid,
    bidSize,
    ask,
    askSize,
    dailyChange,
    dailyChangePerc,
    lastPrice,
    volume,
    high,
    low,
  };
};