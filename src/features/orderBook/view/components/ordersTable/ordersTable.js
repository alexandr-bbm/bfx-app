import React, {PureComponent} from 'react';
import {Table} from '../../../../../shared/components/table/table';
import styled from 'styled-components';
import {OrderBookPrec} from '../../../../../services/api/serverContants';

const RowBackground = styled.div.attrs(props => ({
  style: {width: props.width + '%'},
}))`
  position: absolute;
  height: 100%;
  background: ${p => p.isInverted
    ? p.theme.foreground.negative
    : p.theme.foreground.positive
  };
  opacity: 0.2;
  right: ${p => p.isInverted ? 'initial' : 0};
`;

export class OrdersTable extends PureComponent {

  getColumns = () => {
    const amountDigits = this.props.prec === OrderBookPrec.P0
      ? 2
      : 1;
    const priceDigits = this.props.prec === OrderBookPrec.P0
      ? 1
      : 0;
    const format = (value, digits) => value !== undefined
      ? value.toFixed(digits)
      : '-';

    return ([
      {
        name: 'count',
        label: 'count',
        width: 10,
      },
      {
        name: 'amount',
        label: 'amount',
        justifyContent: 'flex-end',
        renderCell: data => format(data.amount, amountDigits),
      },
      {
        name: 'total',
        label: 'total',
        justifyContent: 'flex-end',
        renderCell: data => format(data.total, amountDigits)
      },
      {
        name: 'price',
        label: 'price',
        justifyContent: 'flex-end',
        renderCell: data => format(data.price, priceDigits)
      },
    ]);
  };

  render() {
    const {isInverted, data, depthScale} = this.props;

    if (!data) {
      return null;
    }

    const columns = isInverted
      ? this.getColumns().reverse()
      : this.getColumns();

    const maxTotal = Math.max(...data.map(datum => datum.total));

    const renderExtraChildrenInRow = this._createRenderExtraChildrenInRow(maxTotal, depthScale, isInverted);

    return (
      <Table
        columns={columns}
        data={data}
        className={this.props.className}
        renderExtraChildrenInRow={renderExtraChildrenInRow}
      />
    )
  }

  _createRenderExtraChildrenInRow = (maxTotal, depthScale, isInverted) => (datum) =>
    <RowBackground
      isInverted={isInverted}
      width={Math.round(datum.total * depthScale / maxTotal)}
    />
}

