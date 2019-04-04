import {withSubscription} from '../../../../shared/hocs/withSubscription';
import {subscribeTrades, unsubscribeTrades} from '../../redux/actions';
import {selectTradesBySymbol} from '../../redux/selectors';

export const withTradesSubscription = withSubscription({
  subscribeAction: subscribeTrades,
  unsubscribeAction: unsubscribeTrades,
  getSubscriptionParams: props => props.symbol,
  mapStateToInnerProps: (state, props) => ({
    symbolTrades: selectTradesBySymbol(state, props),
  })
});
