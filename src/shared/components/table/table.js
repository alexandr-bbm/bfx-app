import React, {Component} from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';

const TableStyled = styled.div`
  width: 100%;
`;

const CellBase = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: ${p => p.width ? p.width : 50}px;
  align-items: center;
  justify-content: ${p => p.justifyContent ? p.justifyContent : 'center'};
  display: flex;
`;

const RowBase = styled.div`
  height: 17px;
`;

const HeaderCell = styled(CellBase)`
  color: ${p => p.theme.foreground.secondary};
  text-transform: uppercase;
`;

const HeaderRow = styled(RowBase)`
  display: flex;
`;

const Body = styled.div`
`;

const Row = styled(RowBase)`
  display: flex;
  position: relative;
  overflow: hidden;
  background: ${p => p.getBackground(p.theme)};
  
  :hover {
    background: ${p => p.theme.background.hover}
  }
`;

const Cell = styled(CellBase)`
`;

export class Table extends Component {
  render() {
    const {
      data, columns, maxHeight, className = '', renderExtraChildrenInRow, createGetBackground = () => () => undefined,
    } = this.props;

    return (
      <TableStyled maxHeight={maxHeight} className={className}>
        <HeaderRow>
          {columns.map(column =>
            <HeaderCell
              key={column.name}
              width={column.width}
              justifyContent={column.justifyContent}
            >
              {column.label || column.name}
            </HeaderCell>
          )}
        </HeaderRow>
        <Body>
          {data.map((datum, idx) =>
            <Row key={idx} getBackground={createGetBackground(datum)}>
              {columns.map(column =>
                <Cell
                  width={column.width}
                  key={column.name}
                  justifyContent={column.justifyContent}
                >
                  {column.renderCell
                    ? column.renderCell(datum)
                    : datum[column.name]
                  }
                </Cell>
              )}
              {renderExtraChildrenInRow && renderExtraChildrenInRow(datum)}
            </Row>
          )}
        </Body>
      </TableStyled>
    )
  }
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      width: PropTypes.number,
      renderCell: PropTypes.func,
    })
  ).isRequired,
};
