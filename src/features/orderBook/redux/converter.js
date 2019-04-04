export const convertOrderBookData = (currentBook, data) => {
  const isSnapshot = data.length > 3;

  if (isSnapshot) {
    return handleSnapshot(data);
  }
  // eslint-disable-next-line
  const [price, count, amount] = data;

  if (count > 0) {
    const isBid = amount > 0;
    if (isBid) {
      return {
        bids: handleUpdate(data, currentBook, 'bids'),
        asks: currentBook.asks,
      }
    } else {
      return {
        bids: currentBook.bids,
        asks: handleUpdate(data, currentBook, 'asks'),
      }
    }
  } else if (count === 0) {
    if (amount === 1) {
      return {
        bids: handleDelete(data, currentBook, 'bids'),
        asks: currentBook.asks,
      };
    } else if (amount === -1) {
      return {
        bids: currentBook.bids,
        asks: handleDelete(data, currentBook, 'asks'),
      };
    }
  }
};

const handleSnapshot = (data) => {
  let totalBid = 0;
  let totalAsk = 0;
  return data.reduce((acc, next) => {
    const [price, count, amount] = next;
    if (amount > 0) {
      totalBid += amount;
      acc.bids.push({price, count, amount, total: totalBid});
    } else {
      const absAmount = -amount;
      totalAsk += absAmount;
      acc.asks.push({price, count, amount: absAmount, total: totalAsk});
    }
    return acc;
  }, {bids: [], asks: []});
};

const handleUpdate = (data, currentBook, type) => {
  const [price, count, amount] = data;
  const dataObj = {
    price,
    count,
    amount: Math.abs(amount)
  };
  const idx = currentBook[type].findIndex(item => item.price === price);
  const isUpdate = idx !== -1;
  if (isUpdate) {
    const newItems = [...currentBook[type]];
    newItems[idx] = dataObj;

    return recalculateTotal(newItems)
  } else {
    // Need to insert new item
    const newItems = [...currentBook[type]];
    if (type === 'bids') {
      let idxAfter = currentBook[type].findIndex(item => item.price < price);
      if (idxAfter !== -1) {
        newItems.splice(idxAfter, 0, dataObj);
      } else {
        newItems.push(dataObj);
      }
    } else {
      let idxAfter = currentBook[type].findIndex(item => item.price > price);
      if (idxAfter !== -1) {
        newItems.splice(idxAfter, 0, dataObj);
      } else {
        newItems.push(dataObj);
      }
    }

    return recalculateTotal(newItems);
  }
};

const handleDelete = (data, currentBook, type) => {
  const [price] = data;
  const idx = currentBook[type].findIndex(item => item.price === price);

  if (idx !== -1) {
    const newItems = [...currentBook[type]];
    newItems.splice(idx, 1);
    return recalculateTotal(newItems);
  }

  return currentBook[type];
};

const recalculateTotal = orderBookData => {
  let total = 0;
  return orderBookData.reduce((acc, {price, count, amount}, idx) => {
    const absAmount = Math.abs(amount);
    total += absAmount;
    acc[idx] = {price, count, amount: absAmount, total};
    return acc;
  }, [])
};