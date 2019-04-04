# Requirements

## Overview
Create a web application that replicates the Order Book, Trades and Ticker widgets functionality from the Trading page of the Bitfinex website.
https://www.bitfinex.com/trading

## Order Book
Similarly to the book from the website, the created Order Book should have the ability to change precision of the price column, and to change scaling of the depth bars. Price alerts management and layout configuration features are not required.
Trades
The trades widget is supposed to show trades executed on the market, showing a user’s own trades via authenticated API access is not required. 

## Ticker

The ticker is a small widget that shows the current trade pair, 24 hours volume, 24 hours price change in percents, and last price for that pair.

## General Requirements

All of the widgets should conceptually be the same as the corresponding widgets on the Bitfinex website. They should show the data in real time, and should have the ability to recover after lost network connection. Add some controls to manage the websocket connection such as “Connect” and “Disconnect” buttons.

## Technological Requirements
Use React for rendering and Redux to store the market data. Feel free to create a custom CSS style for the widgets, it can be very simple. Use Bitfinex WebSocket V2 API to obtain the data.

https://docs.bitfinex.com/v2/docs 