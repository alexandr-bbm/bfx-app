export class WsApi {

  static StateMap = {
    Connecting: 0,
    Open: 1,
    Closing: 2,
    Closed: 3,
  };

  static ChannelName = {
    Ticker: 'ticker',
    Book: 'book',
    Trades: 'trades',
  };

  static paramsToString = params => Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .sort()
    .join('&');

  static pickChannelParams = {
    [WsApi.ChannelName.Ticker]: ({symbol}) => ({symbol}),
    [WsApi.ChannelName.Trades]: ({symbol}) => ({symbol}),
    [WsApi.ChannelName.Book]: ({symbol, prec}) => ({symbol, prec}),
  };

  static getSubscriptionKey = (channelName, params) => {
    const paramsKey = WsApi.paramsToString(params);
    return `${channelName}_${paramsKey}`;
  };

  static parseSubscriptionKey = (key) => {
    const [channelName, paramsKey] = key.split('_');
    const params = paramsKey.split('&')
      .reduce((acc, keyValStr) => {
        const [key, value] = keyValStr.split('=');
        acc[key] = value;
        return acc;
      }, {});
    return {
      channelName,
      params,
    }
  };

  /** Only one listener per channel and given params (subscriptionKey) is allowed. */
  channelIdsBySubscriptionKey = {};
  listenersBySubscriptionKey = {};
  listenersCountBySubscriptionKey = {};

  constructor() {
    this.connect();
  }

  disconnect = () => {
    if (this.ws && this.ws.readyState !== WsApi.StateMap.Closed) {
      this.ws.close();
      this._log('disconnected');
    }
  };

  _handleDisconnect = () => {
    this.channelIdsBySubscriptionKey = {};
    this.$connected = new Promise(() => undefined);
  };

  _restoreSubscriptions = () => {
    const subscriptionKeys = Object.keys(this.listenersBySubscriptionKey);
    const subscriptions = subscriptionKeys.map(WsApi.parseSubscriptionKey);
    subscriptions.forEach(subscription => {
      const {channelName, params} = subscription;
      this._log('restore subscription', channelName, params);
      this._subscribe(channelName, params);
    });
  };

  connect = () => {
    if (!this.ws || this.ws.readyState !== WsApi.StateMap.Open) {
      this.ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

      this.ws.onmessage = this._onMessage;

      this.ws.onclose = () => {
        this._handleDisconnect();
      };

      this.$connected = new Promise(resolve => {
        this.ws.onopen = () => {
          this._log('connected');
          resolve();
        }
      });

      this._restoreSubscriptions();
    }
  };

  subscribe = (channelName, params, listener) => {
    const isAlreadySubscribed = this._isSubscribed(channelName, params);
    this._increaseSubscription(channelName, params);

    if (isAlreadySubscribed) {
      return false;
    }

    this._subscribe(channelName, params);

    const key = WsApi.getSubscriptionKey(channelName, params);
    this.listenersBySubscriptionKey[key] = listener;
    return true;
  };

  _subscribe = (channelName, params) => {
    this._send({
      event: 'subscribe',
      channel: channelName,
      ...params,
    });
    this._log('Actual subscription', params);
  };

  unsubscribe = (channelName, params) => {
    this._decreaseSubscription(channelName, params);

    const isStillSubscribed = this._isSubscribed(channelName, params);

    if (isStillSubscribed) {
      return false;
    }

    const key = WsApi.getSubscriptionKey(channelName, params);

    this._send({
      event: 'unsubscribe',
      channel: channelName,
      chanId: this.channelIdsBySubscriptionKey[key],
      ...params,
    });
    this._log('Actual unsubscription', params);
    return true
  };

  _onMessage = ({data: dataString}) => {
    const data = JSON.parse(dataString);
    this._log('onMessage', data);
    if (!data) {
      return;
    }

    const {event} = data;

    switch (event) {
      case 'subscribed':
        this._handleSubscribedMessage(data);
        return;

      case 'error':
        this._handleErrorMessage(data);
        return;

      case 'info':
      case 'unsubscribed':
        return;

      default:
        this._handleDataMessage(data);
    }
  };

  static isIterable(obj) {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  _handleDataMessage = (data) => {
    if (!WsApi.isIterable(data)) {
      console.error(data);
      return;
    }

    const [channelId, innerData, extraData] = data;

    if (innerData === 'hb') {
      return;
    }

    if (!channelId) {
      this._log('Can not handle data message without channelId', data);
      return;
    }

    const subscriptionKeyEntry = Object.entries(this.channelIdsBySubscriptionKey)
      .find(([subscriptionKey, keyChannelId]) => keyChannelId === channelId);

    if (!subscriptionKeyEntry) {
      this._log('Can not find subscriptionKey by channelId', channelId, this.channelIdsBySubscriptionKey);
      return;
    }

    const [subscriptionKey] = subscriptionKeyEntry;

    const listener = this.listenersBySubscriptionKey[subscriptionKey];

    if (!listener) {
      this._log('Can not find listener by subscriptionKey', subscriptionKey, this.listenersBySubscriptionKey);
      return;
    }

    listener(innerData, extraData);
  };

  _handleSubscribedMessage = (data) => {
    const channelParmas = WsApi.pickChannelParams[data.channel](data);
    const subscriptionKey = WsApi.getSubscriptionKey(data.channel, channelParmas);
    this.channelIdsBySubscriptionKey[subscriptionKey] = data.chanId;
  };

  _handleErrorMessage = (data) => {
    console.error('wsApi', data);
  };

  _log = (...args) => {
    return console.log('wsApi:', ...args);
  };

  _send = (msg) => this.$connected.then(
    () => this.ws.send(JSON.stringify(msg))
  );

  _isSubscribed = (channelName, params) => {
    const subscriptionKey = WsApi.getSubscriptionKey(channelName, params);
    return this.listenersCountBySubscriptionKey[subscriptionKey] > 0;
  };

  _increaseSubscription = (channelName, params) => {
    const subscriptionKey = WsApi.getSubscriptionKey(channelName, params);
    const eventParamCounter = this.listenersCountBySubscriptionKey[subscriptionKey];
    if (eventParamCounter === undefined) {
      this.listenersCountBySubscriptionKey[subscriptionKey] = 1;
    } else {
      this.listenersCountBySubscriptionKey[subscriptionKey]++;
    }
  };

  _decreaseSubscription = (channelName, params) => {
    const subscriptionKey = WsApi.getSubscriptionKey(channelName, params);
    this.listenersCountBySubscriptionKey[subscriptionKey]--;
  };
}
