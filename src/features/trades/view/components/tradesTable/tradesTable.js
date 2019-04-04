import React, {PureComponent} from 'react';
import {Table} from '../../../../../shared/components/table/table';

export class TradesTable extends PureComponent {

  columns = [
    {
      name: 'mts',
      label: 'time',
      width: 10,
      renderCell: ({mts}) => new Date(mts).toLocaleTimeString(),

    },
    {
      name: 'price',
      renderCell: ({price}) => price.toFixed(1),
    },
    {
      name: 'amount',
      renderCell: ({amount}) => Math.abs(amount.toFixed(4)),
    },
  ];

  render() {
    const {data} = this.props;

    if (!data) {
      return null;
    }

    return (
      <Table
        columns={this.columns}
        data={data}
        className={this.props.className}
        createGetBackground={this._createGetBackground}
      />
    )
  }

  _createGetBackground = ({amount}) => (theme) => amount > 0
    ? theme.foreground.positiveAlpha
    : theme.foreground.negativeAlpha;
}

