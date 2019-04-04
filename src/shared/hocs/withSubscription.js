import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isEqual} from 'lodash';

export const withSubscription = ({
  subscribeAction,
  unsubscribeAction,
  getSubscriptionParams,
  mapStateToInnerProps = null
}) => (WrappedComponent) => {
  class WithSubscriptionWrapper extends Component {
    componentDidMount() {
      const subscriptionParams = getSubscriptionParams(this.props);
      this.props.dispatch(subscribeAction(subscriptionParams));
    }

    componentWillUnmount() {
      const subscriptionParams = getSubscriptionParams(this.props);
      this.props.dispatch(unsubscribeAction(subscriptionParams));
    }

    componentDidUpdate(prevProps) {
      const prevSubscriptionParams = getSubscriptionParams(prevProps);
      const subscriptionParams = getSubscriptionParams(this.props);

      if (!isEqual(subscriptionParams, prevSubscriptionParams)) {
        console.log('update subscription by props change', subscriptionParams);
        this.props.dispatch(unsubscribeAction(prevSubscriptionParams));
        this.props.dispatch(subscribeAction(subscriptionParams));
      }
    }

    render() {
      return <WrappedComponent {...this.props}/>
    }
  }

  return connect(mapStateToInnerProps)(WithSubscriptionWrapper);
};