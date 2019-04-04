import {withSubscription} from '../../../../shared/hocs/withSubscription';
import {subscribeOrderBook, unsubscribeOrderBook} from '../../redux/actions';
import {selectSpecificOrderBook} from '../../redux/selectors';

export const withOrderBookSubscription = withSubscription({
  subscribeAction: subscribeOrderBook,
  unsubscribeAction: unsubscribeOrderBook,
  getSubscriptionParams: ({prec, symbol}) => ({prec, symbol}),
  mapStateToInnerProps: (state, {symbol, prec}) => {
    return ({
      orderBook: selectSpecificOrderBook(state, {prec, symbol}),
    });
  }
});
