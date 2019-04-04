import {withSubscription} from '../../../../shared/hocs/withSubscription';
import {subscribeTicker, unsubscribeTicker} from '../../redux/actions';
import {selectTickerBySymbol} from '../../redux/selectors';

export const withTickerSubscription = withSubscription({
  subscribeAction: subscribeTicker,
  unsubscribeAction: unsubscribeTicker,
  getSubscriptionParams: props => props.symbol,
  mapStateToInnerProps: (state, props) => ({
    symbolTicker: selectTickerBySymbol(state, props),
  })
});
